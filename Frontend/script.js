const fetchAllPokemons = async (searchTerm = "") => {
  try {
    pokedexContainer.innerHTML = "<h2>Carregando...</h2>";
    const url = searchTerm ? `/api/pokemon?q=${searchTerm}` : "/api/pokemon";
    const response = await fetch(url);
    allPokemons = await response.json();
    displayPokemons(allPokemons);
  } catch (error) {
    console.error(error);
  }
};

const handleSearch = (event) => {
  const searchTerm = event.target.value;
  fetchAllPokemons(searchTerm);
};

searchInput.addEventListener("input", handleSearch);
