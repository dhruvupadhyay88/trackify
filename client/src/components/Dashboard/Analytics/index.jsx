import React, { useEffect, useState } from "react";
import Spotify from "spotify-web-api-js";
import { FavTracks } from "./FavTracks";
import { Row, Col } from "react-bootstrap";

const spotify = new Spotify();
export const Analytics = () => {
	const [select, setSelected] = useState("Tracks");
	const [timeRange, setTimeRange] = useState("short_term");
	const [data, setData] = useState();

	useEffect(() => {
		if (select === "Tracks") {
			spotify
				.getMyTopTracks({ limit: 50, time_range: timeRange })
				.then(response => setData(response))
				.catch(err => console.error(err));
		} else if (select === "Artists") {
			spotify
				.getMyTopArtists({ limit: 50, time_range: timeRange })
				.then(response => setData(response))
				.catch(err => console.error(err));
		}
	}, [select]);

	return (
		<>
			{select === "Tracks" && (
				<Row className="justify-content-center">
					<Col xs={9}>
						<FavTracks trackData={data} />
					</Col>
				</Row>
			)}
		</>
	);
};
