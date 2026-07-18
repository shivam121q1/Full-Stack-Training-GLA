import { useEffect, useState } from "react";
import "./RandomGif.css";
import axios from 'axios';

const API_KEY = "mcB9uRgomBI8oncJ8vCR54y7lhnDAXkL";

const RandomGif = () => {

    const [gif, setGif] = useState("");
    //fetch gif server
    //store server response in state

    async function randomGif() {
        const url = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`);
        const gifUrl = url.data.data.images.downsized.url;
        setGif(gifUrl)
        // console.log(url.data.data.images.downsized.url);
    }

    useEffect(() => {
        randomGif()
    }, [])

    return (
        <section className="random-container">
            <h2>Random GIF</h2>

            <div className="gif-box">
                <img src={gif} alt="Random Gif" />
            </div>

            <button className="btn" onClick={randomGif}>
                Generate Random GIF
            </button>
        </section>
    );
};

export default RandomGif;