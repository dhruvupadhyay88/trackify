import React, { useState, useEffect } from "react";
import Spotify from "spotify-web-api-js";
import { Button, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Songs } from "./components/Songs";
import { Header } from "./components/Header";

const spotify = new Spotify();

const getHashParams = () => {
	var hashParams = {};
	var e,
		r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
	while ((e = r.exec(q))) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
};

export const App = () => {
	const params = getHashParams();
	const [data, setData] = useState({
		loggedIn: params.access_token ? true : false,
	});

	return (
		<>
			<Header />
			<Wrapper fluid="xs">
				{!data.loggedIn ? (
					<a href="http://localhost:8888">
						<Button>Login to Spotify</Button>
					</a>
				) : (
					<>
						<Row className="justify-content-center">
							<Col xs={7}>
								<Songs token={params.access_token} />
							</Col>
						</Row>
					</>
				)}
			</Wrapper>
		</>
	);
};

const Wrapper = styled(Container)`
	background-color: rgb(25, 25, 25);
	align-items: center;
	justify-content: center;
`;
