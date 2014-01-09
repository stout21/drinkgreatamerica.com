import csv
import json

f = open('florida-distro.csv', 'rU')
reader = csv.DictReader(f, (
  "store",
  "address",
  "city",
  "november 2013",
  "2013",
  "DELETE"
  ))
out = json.dumps( [ row for row in reader ] )

print out

