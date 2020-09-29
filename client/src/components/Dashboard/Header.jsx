import React from "react";
import styled from "styled-components";
import { Navbar } from "react-bootstrap";

const Spinner = require("react-spinkit");
export const Header = ({ onChange, select }) => {
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
					onClick={() => onChange("Analytics")}
					style={{ marginLeft: "35px" }}
					style={{
						color:
							select === "Analytics"
								? "rgb(200,200,200)"
								: "rgb(150,150,150)",
					}}>
					Analytics
				</Link>
				<Link
					onClick={() => onChange("Playlist")}
					style={{
						color:
							select === "Playlist"
								? "rgb(200, 200, 200)"
								: "rgb(150,150,150)",
					}}>
					Playlist Generator
				</Link>
				<Link
					onClick={() => onChange("Profile")}
					style={{
						color:
							select === "Profile"
								? "rgb(200, 200, 200)"
								: "rgb(150,150,150)",
					}}>
					Profile
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
	&:hover {
		color: rgb(200, 200, 200);
		cursor: pointer;
	}
`;
