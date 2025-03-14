var API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
var BASE_URL = 'https://api.themoviedb.org/3';
var API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=pt-BR';
var API_URL_TvShows = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY + '&language=pt-BR';
var API_URL_generes = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=pt-BR&';
var VOTE_AVERAGE = BASE_URL + '/discover/movie?sort_by=vote_average.desc&' + API_KEY + '&language=pt-BR&page=1';
var ANIMATIONS = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=pt-BR&with_genres=16&page=1';
var today = new Date().toISOString().split('T')[0];
var API_URL_DESTAQUES = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=pt-BR&page=1&release_date.lte=' + today;

var IMG_URL = 'https://image.tmdb.org/t/p/w500';
var IMG_URL_PROMINENCE = 'https://image.tmdb.org/t/p/original';
var tabs = document.querySelectorAll('.tab-content');

var genres = [{
	"id": 28,
	"name": "Ação"
},
	{
		"id": 12,
		"name": "Aventura"
	},
	{
		"id": 16,
		"name": "Animação"
	},
	{
		"id": 35,
		"name": "Comédia"
	},
	{
		"id": 80,
		"name": "Crime"
	},
	{
		"id": 99,
		"name": "Documentário"
	},
	{
		"id": 18,
		"name": "Drama"
	},
	{
		"id": 10751,
		"name": "Família"
	},
	{
		"id": 14,
		"name": "Fantasia"
	},
	{
		"id": 36,
		"name": "História"
	},
	{
		"id": 27,
		"name": "Terror"
	},
	{
		"id": 10402,
		"name": "Música"
	},
	{
		"id": 9648,
		"name": "Mistério"
	},
	{
		"id": 10749,
		"name": "Romance"
	},
	{
		"id": 878,
		"name": "Ficção Científica"
	},
	{
		"id": 10770,
		"name": "Filme de TV"
	},
	{
		"id": 53,
		"name": "Suspense"
	},
	{
		"id": 10752,
		"name": "Guerra"
	},
	{
		"id": 37,
		"name": "Faroeste"
	}];

async function getMoviesBigSlide(url, page, whichContainer) {
	try {
		const response = await fetch(url + `&page=${page}`);
		const data = await response.json();

		let moviesContainer = document.querySelector(`${whichContainer}`);

		// Limpar o conteúdo atual
		moviesContainer.innerHTML = '';

		var indexMovie = 1;
		// Iterar sobre os resultados e criar cards
		data.results.forEach((movie, index) => {
			let card = document.createElement('div');
			card.classList.add('card');
			card.setAttribute('data-page', 'film-page');
			card.addEventListener('click', (event)=> {
				handleNavClick(event);
				getAllMoviesDetails(movie.id, movie.title || movie.name, movie.backgrop_path);
			});

			let content = document.createElement('div');
			content.classList.add('content');

			let clickEffect = document.createElement('div');
			clickEffect.classList.add('click-effect');

			// Adicionar a imagem do poster dentro da div click-effect

			let posterImg = document.createElement('img');
			posterImg.setAttribute('data-src', IMG_URL + movie.backdrop_path);
			posterImg.classList.add('img');
			

			clickEffect.appendChild(posterImg);
			content.appendChild(clickEffect);
			card.appendChild(content);

			let opc7 = document.createElement('div');
			opc7.classList.add('aligned-elements');

			let number = document.createElement('div');
			number.classList.add('number');
			number.textContent = indexMovie;

			let text = document.createElement('div');
			text.classList.add('text');

			let title = document.createElement('p');
			title.classList.add('title');
			title.textContent = movie.title || movie.name;

			let genre = document.createElement('p');
			genre.classList.add('f5');
			let movieGenres = movie.genre_ids.map(genreId => {
				let genre = genres.find(g => g.id === genreId);
				return genre ? genre.name: '';
			}).filter(Boolean).join(', ');
			genre.textContent = movieGenres;

			text.appendChild(title);
			text.appendChild(genre);

			opc7.appendChild(number);
			opc7.appendChild(text);

			card.appendChild(opc7);

			// Adicionar card ao contêiner

			if (movie.title != null) {
		    if (movie.vote_count > 900) {
		      indexMovie++
					moviesContainer.appendChild(card);
				}
		  } else {
		    if (movie.vote_count > 200) {
		      indexMovie++
					moviesContainer.appendChild(card);
				}
		  }
		});


		initLazyLoad();
	} catch (error) {
		console.error('Erro ao obter dados:',
			error);
	}
}

