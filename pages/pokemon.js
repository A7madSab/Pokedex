import Link from "next/link"
import Layout from "../components/Layout"

const Pokemon = ({ pokemon }) => {
    return (
        <Layout title={pokemon.name}>
            <h1 className="text-4xl mb-8 text-center capitalize">{pokemon.name}</h1>
            <img className="mx-auto" src={pokemon.image} alt={pokemon.name} />
            <p>
                <span className="font-bold mr-2"> Weight: </span>
                {pokemon.weight}
            </p>
            <p>
                <span className="font-bold mr-2"> Height: </span>
                {pokemon.height}
            </p>

            <h3>{pokemon.species.name}</h3>
            <h2 className="text-2xl mt-6 mb-2">Types</h2>
            {pokemon.types.map((type, index) => (
                <p key={index}>{type.type.name}</p>
            ))}
            <p className="mt-10 text-center">
                <Link href="/"><a>Home</a></Link>
            </p>
        </Layout>
    )
}

export async function getServerSideProps({ query }) {
    let pokemon
    const id = query.id

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        pokemon = await res.json()
        pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${("00" + id).slice(-3)}.png`
    } catch (err) {
        console.log("err", err)
    }

    return {
        props: { pokemon }
    }
}

export default Pokemon
