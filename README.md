# Music Finder

Aplicação de busca de músicas que reúne, em uma única requisição, os dados da faixa no **Spotify** e a letra no **Genius**.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Spotify](https://img.shields.io/badge/Spotify_API-1DB954?logo=spotify&logoColor=white)

---

## Como funciona

O front-end envia o nome da música para o back-end, que:

1. Autentica no Spotify via *client credentials* e obtém um access token
2. Busca a faixa na API de search do Spotify
3. Extrai nome, artista, álbum e capa
4. Busca a letra correspondente no Genius
5. Devolve tudo junto em um único JSON

---

## Endpoint

```http
GET /musica-completa?nome=<nome da musica>
```

| Resposta | Situação |
|---|---|
| `200` | Faixa encontrada, com dados e letra |
| `400` | Parâmetro `nome` não informado |
| `404` | Música não encontrada no Spotify |
| `500` | Falha na autenticação com o Spotify |

---

## Estrutura

```
├── index.html        # Interface
├── script.js         # Lógica do front-end
├── style.css         # Estilos
└── backend/
    ├── server.js     # Servidor Express e rota principal
    ├── spotify.js    # Autenticação e access token do Spotify
    ├── lyrics.js     # Busca de letras no Genius
    └── database.js   # Conexão com MongoDB
```

---

## Como rodar

Requer **Node.js 18+**.

```bash
git clone https://github.com/EduardaBedetti/Music-Finder.git
cd Music-Finder/backend
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` dentro de `backend/`:

```env
SPOTIFY_CLIENT_ID=seu_client_id
SPOTIFY_CLIENT_SECRET=seu_client_secret
GENIUS_TOKEN=seu_token_do_genius
MONGO_URL=sua_connection_string
PORT=3000
```

| Credencial | Onde obter |
|---|---|
| `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` | [Spotify for Developers](https://developer.spotify.com/dashboard) |
| `GENIUS_TOKEN` | [Genius API Clients](https://genius.com/api-clients) |

> **Nunca versione o `.env`.** Ele contém segredos e está listado no `.gitignore`.

### Subindo o servidor

```bash
node server.js
```

O back-end sobe em `http://localhost:3000`. Abra o `index.html` para usar a interface.

---

## Stack

`express` · `axios` · `cors` · `dotenv` · `spotify-web-api-node` · `genius-lyrics` · `mongoose`
