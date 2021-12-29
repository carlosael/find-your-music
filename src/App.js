import React, { useState } from "react";
import "./styles.css";

import getSpotifyToken from "./utils/getSpotifyToken";
import Card from "./components/Card";

const baseURL = (pesquisa) =>
  `https://api.spotify.com/v1/search?q=${pesquisa}&type=track&limit=10`;

function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [tracks, setTracks] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState("");
  const [encontrado, setEncontrado] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!pesquisa) return;

    setErros("");
    setCarregando(true);

    try {
      const token = await getSpotifyToken();

      const response = await fetch(baseURL(pesquisa), {
        headers: {
          Authorization: token,
        },
      });

      const { tracks } = await response.json();

      setTracks(tracks.items);
      if (tracks.items.length === 0) {
        setEncontrado(true);
      } else {
        setEncontrado(false);
      }
    } catch (error) {
      setErros(error.message);
      setTracks([]);
    }
    setCarregando(false);
    setPesquisa("");
  }

  return (
    <>
      <div className="header">
        <h1>
          Encontre sua música <br /> no Spotify!
        </h1>
      </div>

      <div className="App">
        <form onSubmit={handleSubmit}>
          <label className="find">Digite sua música: </label>
          <input
            type="text"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </form>
        {carregando && <span className="loading">Carregando...</span>}
        {erros && <span className="error">{erros}</span>}
        {encontrado && <span className="not-found">Nada encontrado...</span>}
        <div className="musics">
          {tracks.map((track) => (
            <Card track={track} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
