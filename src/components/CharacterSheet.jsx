import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getCharacter } from "./services/characterServices"

export const CharacterSheet = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)

  useEffect(() => {
    getCharacter(id).then(data => setCharacter(data))
  }, [id])

  if (character === null) {
    return (
      <section>
        <p className="text-gray-600">Loading character...</p>
      </section>
    )
  }

  return (
    <section>
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Character List
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-2">{character.name}</h1>
    </section>
  )
}