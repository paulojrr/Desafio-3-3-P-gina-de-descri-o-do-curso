const cards = document.querySelectorAll('.card')

// Redireciona a página para rota /description passando o id do vídeo
for (let card of cards) {
    card.addEventListener("click", () => {
        const videoId = card.getAttribute('id');
        window.location.href = `/description?id=${videoId}`;
    })
}