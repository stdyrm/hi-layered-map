import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { GeoJsonLayer } from "@deck.gl/layers";
import "mapbox-gl/dist/mapbox-gl.css";

import { handleDatabase, handleLocalData } from "../../lib";
import { PublicTrails, ParksCcHnl, ParksStatewide } from "../../util/models";

import styles from "../../styles/holoholo.module.scss";

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_TOKEN;
const MAPBOX_API_URL = process.env.MAPBOX_API_URL;
const MAPSTYLE = process.env.MAPSTYLE;

interface IViewport {
	width: string | number;
	height: string | number;
	latitude: number;
	longitude: number;
	zoom: number;
}

interface IFeature {
	type: string;
	geometry: {
		type: string;
		coordinates: Array<any>;
	};
}

interface IFeatureCollection {
	type: string;
	features: IFeature[];
}

interface IProps {
	dataPublicTrails:IFeatureCollection;
	dataParksCcHnl:IFeatureCollection;
	dataParksStatewide: IFeatureCollection;
}

interface IVisible {
	[key: string]: boolean;
}

const viewport = {
	width: "90vw",
	height: "70vh",
	latitude: 21.3069,
	longitude: -157.8583,
	zoom: 7,
};

const getStaticProps: GetStaticProps = async () => {
	let dataPublicTrails:IFeatureCollection;
	let dataParksCcHnl:IFeatureCollection;
	let dataParksStatewide:IFeatureCollection;

	// There are local GeoJSON files in the /public/data directory, so you don't need to call APIs for park/public trail data.
	// If you need to re-create these files,  you can import and call the handleAPIData function, with"<FILENAME>.json" as an optional second parameter
	// You may omit the second parameter to simply call the API without writing a file.

	// dataPublicTrails = await handleAPIData(process.env.PUBLIC_TRAILS_URL, "PUBLIC_TRAILS.json");
	// dataParksCcHnl = await handleAPIData(process.env.PARKS_CC_HNL_URL, "PARKS_CC_HNL.json");
	// dataParksStatewide = await handleAPIData(process.env.PARKS_STATEWIDE_URL, "PARKS_STATEWIDE.json");

	// get data from database with local file as fallback
	if (process.env.ATLAS_URI) {
		dataPublicTrails = JSON.parse(await handleDatabase(PublicTrails) as string);
		dataParksCcHnl = JSON.parse(await handleDatabase(ParksCcHnl) as string);
		dataParksStatewide = JSON.parse(await handleDatabase(ParksStatewide) as string);
	} else {
		dataPublicTrails = JSON.parse(handleLocalData("PUBLIC_TRAILS.json"));
		dataParksCcHnl = JSON.parse(handleLocalData("PARKS_CC_HNL.json"));
		dataParksStatewide = JSON.parse(handleLocalData("PARKS_STATEWIDE.json"));
	}

	return {
		props: {
			dataPublicTrails,
			dataParksCcHnl,
			dataParksStatewide
		}
	};
};

const HoloholoMap = ({ dataPublicTrails, dataParksCcHnl, dataParksStatewide }: IProps) => {
	const [viewState, setViewState] = useState<IViewport>(viewport);
	const [visible, setVisible] = useState<IVisible>({
		publicTrails: true,
		parksCcHnl: true,
		parksStatewide: true
	});

	const handleLayerVisibility = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const element = e.currentTarget as HTMLInputElement;
		const layer:string = element.value;
		setVisible(prevState => ({ ...prevState, [layer]: !prevState[layer] }));
	};

	const layers = [
		new GeoJsonLayer({
			id: "layer-public-trails",
			data: dataPublicTrails,
			visible: visible.publicTrails,
			pickable: true,
			filled: true,
			stroked: false,
			lineWidthScale: 20,
			lineWidthMinPixels: 2,
			getLineColor: [78,147,122],
			opacity: 0.5,
			getRadius: 100,
			getLineWidth: 1
		}),
		new GeoJsonLayer({
			id: "layer-parks-cc-hnl",
			data: dataParksCcHnl,
			visible: visible.parksCcHnl,
			pickable: true,
			filled: true,
			stroked: false,
			lineWidthScale: 20,
			lineWidthMinPixels: 2,
			getFillColor: [127,44,203],
			opacity: 0.5,
			getRadius: 100,
			getLineWidth: 1
		}),
		new GeoJsonLayer({
			id: "layer-parks-statewide",
			data: dataParksStatewide,
			visible: visible.parksStatewide,
			pickable: true,
			filled: true,
			stroked: false,
			lineWidthScale: 20,
			lineWidthMinPixels: 2,
			getFillColor: [221,114,48],
			opacity: 0.5,
			getRadius: 100,
			getLineWidth: 1
		})
	];

	return (
		<>
			<DeckGL
				layers={layers}
				pickingRadius={5}
				initialViewState={viewState}
				controller={true}
				getTooltip={(node: any) => node.object && (node.object.properties.NAME)}
			>
				<StaticMap
					width={800}
					height={800}
					reuseMaps={true}
					preventStyleDiffing={true}
					mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
					mapboxApiUrl={MAPBOX_API_URL}
					mapStyle={MAPSTYLE}
				/>
			</DeckGL>
			<div className={styles.controlPanel}>
				<Link href="/">
					<a>Home</a>
				</Link>
				<button
					value="publicTrails"
					onClick={handleLayerVisibility}
					style={{ backgroundColor: visible.publicTrails ? "rgb(78,147,122)" : "gray" }}
				>
					Public trails
				</button>
				<button
					value="parksCcHnl"
					onClick={handleLayerVisibility}
					style={{ backgroundColor: visible.parksCcHnl ? "rgb(127,44,203)" : "gray" }}
				>
					Parks (C&C HNL)
				</button>
				<button
					value="parksStatewide"
					onClick={handleLayerVisibility}
					style={{ backgroundColor: visible.parksStatewide ? "rgb(221,114,48)" : "gray" }}
				>
					Parks (statewide)
				</button>
			</div>
		</>
	);
};

export default HoloholoMap;
export { getStaticProps };
