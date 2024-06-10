const API_SERVER = 'https://api.themoviedb.org/3'; 

const options = {
    method: 'GET', 
    headers: {
        accept: 'application/json', 
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
    }
};

const createElement = (tag, className, attributes = {}) => {
    const element = document.createElement(tag);
    
    if (className) {
        element.classList.add(className);
    }

    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
};


const fetchMoviesGrid = async (page = 1) => {

    const response = await fetch(`${API_SERVER}/movie/popular?page=${page}`, options); 
    const data = await response.json();  
    const movies = data.results;
    const tendenciasContainer = document.querySelector('.peliculasTendencia .peliculas');
    tendenciasContainer.innerHTML = '';
    movies.forEach(movie => {
        const pelicula = createElement('div', 'pelicula');
        const anchor = createElement('a', '');
        const img = createElement('img', 'imgTendencia', {
            src: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            alt: movie.title,
            loading: 'lazy'
        });
        const tituloPelicula = createElement('div', 'tituloPelicula');
        const titulo = createElement('h4', '');
        titulo.textContent = movie.title;
        
        // Agregamos los elementos al DOM
        // Creamos un contenedor para la película dentro del enlace
        tituloPelicula.appendChild(titulo); // Agregamos el título de la película al contenedor de título
        pelicula.append(img, tituloPelicula); // Agregamos la imagen y el contenedor de título a la película
        anchor.appendChild(pelicula); // Agregamos la película al enlace
        const peliculaWrapper = createElement('div', 'peliculas'); // Creamos un contenedor adicional para la película
        peliculaWrapper.appendChild(anchor); // Agregamos el enlace con la película al contenedor adicional
        tendenciasContainer.appendChild(peliculaWrapper); // Agregamos el contenedor adicional al contenedor de tendencias
    });

    tendenciasContainer.parentElement.setAttribute('data-page', page);
};

document.querySelector('.anterior').addEventListener('click', () => {
    let currentPage = Number(document.querySelector('.peliculasTendencia').getAttribute('data-page'));
    if (currentPage <= 1) return;
    fetchMoviesGrid(currentPage - 1);
});

document.querySelector('.siguiente').addEventListener('click', () => {
    let currentPage = Number(document.querySelector('.peliculasTendencia').getAttribute('data-page'));
    fetchMoviesGrid(currentPage + 1);
});


document.addEventListener('DOMContentLoaded', () => {
    fetchMoviesGrid();
});




