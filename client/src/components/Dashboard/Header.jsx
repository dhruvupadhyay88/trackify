import React from "react";
import styled from "styled-components";
import { Navbar } from "react-bootstrap";

const Spinner = require("react-spinkit");
export const Header = ({ onChange }) => {
	return (
		<NavWrap>
			<Navbar.Brand
				style={{ display: "flex", flexDirection: "inline-block" }}>
				<Spinner
					name="line-scale-pulse-out"
					style={{
						color: "rgb(29,185,84)",
						marginTop: "10px",
						marginLeft: "20px",
					}}
				/>
				<h1 style={{ color: "rgb(29,185,84)", marginLeft: "25px" }}>
					Spotify Stats
				</h1>
			</Navbar.Brand>
			<Links>
				<Link
					onClick={() => onChange("Profile")}
					style={{ marginLeft: "35px" }}>
					Profile
				</Link>
				<Link onClick={() => onChange("Analytics")}>Analytics</Link>
				<Link onClick={() => onChange("Playlist")}>
					Playlist Generator
				</Link>
			</Links>
		</NavWrap>
	);
};

const NavWrap = styled(Navbar)`
	background-color: rgb(04, 04, 04, 0.6);
`;

const Links = styled.div`
	color: white;
	display: flex;
	flex-direction: inline-block;
`;

const Link = styled.h4`
	margin: 5px 1px 2px 25px;
	color: rgb(150, 150, 150);
	&:hover {
		color: rgb(200, 200, 200);
		cursor: pointer;
	}
`;
