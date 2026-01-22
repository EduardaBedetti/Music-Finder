async function buscarMusica() {
    const nome = document.getElementById("nomeMusica").value.trim();

    if (!nome) {
        alert("Digite o nome da música!");
        return;
    }

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = '<p style="color: white; font-weight: bold;">Carregando...</p>';

    try {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(nome)}&media=music&entity=song&country=BR&limit=1`;
        
        const resposta = await fetch(url);
        
        if (!resposta.ok) throw new Error(`Erro na API: ${resposta.status}`);

        const dados = await resposta.json();

        if (dados.resultCount === 0) {
            resultado.innerHTML = '<p style="color: white; font-weight: bold;">Música não encontrada 😢</p>';
            document.body.style.setProperty('--bg-image', 'none');
            return;
        }

        const musica = dados.results[0];

        const imagemAltaQualidade = musica.artworkUrl100.replace("100x100bb", "3000x3000bb");

        // --- ATUALIZA O FUNDO NO CSS ---
        document.body.style.setProperty('--bg-image', `url('${imagemAltaQualidade}')`);

        resultado.innerHTML = `
            <div class="card-musica card-transparente">
                <div class="info-texto">
                    <h2 class="titulo-musica">${musica.trackName}</h2>
                    <p class="artista-musica">${musica.artistName}</p>
                </div>
                <div class="player-container">
                    <h3>Preview:</h3>
                    <audio class="audio-player" controls autoplay src="${musica.previewUrl}"></audio>
                </div>
            </div>
        `;

    } catch (e) {
        console.error(e);
        resultado.innerHTML = '<p style="color: red;">Erro ao buscar. Tente novamente.</p>';
        document.body.style.setProperty('--bg-image', 'none');
    }
}