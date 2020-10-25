import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import Spotify from "spotify-web-api-js";
import { Analytics } from "./Analytics";
import { Profile } from "./Profile";
import { Playlists } from "./Playlists";

const spotify = new Spotify();

export const Dashboard = () => {
	const [profile, setProfile] = useState();
	const [select, setSelected] = useState("Analytics");

	useEffect(() => {
		spotify
			.getMe()
			.then(response => setProfile(response))
			.catch(err => console.error(err));
	}, []);

	return (
		<>
			<Header onChange={setSelected} select={select} />
			{select === "Profile" && profile && (
				<Profile profileData={profile} />
			)}
			{select === "Analytics" && <Analytics />}
			{select === "Playlist" && <Playlists />}
		</>
	);
};
