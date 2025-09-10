const pokedexContainer = document.getElementById("pokedexContainer");
const searchInput = document.getElementById("searchInput");
const loading = document.getElementById("loading");

const pokemonDetails = document.getElementById("pokemonDetails");
const detailName = document.getElementById("detailName");
const detailImage = document.getElementById("detailImage");
const detailTypes = document.getElementById("detailTypes");
const detailStats = document.getElementById("detailStats");

let allPokemons = [];

async function fetchPokemons() {
  loading.style.display = "block";
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();
  const promises = data.results.map(async (pokemon) => {
    const res = await fetch(pokemon.url);
    return await res.json();
  });
  allPokemons = await Promise.all(promises);
  renderPokemons(allPokemons);
  loading.style.display = "none";
}

function renderPokemons(pokemons) {
  pokedexContainer.innerHTML = "";
  pokemons.forEach((pokemon) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
      <h3>${capitalize(pokemon.name)}</h3>
    `;
    card.addEventListener("click", () => showDetails(pokemon));
    pokedexContainer.appendChild(card);
  });
}

function showDetails(pokemon) {
  detailName.textContent = capitalize(pokemon.name);
  detailImage.src = pokemon.sprites.other["official-artwork"].front_default;

  detailTypes.innerHTML = "";
  pokemon.types.forEach((t) => {
    const span = document.createElement("span");
    span.textContent = capitalize(t.type.name);
    span.classList.add("type-badge", t.type.name);
    detailTypes.appendChild(span);
  });

  detailStats.innerHTML = "";
  pokemon.stats.forEach((s) => {
    const p = document.createElement("p");
    p.textContent = `${capitalize(s.stat.name)}: ${s.base_stat}`;
    detailStats.appendChild(p);
  });

  pokemonDetails.classList.remove("hidden");
}

searchInput.addEventListener("input", () => {
  const filtered = allPokemons.filter((p) => p.name.toLowerCase().includes(searchInput.value.toLowerCase()));
  renderPokemons(filtered);
  pokemonDetails.classList.add("hidden"); 
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

fetchPokemons();
