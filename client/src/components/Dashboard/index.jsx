import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import styled from "styled-components";
import Spotify from "spotify-web-api-js";
import { Row, Col } from "react-bootstrap";
import { FavTracks } from "./Analytics/FavTracks";
import { Analytics } from "./Analytics";

const spotify = new Spotify();

export const Dashboard = () => {
	const [data, setData] = useState();
	const [select, setSelected] = useState("Analytics");

	return (
		<>
			<Header onChange={setSelected} />
			{select === "Analytics" && <Analytics />}
		</>
	);
};
