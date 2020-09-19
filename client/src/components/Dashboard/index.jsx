import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import styled from "styled-components";
import Spotify from "spotify-web-api-js";
import { Row, Col } from "react-bootstrap";

const spotify = new Spotify();

export const Dashboard = ({ token }) => {
	useEffect(() => {
		spotify.setAccessToken(token);
	}, [token]);

	return (
		<>
			<Header />
		</>
	);
};
