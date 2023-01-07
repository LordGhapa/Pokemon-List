(() => {
  const ul = document.querySelector("[data-js='pokedex']")
  const fetchPokemon = () => {
    const pokemonsNumbers = 905
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemonPromises = []

    for (let i = 1; i <= pokemonsNumbers; i++) {
      pokemonPromises.push(fetch(getPokemonUrl(i)).then(r => r.json()))
    }

    Promise.all(pokemonPromises).then(pokemons => {
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
    })
  }

  fetchPokemon()
})()
