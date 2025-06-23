import { API_URL } from './utils.js';

function toggleTheme() {
    const body = document.body;
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'light');
    }
}

function shortenLink(event) {
    event.preventDefault();

    const input = document.getElementById('originalLink');
    const url = input.value;

    fetch(`${API_URL}/shorten`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json()) // converte para JSON
    .then(data => { // usa os dados convertidos
        if (data.detail || data.error) {
            console.error(data.detail || data.error);
            return;
        }

        if (data.shortened_url){
            document.getElementById('shortenedLink').value = data.shortened_url;
        }
    })
    .catch(error => {
        console.error(error);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.replace('/', '');

    console.log(`Current path: ${path}`);

    if (path) {
        fetch(`${API_URL}/${path}`)
            .then(response => response.json())
            .then(data => {
                if (data.url_original) {
                    document.getElementById('originalLink').value = data.url_original;
                } else if (data.detail) {
                    console.error(data.detail);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
});

window.toggleTheme = toggleTheme;
window.shortenLink = shortenLink;