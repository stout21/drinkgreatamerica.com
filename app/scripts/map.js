(function(exports, document) {
  'use strict';

  var DEFAULT_LAT_LONG = [35.8278, -78.6421]; // Raleigh, NC
  var MAIN = '_buildThatMap'; // main func. called when google maps js loads
  var SETUP = 'setupFinder'; // setup func. called when location data loads

  var mapManager, isReady = false;

  function setup(locations) {
    if (!isReady) return setTimeout(function() { setup(locations); }, 10);

    mapManager = new MapManager(locations);
    mapManager.template(MapManager.INFO_WINDOW, function(data) {
      return [
        '<article class="info-window">',
          '<h3 class="info-store">', data.store, '</h3>',
          '<span class="info-address">', data.address, '</span>',
          '<span class="info-city">', data.city, '</span>,',
          '<span class="info-state">', data.state, '</span> ',
          '<span class="info-zip">', data.zip, '</span>',
        '</article>'
      ].join('');
    });

    mapManager.template(MapManager.LOCATIONS_LIST, function(data) {
      return data.map(function(loc) {
        return [
          '<div class="location" data-id="', loc._id , '">',
            '<h3 class="location-store">', loc.store, '</h3>',
            '<span class="location-address">', loc.address, '</span>',
            '<span class="location-city">', loc.city, '</span>,',
            '<span class="location-state">', loc.state, '</span> ',
            '<span class="location-zip">', loc.zip, '</span>',
          '</div>',
        ].join('');
      }).join('');
    });

    mapManager.draw();
  }

  function initialize() {
    //google.maps.visualRefresh = true;
    isReady = true;
  }

  function MapManager(locations) {
    console.log('Creating new MapManager. %o', locations);

    this._template = {};
    this.locations = locations;
    this.locationsElement = document.getElementById('map-locations');

    this.map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 8,
      center: new google.maps.LatLng(locations[0].lat, locations[0].long)
      //center: new google.maps.LatLng(DEFAULT_LAT_LONG[0], DEFAULT_LAT_LONG[1])
    });

    this.infoWindow = new google.maps.InfoWindow({});
  }

  MapManager.LOCATIONS_LIST = 'LocationsList',
  MapManager.INFO_WINDOW = 'InfoWindow',

  MapManager.prototype = {

    draw: function() {
      var self = this;
      var map = this.map;
      this.locations.forEach(draw);
      var str = this.render(MapManager.LOCATIONS_LIST, this.locations);
      this.locationsElement.innerHTML = str;

      return this;

      function draw(loc) {
        loc.marker = new google.maps.Marker({
          position: new google.maps.LatLng(loc.lat, loc.long),
          map: map,
          title: loc.store
        });

        loc._id = 'location-' + Math.floor(Math.random() * 100000);

        google.maps.event.addListener(loc.marker, 'click', select(loc));
      }

      function select(loc) {
        return function() {
          self.select(loc);
        };
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

    template: function(name, fn) {
      if (typeof fn === 'undefined') return this._template[name];
      this._template[name] = fn;

      return this;
    },

    render: function(name, data) {
      var t = this.template(name);
      if (t) return t(data);
    },
  }

  _s('https://maps.googleapis.com/maps/api/js?key=AIzaSyAYI-vxBWEH1OlMjj2Ryx2A_oRe3M6jQcE&sensor=true&callback=' + MAIN);

  exports[MAIN] = initialize;
  exports[SETUP] = setup;

})(window, document);

