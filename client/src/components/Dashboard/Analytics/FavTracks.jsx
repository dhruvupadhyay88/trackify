import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Table, Button } from "react-bootstrap";

export const FavTracks = ({ trackData }) => {
	const [favTracks, setFavTracks] = useState();
	const [tableRange, setTableRange] = useState([0, 10]);
	const [isDisabled, setIsDisabled] = useState([true, false]);
	const length = favTracks ? favTracks.items.length : 0;

	useEffect(() => {
		setFavTracks(trackData);
		setTableRange([0, 10]);
		setIsDisabled([true, false]);
	}, [trackData]);

	const Next = () => {
		setIsDisabled(prevState => {
			const ans = tableRange[1] + 10 === length ? true : false;
			return [false, ans];
		});
		setTableRange(prevState => [prevState[0] + 10, prevState[1] + 10]);
	};

	const Previous = () => {
		setIsDisabled(prevState => {
			const ans = tableRange[0] - 10 === 0 ? true : false;
			return [ans, false];
		});
		setTableRange(prevState => [prevState[0] - 10, prevState[1] - 10]);
	};

	return (
		<Table striped bordered hover variant="dark" size="md">
			{favTracks && (
				<>
					<thead>
						<tr>
							<th>Rank</th>
							<th>Song Name</th>
							<th>Artists</th>
							<th>Album</th>
							<th>Cover</th>
						</tr>
					</thead>
					<tbody>
						{favTracks.items
							.slice(tableRange[0], tableRange[1])
							.map((data, index) => {
								const artists = data.artists.length;
								return (
									<tr key={index}>
										<td>{index + tableRange[0] + 1}</td>
										<td>{data.name}</td>
										<td>
											{data.artists.map((data, index) => {
												if (artists === index + 1) {
													return data.name;
												}
												return data.name + ", ";
											})}
										</td>
										<td>{data.album.name}</td>
										<td
											style={{
												display: "flex",
												justifyContent: "center",
											}}>
											{
												<img
													src={
														data.album.images[0].url
													}
													style={{ height: 40 }}
												/>
											}
										</td>
									</tr>
								);
							})}
						<tr>
							<td colSpan="5">
								<ButtonGroup>
									<CustomButton
										variant="dark"
										disabled={isDisabled[0]}
										onClick={Previous}>
										Previous
									</CustomButton>
									<CustomButton
										variant="dark"
										disabled={isDisabled[1]}
										onClick={Next}>
										Next
									</CustomButton>
								</ButtonGroup>
							</td>
						</tr>
					</tbody>
				</>
			)}
		</Table>
	);
};

const ButtonGroup = styled.div`
	display: flex;
	flex-direction: inline-block;
	float: right;
`;

const CustomButton = styled(Button)`
	border-radius: 15px;
	margin-right: 10px;
`;