async function getMoviesSlide(url, page, whichContainer) {
	try {
		const response = await fetch(url + `&page=${page}`);
		const data = await response.json();

		let moviesContainer = document.querySelector(`${whichContainer}`);

		// Limpar o conteúdo atual
		moviesContainer.innerHTML = '';
    
		// Iterar sobre os resultados e criar cards
		data.results.forEach((movie, index) => {
			let card = document.createElement('div');
			card.classList.add('card');
			card.setAttribute('data-page', 'film-page');
			card.addEventListener('click', (event)=> {
				handleNavClick(event);
				getAllMoviesDetails(movie.id, movie.title || movie.name, movie.backgrop_path);
			});


			let clickEffect = document.createElement('div');
			clickEffect.classList.add('click-effect');

			// Adicionar a imagem do poster dentro da div click-effect
			let posterImg = document.createElement('img');
			posterImg.setAttribute('data-src', IMG_URL + movie.poster_path);
			posterImg.classList.add('img');

			// Adicionar card ao contêiner
			clickEffect.appendChild(posterImg);
			card.appendChild(clickEffect);
		  if (movie.title != null) {
		    if (movie.vote_count > 900) {
					moviesContainer.appendChild(card);
				}
		  } else {
		    if (movie.vote_count > 200) {
					moviesContainer.appendChild(card);
				}
		  }
		});


		initLazyLoad();
	} catch (error) {
		console.error('Erro ao obter dados:',
			error);
	}
}

async function getMoviesSlimSlide(url, page, whichContainer) {
	try {
		const response = await fetch(url + `&page=${page}`);
		const data = await response.json();

		let moviesContainer = document.querySelector(`${whichContainer}`);

		// Limpar o conteúdo atual
		moviesContainer.innerHTML = '';

		// Iterar sobre os resultados e criar cards
		data.results.forEach((movie, index) => {
			let card = document.createElement('div');
			card.classList.add('card');
			card.setAttribute('data-page', 'film-page');
			card.addEventListener('click', (event)=> {
				handleNavClick(event);
				getAllMoviesDetails(movie.id, movie.title || movie.name, movie.backgrop_path);
			});

			let clickEffect = document.createElement('div');
			clickEffect.classList.add('click-effect');

			// Adicionar a imagem do poster dentro da div click-effect
			let posterImg = document.createElement('img');
			posterImg.setAttribute('data-src',
				IMG_URL + movie.backdrop_path);
			posterImg.classList.add('img');
			posterImg.alt = movie.title + ' Poster';

			let title = document.createElement('p');
			title.classList.add('title');
			title.textContent = movie.title || movie.name;


			// Adicionar card ao contêiner
			clickEffect.appendChild(posterImg);
			clickEffect.appendChild(title);
			card.appendChild(clickEffect);
			if (movie.title != null) {
		    if (movie.vote_count > 900) {
					moviesContainer.appendChild(card);
				}
		  } else {
		    if (movie.vote_count > 200) {
					moviesContainer.appendChild(card);
				}
		  }
		});

		initLazyLoad();
	} catch (error) {
		console.error('Erro ao obter dados:',
			error);
	}
}

