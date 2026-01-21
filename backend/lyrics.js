const axios = require("axios");

async function getLyrics(artist, title) {
    try {
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
        const response = await axios.get(url);

        return response.data.lyrics || "Letra não encontrada 😢";

    } catch (error) {
        console.error("Erro ao buscar letra:", error.message);
        return "Letra não encontrada 😢";
    }
}

module.exports = { getLyrics };
