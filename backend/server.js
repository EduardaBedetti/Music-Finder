require('dotenv').config();
console.log("ID LIDO:", process.env.SPOTIFY_CLIENT_ID);
console.log("SECRET LIDO:", process.env.SPOTIFY_CLIENT_SECRET);
console.log("GENIUS:", process.env.GENIUS_TOKEN);

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { getAccessToken } = require("./spotify");
const { getLyrics } = require("./lyrics");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/musica-completa", async (req, res) => {
    const nomeMusica = req.query.nome;

    if (!nomeMusica) {
        return res.status(400).json({ error: "Nome obrigatório" });
    }

    try {
        const token = await getAccessToken();
        if (!token) {
            return res.status(500).json({ error: "Erro de autenticação com o Spotify" });
        }

        // Busca faixa no Spotify
        const response = await axios.get("https://api.spotify.com/v1/search", {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                q: nomeMusica,
                type: "track",
                limit: 1,
            },
        });

        if (response.data.tracks.items.length === 0) {
            return res.status(404).json({ error: "Música não encontrada" });
        }

        const musica = response.data.tracks.items[0];

        const capaUrl =
            musica.album.images?.length > 0 ? musica.album.images[0].url : null;

        // Busca letra no Genius
        let letraFinal = "Letra não encontrada 😢";

        try {
            // CORREÇÃO AQUI 👇
            letraFinal = await getLyrics(`${musica.artists[0].name} ${musica.name}`);
        } catch (e) {
            console.log("Erro ao buscar letra:", e.message);
        }

        res.json({
            nome: musica.name,
            artista: musica.artists[0]?.name || "Desconhecido",
            capa: capaUrl,
            preview: musica.preview_url,
            letra: letraFinal,
        });

    } catch (error) {
        console.error("Erro geral:", error.message);
        res.status(500).json({ error: "Erro interno" });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