async function getMovieDetails(filmeId, container) {
	const detalhesUrl = `${BASE_URL}/movie/${filmeId}?${API_KEY}&language=pt-BR`;

	try {
		const response = await fetch(detalhesUrl);
		const data = await response.json();
		const plataformas = data.production_companies.map(company => company.name);

		if (data.vote_count >= 400) {

			// Elements
			let title = document.querySelector(`${container} .title`);
			let btnPlay = document.querySelector(`${container} .play`);
			let background = document.querySelector(`${container} .image-destaque`);
			let plataforms = document.querySelector(`${container} .plataform`);
			let mediaType = document.querySelector(`${container} .media-type`);
			let vote = document.querySelector(`${container} .vote_count`);
			let category = document.querySelector(`${container} .category`);
			let runtime = document.querySelector(`${container} .runtime`);

			btnPlay.addEventListener('click', (event)=> {
				getAllMoviesDetails(data.id, data.title || data.name, data.backgrop_path);
			});

			const TextTitle = data.title.split(' ');
			const maxWords = 6;
			let TitleFiltered = TextTitle.slice(0,
				maxWords).join(' ');

			if (TextTitle.length > maxWords) {
				TitleFiltered += '...';
			}

			title.innerText = TitleFiltered;
			
			if (container == '.popular-1') {
			  document.querySelector('#home .scroll .image-background').setAttribute('src', `${IMG_URL + data.backdrop_path}`);
			}
			
			background.setAttribute('src',
				IMG_URL_PROMINENCE + data.backdrop_path);
			const platform = plataformas[0].split(' ');
			const filtered = platform.slice(0,
				3).join(' ');
			plataforms.innerText = filtered;
			vote.innerText = `${data.vote_average} relevate`;


			let movieGenres = data.genres

			category.innerHTML = '';

			if (data.genres.length >= 2) {
				let genre_1 = document.createElement('div');
				genre_1.innerHTML = movieGenres[0].name;
				category.appendChild(genre_1);

				let genre_2 = document.createElement('div');
				genre_2.innerHTML = movieGenres[1].name;
				category.appendChild(genre_2);

			} else if (data.genres.length = 1) {

				let genre_1 = document.createElement('div');
				genre_1.innerHTML = movieGenres[0].name;
				category.appendChild(genre_1);

			} else {
				category.innerHTML = '';
			}


			let runtimeInMinutes = data.runtime;
			let hours = Math.floor(runtimeInMinutes / 60);
			let minutes = runtimeInMinutes % 60;
			if (hours > 0) {
				runtime.innerText = `${hours}h ${minutes}min`;
			} else {
				runtime.innerText = `${minutes}min`;
			}

			console.log(data)

			await checkMediaType(data.imdb_id,
				container);

			async function checkMediaType(imdbId, container) {
				const tmdbApiUrl = `${BASE_URL}/find/${imdbId}?${API_KEY}&external_source=imdb_id`;

				try {
					const response = await fetch(tmdbApiUrl);
					const data = await response.json();

					if (data.movie_results.length > 0) {
						mediaType.innerText = "Filme ";
					} else if (data.tv_results.length > 0) {
						mediaType.innerText = "Série ";
					} else {
						console.log('Nenhum resultado encontrado para o ID ', imdbId);
					}
				} catch (error) {
					console.error('Erro ao obter dados:', error);
					highlights('.popular-2');
					highlights('.popular-1');
				}
			}

		} else {
			highlights('.popular-1');
			highlights('.popular-2');
		}

	} catch (error) {
		console.error('Ocorreu um erro:',
			error);
	}
}

async function getMoviesHighlights(url, page, whichContainer) {
	try {
		const response = await fetch(url + `&page=${page}`);
		const data = await response.json();

		// let numberFilms = data.results.length;
		function generateRandomNumber() {
			return Math.floor(Math.random() * 19/*numberFilms*/);
		}

		let firstMovie = data.results[generateRandomNumber()];
		console.log(firstMovie)

		await getMovieDetails(firstMovie.id,
			whichContainer);
		initLazyLoad();
	} catch (error) {
		console.error('Erro ao obter dados:',
			error);
	}
} 

window.initLazyLoad = function initLazyLoad() {
	const lazyImages = document.querySelectorAll('.img');
	// const lazyLoader = document.querySelectorAll('.all-slides .card');

	lazyImages.forEach(imagens => imagens.classList.remove('loaded'));
	// lazyLoader.forEach(imagens => imagens.classList.remove('loaded'));

	const lazyLoad = target => {
		const io = new IntersectionObserver((entries,
			observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const img = entry.target;
					img.src = img.dataset.src;
					observer.unobserve(img);
				  img.classList.add('loaded');
				}
			});
		});

		io.observe(target);
	};
	/*
	const lazyLoad2 = target => {
		const io = new IntersectionObserver((entries,
			observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const img = entry.target;
					setTimeout(function() {
					  img.classList.add('loaded');
					}, 2000);
				}
			});
		});

		io.observe(target);
	};
*/
	lazyImages.forEach(lazyLoad);
	// lazyLoader.forEach(lazyLoad2);
}


