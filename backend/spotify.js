require('dotenv').config();
const axios = require('axios');
const querystring = require('querystring');

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

async function getAccessToken() {
    if (!client_id || !client_secret) {
        console.error("ERRO: Credenciais não encontradas no .env");
        return null;
    }

    try {
        // ✅ URL OFICIAL DE AUTENTICAÇÃO DO SPOTIFY
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            querystring.stringify({
                grant_type: 'client_credentials'
            }), 
            {
                headers: {
                    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error("Erro no Token:", error.response ? error.response.data : error.message);
        return null;
    }
}

module.exports = { getAccessToken };