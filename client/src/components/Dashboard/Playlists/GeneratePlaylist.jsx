import Spotify from "spotify-web-api-js";

const spotify = new Spotify();

export const GeneratePlaylist = async (params, setLoading) => {
	const info = await spotify.getMe();
	//const visibility = params.visibility === "Public" ? true : false;

	await spotify.createPlaylist(info.id, {
		name: "YOOOO",
		public: true,
		description: "yoyoyo",
	});

	setLoading(false);
};
