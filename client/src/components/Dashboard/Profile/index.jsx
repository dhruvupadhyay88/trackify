import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col, Table } from "react-bootstrap";
import Spotify from "spotify-web-api-js";

const spotify = new Spotify();
export const Profile = () => {
	const [data, setData] = useState();
	useEffect(() => {
		spotify
			.getUser()
			.then(response => {
				console.log(response);
				setData(response);
			})
			.catch(err => console.error(err));
	}, []);
	return <h1>Yo cuh</h1>;
};
