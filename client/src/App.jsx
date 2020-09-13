import React, { useState } from "react";
import Spotify from "spotify-web-api-js";
import styled from "styled-components";

const spotifyWebApi = new Spotify();
const getHashParams = () => {
    var hashParams = {};
    var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
};

export const App = () => {
    const params = getHashParams();
    const [data, setData] = useState({
        loggedIn: params.access_token ? true : false,
        info: "",
    });

    return (
        <div>
            {!data.loggedIn ? (
                <a href="http://localhost:8888">
                    <button>Login to Spotify</button>
                </a>
            ) : (
                <div>yo</div>
            )}
        </div>
    );
};
