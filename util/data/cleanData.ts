const esriUtils = require("@esri/arcgis-to-geojson-utils");
import proj4 from "proj4";

interface IConvertEpsg {
	(geojson: {
		type: string;
		geometry: {
			coordinates: any[];
		};
		features: any[];
	},
	epsgFrom: string,
	epsgTo: number): any;
}

interface IConvertCoordinates {
	(geometry: {
		coordinates: any[];
	},
		epsgFrom: string,
		epsgTo: string): any[];
}

const convertCoordinatesLineString: IConvertCoordinates = (geometry, epsgFrom, epsgTo) => {
	let converted = geometry.coordinates.map((coord: number[]) => {
		return proj4(epsgFrom, epsgTo, coord);
	});
	return converted;
};

const convertCoordinatesPolygon: IConvertCoordinates = (geometry, epsgFrom, epsgTo) => {
	let converted = geometry.coordinates.map((polygon) => {
		return polygon.map((coord: number[]) => {
			return proj4(epsgFrom, epsgTo, coord);
		});
	});
	return converted;
};

const convertCoordinatesMultiPolygon: IConvertCoordinates = (geometry, epsgFrom, epsgTo) => {
	let converted = geometry.coordinates.map((polygonGroup) => {
		return polygonGroup.map((polygon: []) => {
			return polygon.map((coord: number[]) => {
				return proj4(epsgFrom, epsgTo, coord);
			});
		});
	});

	return converted;
};

const convertEpsgType: IConvertEpsg = async (geojson, epsgFrom, epsgTo) => {
	// Although Mapbox displays in EPSG:3857 (Web Mercator projection), it requires EPSG:4326 for layer coordinates
	// this function converts the input data to EPSG:4326
	const epsg: { [key: string]: string; } = {
		3857: "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs",
		3750: "+proj=utm +zone=4 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ",
		4326: "+proj=longlat +datum=WGS84 +no_defs"
	};

	if (!epsg[epsgFrom]) {
		throw new Error(`No definition available for EPSG:${epsgFrom}`);
	}

	geojson.features.map((feat) => {
		for (let i in feat.properties) {
			feat.properties.NAME = feat.properties[i];
		}
		
		if (feat.geometry.type === "LineString") {
			feat.geometry.coordinates = convertCoordinatesLineString(feat.geometry, epsg[epsgFrom], epsg[epsgTo]);
		} else if (feat.geometry.type === "Polygon") {
			feat.geometry.coordinates = convertCoordinatesPolygon(feat.geometry, epsg[epsgFrom], epsg[epsgTo]);
		} else if (feat.geometry.type === "MultiPolygon") {
			feat.geometry.coordinates = convertCoordinatesMultiPolygon(feat.geometry, epsg[epsgFrom], epsg[epsgTo]);
		} else {
			throw new Error(`GeoJSON file has an unknown geometry type: ${feat.geometry.type}`);
		}
	});

	return geojson;
};

const cleanData = async (rawData: any) => {
	const geojson = await esriUtils.arcgisToGeoJSON(rawData);
	const epsgType = rawData.spatialReference.latestWkid;
	const convertedGeojson = await convertEpsgType(geojson, epsgType, 4326);
	return convertedGeojson;
};

export default cleanData;
