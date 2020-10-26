import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col, Table, Container } from "react-bootstrap";
import Spotify from "spotify-web-api-js";
import { RecentlyPlayed } from "./RecentlyPlayed";
import ProfilePic from "../../../images/dp.jpg";

const spotify = new Spotify();
export const Profile = ({ profileData }) => {
	const [recentlyPlayed, setRecentlyPlayed] = useState();
	useEffect(() => {
		spotify
			.getMyRecentlyPlayedTracks({ limit: 50 })
			.then(response => {
				setRecentlyPlayed(response);
			})
			.catch(err => console.error(err));
	}, [profileData]);
	console.log(profileData);
	return (
		<Container>
			<Row className="justify-content-center">
				<Col xs={10}>
					<Info>
						<Row>
							<Title>My Profile</Title>
						</Row>
						<Row className="justify-content-center">
							<Col xs={3} style={{ marginTop: "13px" }}>
								<Text>Name: </Text>
								<Text>Subscription:</Text>
								<Text>Email: </Text>
								<Text>Country: </Text>
								<Text>Followers:</Text>
							</Col>
							<Col xs={4} style={{ marginTop: "13px" }}>
								<Text>{profileData.display_name}</Text>
								<Text>
									{profileData.product == "open"
										? "Free"
										: profileData.product
												.slice(0, 1)
												.toUpperCase() +
										  profileData.product.slice(
												1,
												profileData.product.length
										  )}
								</Text>
								<Text>{profileData.email}</Text>
								<Text>{profileData.country}</Text>
								<Text>{profileData.followers.total}</Text>
							</Col>
							<Col xs={5}>
								<a href={profileData.uri}>
									<div
										style={{
											float: "right",
											justifyContent: "center",
											alignItems: "center",
										}}>
										<img
											src={
												profileData.images &&
												profileData.images[0]
													? profileData.images[0].url
													: ProfilePic
											}
											style={{
												height: 120,
												margin: "20px 40px 0 0",
											}}
										/>
										<figcaption
											style={{
												color: "white",
												margin: "3px 3px 0 0",
											}}>
											View Your Profile
										</figcaption>
									</div>
								</a>
							</Col>
						</Row>
					</Info>
				</Col>
			</Row>
			<Row className="justify-content-center">
				{recentlyPlayed && (
					<Col xs={10}>
						<Heading>Recently Played Tracks</Heading>
						<RecentlyPlayed trackData={recentlyPlayed} />
					</Col>
				)}
			</Row>
		</Container>
	);
};

const Info = styled.div`
	background-color: rgb(35, 35, 35);
	padding: 30px;
	margin: 40px 0 20px 0;
	border-radius: 30px;
	margin-bottom: 20px;
`;

const Text = styled.h5`
	color: rgb(200, 200, 200);
`;

const Title = styled.h2`
	color: rgb(29, 185, 84);
	margin: 0 0 10px 12px;
`;

const Heading = styled.h2`
	color: rgb(29, 185, 84);
	margin: 10px 0 25px 0;
`;
