import Link from "next/link"
import Layout from "../components/Layout"

const Home = ({ pokemons }) => {
  return (
    <Layout title="Next Pokedex">
      <h1 className="text-4xl mb-8 text-center">NextJS Pokedex</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index} >
            <Link href={`/pokemon/?id=${index + 1}`}>
              <a className="border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                <img className="w-20 h-20 mr-3" src={pokemon.image} alt="pokemon" />
                <span className="mr-2 font-bold">{index + 1} {pokemon.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout >
  )
}

export async function getStaticProps(ctx) {
  let pokemons = []

  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    const { results } = await res.json()
    pokemons = results.map((pokemon, index) => ({ ...pokemon, image: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${("00" + (index + 1)).slice(-3)}.png` }))
  } catch (err) {
    console.log(err)
  }
  return {
    props: { pokemons }
  }
}

export default Home