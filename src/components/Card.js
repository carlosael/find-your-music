import React from "react";
import getAlbumCover from "../utils/getAlbumCover";
import getArtistsNames from "../utils/getArtistsNames";

function Card({ track }) {
    const { name, album, external_urls, artists } = track;

    return (
        <div className="card">
            <a href={external_urls.spotify}>
                <img src={getAlbumCover(album)} alt={`${name} album cover`} />
            </a>
            <span>{name}<br/>{getArtistsNames(artists)}</span>
            
        </div>
    );
}

export default Card;
