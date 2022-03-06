require("dotenv").config();
var express = require("express"); 
var request = require("request"); 
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var port = process.env.port || 8888;
var client_id = process.env.CLIENT_ID; 
var client_secret = process.env.CLIENT_SECRET; 
var redirect_uri = "http://localhost:8888/callback"; 

var generateRandomString = function (length) {
	var text = "";
	var possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

var stateKey = "spotify_auth_state";

var app = express();

app.use(express.static(__dirname + "/public"))
	.use(cors())
	.use(cookieParser());

app.get("/login", function (req, res) {
	var state = generateRandomString(16);
	res.cookie(stateKey, state);

	var scope =
		"user-read-private playlist-modify-public user-top-read playlist-modify-private user-read-recently-played playlist-modify-private user-read-email";
	res.redirect(
		"https://accounts.spotify.com/authorize?" +
			querystring.stringify({
				response_type: "code",
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: state,
			})
	);
});

app.get("/callback", function (req, res) {

	var code = req.query.code || null;
	var state = req.query.state || null;
	var storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect(
			"/#" +
				querystring.stringify({
					error: "state_mismatch",
				})
		);
	} else {
		res.clearCookie(stateKey);
		var authOptions = {
			url: "https://accounts.spotify.com/api/token",
			form: {
				code: code,
				redirect_uri: redirect_uri,
				grant_type: "authorization_code",
			},
			headers: {
				Authorization:
					"Basic " +
					new Buffer(client_id + ":" + client_secret).toString(
						"base64"
					),
			},
			json: true,
		};

		request.post(authOptions, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				var access_token = body.access_token,
					refresh_token = body.refresh_token;

				var options = {
					url: "https://api.spotify.com/v1/me",
					headers: { Authorization: "Bearer " + access_token },
					json: true,
				};

				request.get(options, function (error, response, body) {
					console.log(body);
				});
				
				res.redirect(
					"http://localhost:3000/#" +
						querystring.stringify({
							access_token: access_token,
							refresh_token: refresh_token,
						})
				);
			} else {
				res.redirect(
					"/#" +
						querystring.stringify({
							error: "invalid_token",
						})
				);
			}
		});
	}
});

app.get("/refresh_token", function (req, res) {
	var refresh_token = req.query.refresh_token;
	var authOptions = {
		url: "https://accounts.spotify.com/api/token",
		headers: {
			Authorization:
				"Basic " +
				new Buffer(client_id + ":" + client_secret).toString("base64"),
		},
		form: {
			grant_type: "refresh_token",
			refresh_token: refresh_token,
		},
		json: true,
	};

	request.post(authOptions, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var access_token = body.access_token;
			res.send({
				access_token: access_token,
			});
		}
	});
});

console.log("Listening on 8888");
app.listen(port);
