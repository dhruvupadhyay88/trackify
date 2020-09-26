import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import Spotify from "spotify-web-api-js";
import { Analytics } from "./Analytics";
import { Profile } from "./Profile";

const spotify = new Spotify();

export const Dashboard = () => {
	const [data, setData] = useState();
	const [select, setSelected] = useState("Analytics");

	return (
		<>
			<Header onChange={setSelected} />
			{select === "Profile" && <Profile />}
			{select === "Analytics" && <Analytics />}
		</>
	);
};
