# HI Layered Map/Holoholo project

## Description
This is a map of public trails and parks in Hawaii. Ultimately may serve as a template for adding various user-created map layers.

## Installation
This is a very early work-in-progress, but feel free explore the repository. You need to create a ".env.local" file in your root directory, storing the following environment variables:
1. NEXT_PUBLIC_MAPBOX_TOKEN - MapBox API token
2. NEXT_PUBLIC_MAPSTYLE (if using custom map styles) - MapBox studio style url
* Format: mapbox://styles/<USERNAME>/<HASH>
* Style gallery can be found at https://www.mapbox.com/gallery/
3. ATLAS_URI - MongoDB Atlas URI (only if you plan on pulling data from a database. Currently not necessary.)

When you have your environment variables set, you can run:
	npm run dev

## Data sources
1. Public trails
* EPSG 3857 (Spherical Mercator Projection) format
* http://honolulugis.org/arcgis/rest/services/Public/Parks_Recreation/MapServer//0
2. Park boundaries
* EPSG 3857 (Spherical Mercator Projection) format
* http://honolulugis.org/arcgis/rest/services/Public/Parks_Recreation/MapServer//22
* Description: Parks, open spaces, and outdoor recreational facilities managed and maintained by the City and County of Honolulu.
* Copyright Text: Honolulu Land Information System (Holis), Department of and Permitting, City and County of Honolulu
3. Park polygons statewide
* EPSG:3750 format
* https://geodata.hawaii.gov/arcgis/rest/services/Infrastructure/MapServer//16

**All data is converted to GeoJSON, EPSG 4326 format before becoming map layers

### Retrieving data
There are three ways to retrieve data. Typically you will use local JSON files provided in the public/data folder, but there are also options to use a MongoDB Atlas database or getting the raw data from the API.
1. handleLocalData - local JSON files can be found in public/data folder.
2. handleDatabase - Retrieves GeoJSON data from a MongoDB database. *Requires MongoDB Atlas account.
3. handleAPIData - Calls an API to retrieve ArcGIS data, converts it to GeoJSON format, then converts the geographic coordinates to EPSG:4326 (Equirectangular Projection) to return lat/lon values. Optionally, you can provide "<FILENAME>.json" a second parameter to the handleData function, and then function will write a JSON file to the /public/data directory. *Requires API URLS (currently hidden/stored as environment variables).
