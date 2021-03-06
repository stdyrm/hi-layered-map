import { useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { GeoJsonLayer } from "@deck.gl/layers";
import "mapbox-gl/dist/mapbox-gl.css";

import { handleDatabase, handleLocalData } from "../../lib";
import { PublicTrails, ParksCcHnl, ParksStatewide } from "../../util/models";

// components
import { Text } from "@chakra-ui/core";
import { ControlPanel, ControlPanelButton } from "../../components/map";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAPSTYLE = process.env.NEXT_PUBLIC_MAPSTYLE;

interface IViewport {
	width: string | number;
	height: string | number;
	latitude: number;
	longitude: number;
	zoom: number;
	pitch: number;
	bearing: number;
}

export interface IFeature {
	type: string;
	geometry: {
		type: string;
		coordinates: [];
	};
}

interface IFeatureCollection {
	type: string;
	features: IFeature[];
}

interface IProps {
	dataPublicTrails: IFeatureCollection;
	dataParksCcHnl: IFeatureCollection;
	dataParksStatewide: IFeatureCollection;
}

interface IVisible {
	[key: string]: boolean;
}

const INITIAL_VIEW_STATE = {
	width: "772px",
	height: "501px",
	latitude: 21.3069,
	longitude: -157.8583,
	zoom: 7,
	pitch: 0,
	bearing: 0,
};

const getStaticProps: GetStaticProps = async () => {
	let dataPublicTrails: IFeatureCollection;
	let dataParksCcHnl: IFeatureCollection;
	let dataParksStatewide: IFeatureCollection;

	// There are local GeoJSON files in the /public/data directory, so you don't need to call APIs for park/public trail data.
	// If you need to re-create these files,  you can import and call the handleAPIData function, with"<FILENAME>.json" as an optional second parameter
	// You may omit the second parameter to simply call the API without writing a file.

	// dataPublicTrails = await handleAPIData(process.env.PUBLIC_TRAILS_URL, "PUBLIC_TRAILS.json");
	// dataParksCcHnl = await handleAPIData(process.env.PARKS_CC_HNL_URL, "PARKS_CC_HNL.json");
	// dataParksStatewide = await handleAPIData(process.env.PARKS_STATEWIDE_URL, "PARKS_STATEWIDE.json");

	// get data from database with local file as fallback
	if (process.env.ATLAS_URI) {
		dataPublicTrails = JSON.parse(
			(await handleDatabase(PublicTrails)) as string
		);
		dataParksCcHnl = JSON.parse((await handleDatabase(ParksCcHnl)) as string);
		dataParksStatewide = JSON.parse(
			(await handleDatabase(ParksStatewide)) as string
		);
	} else {
		dataPublicTrails = JSON.parse(handleLocalData("PUBLIC_TRAILS.json"));
		dataParksCcHnl = JSON.parse(handleLocalData("PARKS_CC_HNL.json"));
		dataParksStatewide = JSON.parse(handleLocalData("PARKS_STATEWIDE.json"));
	}

	return {
		props: {
			dataPublicTrails,
			dataParksCcHnl,
			dataParksStatewide,
		},
	};
};

const HoloholoMap: React.FC<IProps> = ({
	dataPublicTrails,
	dataParksCcHnl,
	dataParksStatewide,
}) => {
	const [viewState] = useState<IViewport>(INITIAL_VIEW_STATE);
	const [visible, setVisible] = useState<IVisible>({
		publicTrails: true,
		parksCcHnl: true,
		parksStatewide: true,
	});

	const handleLayerVisibility = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const element = e.currentTarget as HTMLInputElement;
		const layer: string = element.id;
		setVisible((prevState) => ({ ...prevState, [layer]: !prevState[layer] }));
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
			getLineColor: [78, 147, 122],
			opacity: 0.5,
			getRadius: 100,
			getLineWidth: 1,
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
			getFillColor: [127, 44, 203],
			opacity: 0.5,
			getRadius: 100,
			getLineWidth: 1,
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
			getFillColor: [221, 114, 48],
			opacity: 0.5,
			getRadius: 100,
			getLineWidth: 1,
		}),
	];

	return (
		<>
			<Head>
				<link
					href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
					rel="stylesheet"
				/>
			</Head>
			<div style={{ backgroundColor: "red" }}></div>
			<DeckGL
				layers={layers}
				pickingRadius={5}
				initialViewState={viewState}
				controller={true}
				getTooltip={(node: any) => node.object && node.object.properties.NAME}
			>
				<StaticMap
					width="100%"
					height={800}
					reuseMaps={true}
					mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
					mapStyle={MAPSTYLE ? MAPSTYLE : "mapbox://styles/mapbox/light-v9"}
				/>
			</DeckGL>
			<ControlPanel>
				<Text fontSize="xl">Map Layers</Text>
				<ControlPanelButton
					id="publicTrails"
					onClick={handleLayerVisibility}
					style={{
						backgroundColor: visible.publicTrails ? "rgb(78,147,122)" : "gray",
					}}
				>
					Public trails
				</ControlPanelButton>
				<ControlPanelButton
					id="parksCcHnl"
					onClick={handleLayerVisibility}
					style={{
						backgroundColor: visible.parksCcHnl ? "rgb(127,44,203)" : "gray",
					}}
				>
					Parks (C&C HNL)
				</ControlPanelButton>
				<ControlPanelButton
					id="parksStatewide"
					onClick={handleLayerVisibility}
					style={{
						backgroundColor: visible.parksStatewide
							? "rgb(221,114,48)"
							: "gray",
					}}
				>
					Parks (statewide)
				</ControlPanelButton>
			</ControlPanel>
		</>
	);
};

export default HoloholoMap;
export { getStaticProps };
