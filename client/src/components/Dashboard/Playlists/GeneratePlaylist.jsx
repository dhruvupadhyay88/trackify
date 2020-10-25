import Spotify from "spotify-web-api-js";

const spotify = new Spotify();

export const generatePlaylist = async (params, setComplete) => {
	const info = await spotify.getMe();
	const isPublic = params.visibility === "Public" ? true : false;
	const playlistName = params.name ? params.name : "My Playlist";

	const playlist = await spotify.createPlaylist(info.id, {
		name: playlistName,
		public: isPublic,
	});

	const favTracks = await spotify.getMyTopTracks({
		limit: 50,
		time_range: params.time,
	});
	const favArtists = await spotify.getMyTopArtists({
		limit: 50,
		time_range: params.time,
	});

	let tracks = [];
	if (params.preference === "Artists") {
		tracks = await generateArtistTracks(favArtists, params.length);
	} else if (params.preference === "Tracks") {
		tracks = await generateTopTracks(favTracks, params.length);
	} else {
		tracks = await bothTracks(favArtists, favTracks, params.length);
	}

	spotify.addTracksToPlaylist(playlist.id, tracks);

	setComplete(true);
};

const bothTracks = async (favArtists, favTracks, length) => {
	let tracks = [];
	const capacity = favArtists.items.length > 5 ? 5 : favArtists.items.length;
	const num = Math.trunc(length / 2 / capacity); // int division
	let difference =
		num * capacity === length / 2 ? 0 : length / 2 - num * capacity;
	console.log(favTracks);
	for (let i = 0; i < capacity; i++) {
		const artist = favArtists.items[i];
		const topTracks = await spotify.getArtistTopTracks(
			artist.id,
			"from_token"
		);

		for (let j = 0; j < num + difference; j++) {
			tracks.push(topTracks.tracks[j].uri);
		}
		difference = 0;
	}

	let count = 0;
	let index = 0;
	while (count < length / 2) {
		const track = favTracks.items[index].uri;
		if (!tracks.includes(index)) {
			tracks.push(track);
			count += 1;
		}
		index += 1;
	}

	return tracks.sort(() => Math.random() - 0.5);
};

const generateArtistTracks = async (favArtists, length) => {
	let tracks = [];
	const capacity =
		favArtists.items.length > 10 ? 10 : favArtists.items.length;
	const num = Math.trunc(length / capacity); // int division
	let difference = num * capacity === length ? 0 : length - num * capacity;

	for (let i = 0; i < capacity; i++) {
		const artist = favArtists.items[i];
		const topTracks = await spotify.getArtistTopTracks(
			artist.id,
			"from_token"
		);

		for (let j = 0; j < num + difference; j++) {
			tracks.push(topTracks.tracks[j].uri);
		}
		difference = 0;
	}
	return tracks.sort(() => Math.random() - 0.5);
};

const generateTopTracks = async (favTracks, length) => {
	let tracks = [];
	for (let i = 0; i < length; i++) {
		tracks.push(favTracks.items[i].uri);
	}

	return tracks.sort(() => Math.random() - 0.5);
};
