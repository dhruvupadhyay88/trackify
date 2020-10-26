import React, { useEffect, useState } from "react";
import Spotify from "spotify-web-api-js";
import { FavTracks } from "./FavTracks";
import { FavArtists } from "./FavArtists";
import {
	Row,
	Col,
	Card,
	Container,
	Dropdown,
	DropdownButton,
} from "react-bootstrap";
import TopTrackPic from "../../../images/toptracks.jpg";
import TopArtistPic from "../../../images/topartist.jpg";
import styled from "styled-components";

const spotify = new Spotify();

export const Analytics = () => {
	const [select, setSelected] = useState("Tracks");
	const [timeRange, setTimeRange] = useState("short_term");
	const [topTracks, setTopTracks] = useState();
	const [topArtists, setTopArtists] = useState();

	useEffect(() => {
		if (select === "Tracks") {
			spotify
				.getMyTopTracks({ limit: 50, time_range: timeRange })
				.then(response => {
					setTopTracks(response);
				})
				.catch(err => console.error(err));
		} else if (select === "Artists") {
			spotify
				.getMyTopArtists({ limit: 50, time_range: timeRange })
				.then(response => {
					setTopArtists(response);
				})
				.catch(err => console.error(err));
		}
	}, [select, timeRange, select]);

	const getHeading = () => {
		let title = "Top " + select + " | ";
		if (timeRange === "short_term") {
			title += "Short Term - 1 month";
		} else if (timeRange === "medium_term") {
			title += "Medium Term - 6 months";
		} else if (timeRange === "long_term") {
			title += "Long Term - All Time";
		}
		return title;
	};

	const getTime = () => {
		let title = "";
		if (timeRange === "short_term") {
			title += "Short Term - 1 month";
		} else if (timeRange === "medium_term") {
			title += "Medium Term - 6 months";
		} else if (timeRange === "long_term") {
			title += "Long Term - All Time";
		}
		return title;
	};
	return (
		<Container>
			<Row className="justify-content-center" fluid="xs">
				<Col xs={10}>
					<Menu>
						<Row className="justify-content-center">
							<Col xs={6}>
								<Card
									style={{
										borderColor: "rgb(40,40,40)",
										borderRadius: "20px",
									}}
									bg="dark"
									text="light">
									<Card.Img
										variant="top"
										src={TopTrackPic}
										style={{
											borderRadius: "20px",
											padding: "10px",
										}}
									/>
									<Card.Body>
										<Card.Title
											style={{ fontSize: "28px" }}>
											My Top Tracks
										</Card.Title>
										<Card.Text style={{ fontSize: "18px" }}>
											These are the tracks that you
											couldn't get enough of. Select a
											time range that you'd like to
											analyze and discover what your
											favourite music is.
										</Card.Text>
										<div
											style={{
												marginLeft: "24%",
											}}>
											<DropdownButton
												variant="success"
												title={getTime()}>
												<Dropdown.Item
													eventKey="1"
													onClick={() => {
														setTimeRange(
															"short_term"
														);
														setSelected("Tracks");
													}}>
													Short Term (1 month)
												</Dropdown.Item>
												<Dropdown.Item
													eventKey="2"
													onClick={() => {
														setTimeRange(
															"medium_term"
														);
														setSelected("Tracks");
													}}>
													Medium Term (6 months)
												</Dropdown.Item>
												<Dropdown.Item
													eventKey="3"
													onClick={() => {
														setTimeRange(
															"long_term"
														);
														setSelected("Tracks");
													}}>
													Long Term (All Time)
												</Dropdown.Item>
											</DropdownButton>
										</div>
									</Card.Body>
								</Card>
							</Col>
							<Col xs={6}>
								<Card
									style={{
										borderColor: "rgb(40,40,40)",
										borderRadius: "20px",
									}}
									bg="dark"
									text="light">
									<Card.Img
										variant="top"
										src={TopArtistPic}
										style={{
											borderRadius: "20px",
											padding: "10px",
										}}
									/>
									<Card.Body>
										<Card.Title
											style={{ fontSize: "28px" }}>
											My Top Artists
										</Card.Title>
										<Card.Text style={{ fontSize: "18px" }}>
											These are the artists that
											frequently have on repeat. They are
											the ones whose songs and albums you
											have been listening to the most
											often.
										</Card.Text>
										<div
											style={{
												marginLeft: "24%",
											}}>
											<DropdownButton
												variant="success"
												title={getTime()}>
												<Dropdown.Item
													eventKey="1"
													onClick={() => {
														setTimeRange(
															"short_term"
														);
														setSelected("Artists");
													}}>
													Short Term (1 month)
												</Dropdown.Item>
												<Dropdown.Item
													eventKey="2"
													onClick={() => {
														setTimeRange(
															"medium_term"
														);
														setSelected("Artists");
													}}>
													Medium Term (6 months)
												</Dropdown.Item>
												<Dropdown.Item
													eventKey="3"
													onClick={() => {
														setTimeRange(
															"long_term"
														);
														setSelected("Artists");
													}}>
													Long Term (All Time)
												</Dropdown.Item>
											</DropdownButton>
										</div>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Menu>
				</Col>
			</Row>

			<Row className="justify-content-center">
				{select === "Tracks" && (
					<Col xs={10}>
						<Heading>{getHeading()}</Heading>
						<FavTracks trackData={topTracks} />
					</Col>
				)}
				{select === "Artists" && (
					<Col xs={10}>
						<Heading>{getHeading()}</Heading>
						<FavArtists artistData={topArtists} />
					</Col>
				)}
			</Row>
		</Container>
	);
};

const Menu = styled.div`
	background-color: rgb(35, 35, 35);
	padding: 30px;
	margin: 40px 0 20px 0;
	border-radius: 30px;
`;

const Heading = styled.h2`
	color: rgb(29, 185, 84);
	margin: 10px 0 25px 0;
`;
