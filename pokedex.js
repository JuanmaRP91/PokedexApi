const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => Array(151).fill().map((_, index) =>
  (fetch(getPokemonUrl(index + 1)).then(response => response.json())) 
) 
 
const generateHTML = pokemons => {
  return pokemons.reduce((accumulator, { name, id, types, sprites: { front_default: img}  }) => { 
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    accumulator += `              
      <li class="card ${elementTypes[0]}">                       
      <img class="card-image alt="${name}" src="${img}"</img> 
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${elementTypes.join(" | ")}</p>
      </li>
    `
    return accumulator 
  }, "")
}

const insertPokemonsIntoPage = pokemons => { 
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

const filterPokemons = event => {
  const inputValue = event.target.value.toLowerCase()
  const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(inputValue))
  const html = generateHTML(filteredPokemons)
  insertPokemonsIntoPage(html)
}
 
const pokemonPromises = generatePokemonPromises()
let allPokemons = []

Promise.all(pokemonPromises)
  .then(pokemons => {
    allPokemons = pokemons
    const html = generateHTML(pokemons)
    insertPokemonsIntoPage(html)
  })
 
const searchInput = document.querySelector('#search-input')
searchInput.addEventListener('input', filterPokemons)

const searchButton = document.querySelector('#search-button')
searchButton.addEventListener('click', () => {
  searchInput.value = ''
  insertPokemonsIntoPage(generateHTML(allPokemons))
})



