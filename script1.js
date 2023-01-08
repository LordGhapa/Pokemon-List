;(() => {
  const ul = document.querySelector("[data-js='pokedex']")
  const fetchPokemon = () => {
    const pokemonsNumbers = 905
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemonPromises = []

    for (let i = 1; i <= pokemonsNumbers; i++) {
      pokemonPromises.push(fetch(getPokemonUrl(i)).then(r => r.json()))
    }

    Promise.all(pokemonPromises)
      .then(pokemons => {
        const lisPokemons = pokemons.reduce((acc, pokemon) => {
          const types = pokemon.types.map(typeInfo => typeInfo.type.name)

          acc += `
      <li class="card ${types[0]}" >
      <img class="card-image " alt="${pokemon.name}" src="${
            pokemon['sprites']['other']['official-artwork']['front_default']
          }" />
      <h2 class="card-title">${pokemon.id.toString().padStart(3, '0')}. ${
            pokemon.name
          }</h2>
      <p class="card-subtitle">${types.join(' | ')}</p>
      </li>`

          return acc
        }, '')

        ul.innerHTML = lisPokemons
        filter()
      })
      
  }

  fetchPokemon()

  function filter() {
    console.log("teste")
    const Load = document.querySelector('#load').style.display = 'none'


    const filterElement = document.querySelector('header input')

    const cards = document.querySelectorAll('.pokedex li ')

    filterElement.addEventListener('input', () => {
      filterCards()
    })

    function filterCards() {
      if (filterElement.value !== '') {
        for (let card of cards) {
          let pokemonName = `${card.querySelector('h2').textContent} ${
            card.querySelector('p').textContent
          }`

          pokemonName = pokemonName.toLocaleLowerCase()

          let filterText = filterElement.value.toLocaleLowerCase()
          if (!pokemonName.includes(filterText)) {
            card.style.display = 'none'
          } else {
            card.style.display = 'block'
          }
        }
      } else {
        for (let card of cards) {
          card.style.display = 'block'
        }
      }
    }
  }
})()
