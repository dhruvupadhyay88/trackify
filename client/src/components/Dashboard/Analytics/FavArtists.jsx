import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Table, Button } from "react-bootstrap";

export const FavArtists = ({ artistData }) => {
	const [favArtists, setFavArtists] = useState();
	const [tableRange, setTableRange] = useState([0, 10]);
	const [isDisabled, setIsDisabled] = useState([true, false]);
	const length = favArtists ? favArtists.items.length : 0;

	useEffect(() => {
		setFavArtists(artistData);
		setTableRange([0, 10]);
		setIsDisabled([true, false]);
	}, [artistData]);

	const Next = () => {
		setIsDisabled(prevState => {
			const ans = tableRange[1] + 10 >= length ? true : false;
			return [false, ans];
		});
		setTableRange(prevState => [prevState[0] + 10, prevState[1] + 10]);
	};

	const Previous = () => {
		setIsDisabled(prevState => {
			const ans = tableRange[0] - 10 <= 0 ? true : false;
			return [ans, false];
		});
		setTableRange(prevState => [prevState[0] - 10, prevState[1] - 10]);
	};

	return (
		<Table striped bordered hover variant="dark" size="md">
			{favArtists && (
				<>
					<thead>
						<tr>
							<th>Rank</th>
							<th>Picture</th>
							<th>Name</th>
							<th>Popularity</th>
							<th>Genre</th>
						</tr>
					</thead>
					<tbody>
						{favArtists.items
							.slice(tableRange[0], tableRange[1])
							.map((data, index) => {
								const genres =
									data.genres.length > 3
										? 3
										: data.genres.length;
								return (
									<tr key={index}>
										<td>{index + tableRange[0] + 1}</td>
										<td
											style={{
												display: "flex",
												justifyContent: "center",
											}}>
											{
												<img
													src={data.images[0].url}
													style={{ height: "80px" }}
												/>
											}
										</td>
										<td>{data.name}</td>
										<td>{data.popularity}</td>
										<td>
											{data.genres
												.slice(0, genres)
												.map((data, index) => {
													if (genres === index + 1) {
														return data;
													}

													return data + ", ";
												})}
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
