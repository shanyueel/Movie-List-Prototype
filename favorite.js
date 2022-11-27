const baseURL = 'https://movie-list.alphacamp.io'
const indexURL = baseURL + '/api/v1/movies/'
const posterURL = baseURL + '/posters/'

const moviesData = JSON.parse(localStorage.getItem('favoriteMovies'))

const dataPanel = document.querySelector('#data-panel')

const searchFrom = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

function renderMovieList(data) {
  let rawHTML = ''

  data.forEach(item => {
    rawHTML += `<div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img src="${posterURL + item.image}" class="card-img-top" alt="Movie Poster">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
                data-bs-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
            </div>
          </div>
        </div>
      </div>`
  });

  dataPanel.innerHTML = rawHTML
}

function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')

  axios.get(indexURL + id)
    .then(response => {
      const data = response.data.results
      modalTitle.innerText = data.title
      modalDate.innerText = `release at: ${data.release_date}`
      modalDescription.innerText = data.description
      modalImage.innerHTML = `<img src="${posterURL + data.image}" alt="movie-poster"
                class="img-fluid">`
    })
}

function removeFromFavorite(id) {
  if (!movies || !movies.length) return

  const movieIndex = moviesData.findIndex((movie) => movie.id === parseInt(id))
  if (movieIndex === -1) return

  moviesData.splice(movieIndex, 1)

  localStorage.setItem('favoriteMovies', JSON.stringify(moviesData))

  renderMovieList(moviesData)
}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    console.log(Number(event.target.dataset.id))
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(event.target.dataset.id)
  }
})

renderMovieList(moviesData)