let timeoutId;

function scheduleImageUnload() {
	clearTimeout(timeoutId);
	// timeoutId = setTimeout(() => {
	// 		unloadImages();
	// 	}, 200);
}
//
// Descarregar imagens não visualizadas
// function unloadImages() {
// 	const loadedImages = document.querySelectorAll('.img[src^="https://image.tmdb.org/t/p/w500"]');
//
// 	loadedImages.forEach(img => {
// 		img.removeAttribute('src');
// 		img.classList.remove('loaded')
// 	});
// }

// Adicionar listeners para monitorar a visibilidade dos cards
document.addEventListener('visibilitychange', scheduleImageUnload);
document.addEventListener('scroll', scheduleImageUnload);

window.showMoviesSlides = function showMoviesSlides(API) {
	contentHome(API);
	contentSearch(API);
	contentDiscover(API);
	contentFilmPage(API);
}

window.generateRandomPage = function generateRandomPage() {
		return Math.floor(Math.random() * 100);
}

function contentHome(API) {
	// SIMPLE SLIDE CARD
	getMoviesSlide(API, generateRandomPage(), '.slide-1');
	getMoviesSlide(API, generateRandomPage(), '.slide-2');
	getMoviesSlide(API, generateRandomPage(), '.slide-3');
	getMoviesSlide(API, generateRandomPage(), '.slide-4');
	
	// BIG SLIDE CARD
	getMoviesBigSlide(API, 1, '.b-slide-1');

	// SLIM SLIDE CARD
	getMoviesSlimSlide(API, generateRandomPage(), '.s-slide-1');
	getMoviesSlimSlide(API, generateRandomPage(), '.s-slide-3');
	getMoviesSlimSlide(API, generateRandomPage(), '.s-slide-4');
	getMoviesSlimSlide(API, generateRandomPage(), '.s-slide-5');
	getMoviesSlimSlide(API, generateRandomPage(), '.s-slide-6');
	getMoviesSlimSlide(API, generateRandomPage(), '.s-slide-7');
	

	// HIGHLIGHTS
	highlights('.popular-1');

}

function contentSearch(API) {
	// SIMPLE SLIDE CARD
	getMoviesBigSlide(API_URL, generateRandomPage(), '.slide-5');

}

function contentFilmPage(API) {}

function contentDiscover(API) {
	
  getMoviesSlimSlide(API_URL, generateRandomPage(), '.s-slide-8');
	getMoviesSlimSlide(API_URL, generateRandomPage(), '.s-slide-9');
	getMoviesSlimSlide(API_URL, generateRandomPage(), '.s-slide-10');
	
	highlights('.popular-2');
}

window.highlights = function highlights(atributeTab) {
  getMoviesHighlights(API_URL, generateRandomPage(), atributeTab);
}

showMoviesSlides(API_URL);

const btnMovieSubPage = document.querySelector('#home .category-selector .movie');

const btnTvShowSubPage = document.querySelector('#home .category-selector .tvShow');


btnMovieSubPage.addEventListener('click', ()=> {
	btnTvShowSubPage.classList.remove('active');
	btnMovieSubPage.classList.add('active');
	showMoviesSlides(API_URL);
	setTimeout(function() {
		document.querySelector('#home .popular').classList.remove('hidden');
	}, 1000);
});

btnTvShowSubPage.addEventListener('click', ()=> {
	btnTvShowSubPage.classList.add('active');
	btnMovieSubPage.classList.remove('active');
	showMoviesSlides(API_URL_TvShows);
	setTimeout(function() {
		document.querySelector('#home .popular').classList.add('hidden');
	}, 1000);
});