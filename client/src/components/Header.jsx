import React from "react";
import styled from "styled-components";
import { Navbar } from "react-bootstrap";
import { useImage } from "react-image";

const Image = () => {
	const { src } = useImage({
		srcList: "../../images/logo.png",
	});

	return <img src={src} />;
};

export const Header = () => {
	return (
		<Nav>
			<Navbar.Brand>
				<img
					src={require("../images/bruhhh.png")}
					width="200"
					height="70"
					className="d-inline-block align-top"
				/>
			</Navbar.Brand>
		</Nav>
	);
};

const Nav = styled(Navbar)`
	background-color: rgb(25, 25, 25);
	margin-bottom: 100px;
`;
