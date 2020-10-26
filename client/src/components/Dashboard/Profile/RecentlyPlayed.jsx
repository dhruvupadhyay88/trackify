import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Table, Button } from "react-bootstrap";

export const RecentlyPlayed = ({ trackData }) => {
	const [recentlyPlayed, setRecentlyPlayed] = useState();
	const [tableRange, setTableRange] = useState([0, 10]);
	const [isDisabled, setIsDisabled] = useState([true, false]);
	const length = recentlyPlayed ? recentlyPlayed.items.length : 0;

	useEffect(() => {
		setRecentlyPlayed(trackData);
		setTableRange([0, 10]);
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
			{recentlyPlayed && (
				<>
					<thead>
						<tr>
							<th>Cover</th>
							<th>Song Name</th>
							<th>Artists</th>
							<th>Explicit Lyrics</th>
							<th>Popularity</th>
						</tr>
					</thead>
					<tbody>
						{recentlyPlayed.items
							.slice(tableRange[0], tableRange[1])
							.map((data, index) => {
								const artists = data.track.artists.length;
								return (
									<tr key={index}>
										<td>
											{
												<img
													src={
														data.track.album
															.images[0].url
													}
													style={{ height: 40 }}
												/>
											}
										</td>
										<td>{data.track.name}</td>
										<td>
											{data.track.artists.map(
												(data, index) => {
													if (artists === index + 1) {
														return data.name;
													}
													return data.name + ", ";
												}
											)}
										</td>
										<td>
											{data.track.explicit ? "Yes" : "No"}
										</td>
										<td>{data.track.popularity}</td>
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
