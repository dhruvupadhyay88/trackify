import React from "react";
import styled from "styled-components";
import { Navbar } from "react-bootstrap";

export const Header = () => {
	return (
		<Navbar bg="rgb(100,100,100)">
			<Navbar.Brand href="#home">
				<img src="../../images/logo.png" />
			</Navbar.Brand>
		</Navbar>
	);
};
