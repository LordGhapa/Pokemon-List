const pokemonList=document.querySelector(".pokedex")
const Load=document.querySelector("#load")

pokemonList.style.display="none"





setTimeout(() => {
  load.style.display="none"
  pokemonList.style.display="grid"


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
}, 4000)
