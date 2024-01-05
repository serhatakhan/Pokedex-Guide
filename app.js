const pokeContainer = document.querySelector(".poke-container")
const search = document.querySelector(".search")
const searchBtn = document.querySelector(".searchBtn")
const searchInput = document.querySelector(".searchInput")
// console.log(searchInput)

// 151 tane pokemon var. bu değşkeni o yüzden atadık.
const pokemonCount = 151

const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

// arama kutusu aç / kapat
searchBtn.addEventListener("click", ()=>{
    search.classList.toggle("active")
})

// inputta arama işlemi
searchInput.addEventListener("input", (e)=>{
    const searchValue = searchInput.value.toLowerCase()
    const pokemonName = document.querySelectorAll(".poke-name")

    // yazdığımız pokemon ile var olan pokemno ismi eşleşiyorsa, o pokemon kartları görünsün. eşleşmeyenler görünmesin none olsun.
    pokemonName.forEach((pokemonName)=>{
        if(pokemonName.innerHTML.toLowerCase().includes(searchValue)){
            pokemonName.parentElement.parentElement.style.display="block"
        } else{
            pokemonName.parentElement.parentElement.style.display="none"
        }
    })

})

// pokemonları teker teker renderlayacak bir fonk oluşturduk. döngü yaptık.
const fetchPokemons = async ()=>{
    for (let i = 1; i < pokemonCount; i++) {
        await getPokemon(i)      
    }
}
const getPokemon = async (id)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data)
    createPokemonCard(data)
}

const createPokemonCard = (pokemon)=>{
    // classı pokemon olan divi oluşturduk.
    const pokemonDiv = document.createElement("div")
    pokemonDiv.classList.add("pokemon")

    const pokemonID = pokemon.id.toString().padStart(3, "0")
    /*padStart() ile bir basamak değeri belirlenir ve o değerin boş basamaklarının ne ile tamamlanması
    gerektiğini söylüyoruz.Örnekte 3 basamaklı olsun dedik ve boş basamakları 0 olsun dedik*/

    const pokemonType = pokemon.types[0].type.name

    // pokemon card'ların arka plan renkleri
    const pokemonBg = bg_color[pokemonType]
    pokemonDiv.style.backgroundColor = `${pokemonBg}`

    const pokemonDivInnerHTML = `
    <div class="image-container">
    <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
      alt="First Pokemon"
    />
  </div>
  <div class="poke-info">
      <span class="poke-id">#${pokemonID}</span>
      <h3 class="poke-name">${pokemon.name}</h3>
      <div class="small">
          <small class="poke-exp">
              <i class="fa-solid fa-flask"> <span>${pokemon.base_experience} exp</span></i>
          </small>
          <small class="poke-weight">
              <i class="fa-solid fa-weight-scale"> <span>${pokemon.weight} kg</span></i>
          </small>
      </div>
      <div class="poke-type">
          <i class="fa-brands fa-uncharted"> <span>${pokemonType}</span></i>
      </div>
  </div>
    `
    pokemonDiv.innerHTML = pokemonDivInnerHTML
    pokeContainer.appendChild(pokemonDiv)
    // pokeContainer'a appenchild ile pokemonDiv'i ekledik
}

fetchPokemons()