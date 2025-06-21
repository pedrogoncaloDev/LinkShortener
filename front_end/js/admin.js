function toggleTheme() {
    const body = document.body;
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'light');
    }
}

function syncTableHeaderWidths() {
    const table = document.querySelector('.table');
    if (!table) return;
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    if (!thead || !tbody) return;
    const ths = thead.querySelectorAll('th');
    const firstRow = tbody.querySelector('tr');
    if (!firstRow) return;
    const tds = firstRow.querySelectorAll('td');
    if (ths.length !== tds.length) return;
    for (let i = 0; i < ths.length; i++) {
        const width = tds[i].offsetWidth;
        ths[i].style.width = width + 'px';
        tds[i].style.width = width + 'px';
    }
}

window.addEventListener('DOMContentLoaded', function() {
    syncTableHeaderWidths();
});
window.addEventListener('resize', function() {
    syncTableHeaderWidths();
});

// Se os dados forem carregados dinamicamente, chame syncTableHeaderWidths() após inserir as linhas.