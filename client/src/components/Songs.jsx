import React, { useState, useEffect } from "react";
import Spotify from "spotify-web-api-js";
import styled from "styled-components";
import { Table } from "react-bootstrap";

const spotify = new Spotify();

export const Songs = ({ token }) => {
	const [favTracks, setFavTracks] = useState();
	useEffect(() => {
		spotify.setAccessToken(token);
		spotify
			.getMyTopTracks({ limit: 30, time_range: "short_term" })
			.then(response => {
				setFavTracks(response);
			});
	}, [token]);
	console.log(favTracks);
	return (
		<Table striped bordered hover variant="dark" size="md">
			{favTracks && (
				<>
					<thead>
						<tr>
							<th>Rank</th>
							<th>Song Name</th>
							<th>Artists</th>
							<th>Album</th>
							<th>Cover</th>
						</tr>
					</thead>
					<tbody>
						{favTracks.items.map((data, index) => {
							const artists = data.artists.length;
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{data.name}</td>
									<td>
										{data.artists.map((data, index) => {
											if (artists === index + 1) {
												return data.name;
											}
											return data.name + ", ";
										})}
									</td>
									<td>{data.album.name}</td>
									<td>
										{
											<img
												src={data.album.images[0].url}
												style={{ height: 50 }}
											/>
										}
									</td>
								</tr>
							);
						})}
					</tbody>
				</>
			)}
		</Table>
	);
};

/*
<Grid container>
			{favTracks && (
				<DarkPaper elevation={3}>
					<Table aria-label="simple table" size="small">
						<TableHead>
							<TableRow>
								<TableCell align="left">Song Name</TableCell>
								<TableCell align="left">Artists</TableCell>
								<TableCell align="left">Album</TableCell>
								<TableCell align="left">Rank</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							
						</TableBody>
					</Table>
				</DarkPaper>
			)}
		</Grid>
		*/
