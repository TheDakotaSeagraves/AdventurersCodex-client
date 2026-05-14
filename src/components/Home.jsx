import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCharacters } from "./services/characterServices"
import { CharacterCard } from "./CharacterCard"

export const Home = () => {
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getCharacters().then(data => {
      setCharacters(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Characters</h1>
        <button
          onClick={() => navigate("/characters/new")}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md"
        >
          + New Character
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : characters.length === 0 ? (
        <p className="text-gray-600">
          You don't have any characters yet — click + New Character to get started.
        </p>
      ) : (
        <div>
          {characters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </section>
  )
}