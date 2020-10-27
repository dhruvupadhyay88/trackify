import React from "react";
import styled from "styled-components";
import { Navbar } from "react-bootstrap";

const Spinner = require("react-spinkit");
export const LoginHeader = () => {
	return (
		<Nav>
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
				<h1 style={{ color: "rgb(29,185,84)", marginLeft: "30px" }}>
					Trackify
				</h1>
			</Navbar.Brand>
		</Nav>
	);
};

const Nav = styled(Navbar)`
	background-color: rgb(04, 04, 04, 0.6);
`;
