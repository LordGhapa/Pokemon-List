const ul = document.querySelector('#pokeUl')
const url = 'https://pokeapi.co/api/v2/pokemon/'
const pokemonsNumbers = 10
const fetchPokemons = async data => {
  const res = await fetch(data).catch(r => console.erro(r))
  const pokemon = await res.json()

  render(pokemon)
}
for (let i = 1; i < pokemonsNumbers + 1; i++) {
  const pokemonsUrls = url + i
  fetchPokemons(pokemonsUrls)
}

function render(pokemon) {
  const types = pokemon.types.map(typeInfo => typeInfo.type.name)
  const pokeImg =
    pokemon['sprites']['other']['official-artwork']['front_default']
  const pokeInnerHTML = `
  <li class="card ${types[0]}" >
  <img class="card-image " alt="${pokemon.name}" src="${pokeImg}" />
  <h2 class="card-title">${pokemon.id.toString().padStart(3, '0')}. ${
    pokemon.name
  }</h2>
  <p class="card-subtitle">${types.join(' | ')}</p>
  </li>`

  ul.innerHTML += pokeInnerHTML
}
