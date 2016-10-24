/*global $:false, google:false, fetch:false*/
(function(exports, document, fetch) {
  'use strict';
  
  function getQuery (postalCode) {
    return [
      'query {',
        // customize the zip based on what the user is looking at
        'locations(brand:GREAT_AMERICA, zip:' + postalCode + ') {',
          // all the fields we care about for our UI
          'name street city state zip lat long distance',
        '}',
      '}',
    ].join('');
  }
  
  function request(postalCode) {
    var protocol = location.protocol !== 'file:' ? location.protocol : 'http:';
    fetch(protocol + '//stout-brand-finder.herokuapp.com/graphql?query=' + encodeURIComponent(getQuery(postalCode)))
      .then(function(resp) { return resp.json(); })
      .then(function (data) {
        setup(data.data.locations);
        return data;
      })
      .then(function (data) { return exports[MAIN](data); })
      .catch(function (err) {
        console.log(err);
        return err;
      });
  }

  var DEFAULT_LAT_LONG = [35.8278, -78.6421]; // Raleigh, NC
  var MAIN = '_buildThatMap'; // main func. called when google maps js loads
  var SETUP = 'setupFinder'; // setup func. called when location data loads

  var mapManager, isReady = false;

  function setup(locations) {
    if (!isReady || typeof google === 'undefined') return setTimeout(function() { setup(locations); }, 10);
    
    if (!mapManager) {
      mapManager = new MapManager(locations);
      mapManager.template(MapManager.INFO_WINDOW, function(data) {
        return [
          /*jshint ignore:start*/
          '<article class="info-window">',
            '<h3 class="info-store">', data.name, '</h3>',
            '<span class="info-address">', data.street, '</span>',
            '<span class="info-city">', data.city, '</span>, ',
            '<span class="info-state">', data.state, '</span> ',
            '<span class="info-zip">', data.zip, '</span>',
          '</article>'
          /*jshint ignore:end*/
        ].join('');
      });

      mapManager.template(MapManager.LOCATIONS_LIST, function(data) {
        return data.map(function(loc) {
          return [
            /*jshint ignore:start*/
            '<div class="location" data-id="', loc._id , '">',
              '<h3 class="location-store">', loc.name, '</h3>',
              '<span class="location-address">', loc.address, '</span>',
              '<span class="location-city">', loc.city, '</span>, ',
              '<span class="location-state">', loc.state, '</span> ',
              '<span class="location-zip">', loc.zip, '</span>',
            '</div>',
            /*jshint ignore:end*/
          ].join('');
        }).join('');
      });
    }
    
    mapManager.draw();
    mapManager.setLocations(locations);
  }

  function initialize() {
    // google.maps.visualRefresh = true;
    isReady = true;
  }

  function MapManager(locations) {
    console.log('Creating new MapManager. %o', locations);

    this._template = {};
    this._locations = locations;
    this.locations = locations;
    this.searchElement = $('#filter-locations');
    this.currentPostalCode = this.searchElement.value;
    this.locationsElement = $('#map-locations-list');
    var _this = this;
    this.searchElement.addEventListener('blur', _this.search, false);
    this.searchElement.addEventListener('keyup', function(event) {
      if (event.which === 13) { // enter key
        _this.search.apply(_this, arguments);
      }
    }, false);

    this.map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 11,
      center: locations[0] && new google.maps.LatLng(locations[0].lat, locations[0].long)
      //center: new google.maps.LatLng(DEFAULT_LAT_LONG[0], DEFAULT_LAT_LONG[1])
    });
    if (!locations || locations.length === 0) {
      var self = this;
      (new google.maps.Geocoder()).geocode({address: this.currentPostalCode}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          self.map.setCenter(results[0].geometry.location);
        }
      });
    }

    this.infoWindow = new google.maps.InfoWindow({});
  }

  MapManager.LOCATIONS_LIST = 'LocationsList',
  MapManager.INFO_WINDOW = 'InfoWindow',

  MapManager.prototype = {

    draw: function() {
      var self = this;
      var map = this.map;
      this.locations.forEach(draw);

      return this;

      function draw(loc, i) {
        loc.marker = new google.maps.Marker({
          position: new google.maps.LatLng(loc.lat, loc.long),
          title: loc.store,
          map: map
        });

        google.maps.event.addListener(loc.marker, 'click', select(loc));
      }

      function select(loc) {
        return function() {
          self.select(loc);
        };
      }
    },

    search: function(event) {
      var postalCode = event.target.value;
      if (postalCode.length === 5) {
        this.currentPostalCode = postalCode;
        request(postalCode);
      }
    },

    select: function(location) {
      this.infoWindow.setContent(this.render('InfoWindow', location));
      this.infoWindow.open(this.map, location.marker);

      var active = this.locationsElement.querySelector('.location--isActive');
      if (active) active.className = 'location';
      this.locationsElement.querySelector('[data-id="' + location._id + '"]').className = 'location location--isActive';

      return this;
    },
    
    setLocations: function(locations) {
      if (!locations || locations.length === 0) {
        var self = this;
        (new google.maps.Geocoder()).geocode({address: this.currentPostalCode}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            self.map.setCenter(results[0].geometry.location);
          }
        });
      }
      // clear previous locations
      this.map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 11,
        center: locations[0] && new google.maps.LatLng(locations[0].lat, locations[0].long)
      });
      
      this.locations = locations || this._locations;
      locations.forEach(function(loc) {
        loc._id = 'location-' + Math.floor(Math.random() * 100000);
      });

      var str = this.render(MapManager.LOCATIONS_LIST, this.locations);
      this.locationsElement.innerHTML = str || [
        '<div class="location">',
          '<h3 class="location-store">Sorry!</h3>',
          '<span class="location-address">We don’t currently distribute to this area.</span>',
        '</div>'
      ].join('');
      this.draw();
    },

    template: function(name, fn) {
      if (typeof fn === 'undefined') return this._template[name];
      this._template[name] = fn;

      return this;
    },

    render: function(name, data) {
      var t = this.template(name);
      if (t) return t(data);
    },
  };

  _s('https://maps.googleapis.com/maps/api/js?key=AIzaSyAYI-vxBWEH1OlMjj2Ryx2A_oRe3M6jQcE&sensor=true&callback=' + MAIN);

  exports[MAIN] = initialize;
  exports[SETUP] = setup;
  request($('#filter-locations').value);

})(window, document, fetch);

