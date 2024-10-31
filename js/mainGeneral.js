const generos = ['ISEKAI', 'ACCION', 'AVENTURA', 'FANTASIA', 'SLICE OF LIFE', 'DRAMA', 'COMEDIA', 'ROMANCE', 'FICCION', 'MISTERIO', 'HORROR', 'THRILLER', 'MAGIA', 'DEPORTES', 'MECHA', 'HAREM INVERSO', 'HENTAI'];
const bookShelfNovela = document.querySelector('.book-shelf-Novela');
import { librosNovela } from "../Data/dataNovela.js";

document.addEventListener('DOMContentLoaded', Iniciar);

function Iniciar() {
    const genreForm = document.getElementById('NovelaGenreForm');
    const libros = librosNovela;

    organizarLibrosEnEstante(libros, bookShelfNovela);

    genreForm.addEventListener('change', () => realizarBusqueda(libros, bookShelfNovela));
}

function realizarBusqueda(libros, bookShelf) {
    const generoSeleccionado = document.querySelector('input[name="generos[]"]:checked');
    const genero = generoSeleccionado ? generoSeleccionado.value.toLowerCase() : '';
    const librosFiltrados = libros.filter(libro => 
        genero === '' || libro.generos.map(g => g.toLowerCase()).includes(genero)
    );
    
    organizarLibrosEnEstante(librosFiltrados, bookShelf);
}

function organizarLibrosEnEstante(libros, bookShelf) {
    bookShelf.innerHTML = '';
    const librosPorGenero = {};

    libros.forEach(libro => {
        libro.generos.forEach(genero => {
            if (!librosPorGenero[genero]) {
                librosPorGenero[genero] = [];
            }
            librosPorGenero[genero].push(libro);
        });
    });

    const shuffledGenres = shuffleArray(Object.keys(librosPorGenero));

    shuffledGenres.forEach(genero => {
        const generoElemento = document.createElement('div');
        generoElemento.classList.add('genre-row');

        const tituloGenero = document.createElement('h2');
        tituloGenero.textContent = genero;
        generoElemento.appendChild(tituloGenero);

        const contenedorElemento = document.createElement('div');
        contenedorElemento.classList.add('row-container');

        const filaElemento = document.createElement('div');
        filaElemento.classList.add('row');
        filaElemento.style.display = 'flex';
        filaElemento.style.overflowX = 'hidden';

        const arrowLeft = document.createElement('button');
        arrowLeft.classList.add('arrow', 'left-arrow');
        arrowLeft.innerHTML = '&#9664;';
        arrowLeft.onclick = () => scrollBooks(filaElemento, -1);
        contenedorElemento.appendChild(arrowLeft);

        const shuffledBooks = shuffleArray(librosPorGenero[genero]);

        shuffledBooks.forEach(libro => {
            const libroElemento = document.createElement('div');
            const infoElemento = document.createElement('div');

            libroElemento.classList.add('download-link');
            libroElemento.setAttribute('id', libro.id);
            libroElemento.setAttribute('data-generos', JSON.stringify(libro.generos));

            const imagenElemento = document.createElement('img');
            imagenElemento.src = `https://lh3.googleusercontent.com/d/${libro.imagen}`;
            imagenElemento.alt = libro.nombre;
            imagenElemento.addEventListener('click', () => window.location.href = `./Generico/genericoGeneral.html?id=${libro.id}`);

            const h3Elemento = document.createElement('h3');
            h3Elemento.textContent = libro.nombre;

            infoElemento.classList.add('info');
            infoElemento.appendChild(h3Elemento);
            infoElemento.addEventListener('click', () => window.location.href = `./Generico/genericoGeneral.html?id=${libro.id}`);

            libroElemento.appendChild(imagenElemento);
            libroElemento.appendChild(infoElemento);
            filaElemento.appendChild(libroElemento);
        });

        const arrowRight = document.createElement('button');
        arrowRight.classList.add('arrow', 'right-arrow');
        arrowRight.innerHTML = '&#9654;';
        arrowRight.onclick = () => scrollBooks(filaElemento, 1);
        contenedorElemento.appendChild(filaElemento);
        contenedorElemento.appendChild(arrowRight);

        generoElemento.appendChild(contenedorElemento);
        bookShelf.appendChild(generoElemento);
    });
}

function scrollBooks(row, direction) {
    const scrollAmount = 200; 
    const currentScrollLeft = row.scrollLeft;
    const maxScrollLeft = row.scrollWidth - row.clientWidth;

    if (direction === 1) { 
        if (currentScrollLeft + scrollAmount >= maxScrollLeft) {
            row.scrollLeft = 0; 
        } else {
            row.scrollBy({
                top: 0,
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    } else { 
        if (currentScrollLeft - scrollAmount < 0) {
            row.scrollLeft = maxScrollLeft; 
        } else {
            row.scrollBy({
                top: 0,
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
