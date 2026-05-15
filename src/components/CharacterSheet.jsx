import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getCharacter, deleteCharacter } from "./services/characterServices"
import { getAbilityModifier } from "../utils/dnd"

export const CharacterSheet = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [character, setCharacter] = useState(null)
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  useEffect(() => {
    getCharacter(id).then(data => setCharacter(data))
  }, [id])

  const handleDelete = () => {
    deleteCharacter(id).then(ok => {
      if (ok) {
        navigate("/")
      }
    })
  }

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

      <div className="flex items-start justify-between mt-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">{character.name}</h1>
          <p className="text-gray-600">
            {character.race.name} · {character.dnd_class.name} · Level {character.level}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {confirmingDelete ? (
            <>
              <span className="text-sm text-gray-700">Are you sure?</span>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmingDelete(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate(`/characters/${id}/edit`)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md"
              >
                Edit Character
              </button>
              <button
                onClick={() => setConfirmingDelete(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Vitals</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-300 rounded-md px-4 py-3 text-center">
            <p className="text-sm text-gray-600">HP</p>
            <p className="text-lg font-medium">{character.hp_current} / {character.hp_max}</p>
          </div>
          <div className="border border-gray-300 rounded-md px-4 py-3 text-center">
            <p className="text-sm text-gray-600">AC</p>
            <p className="text-lg font-medium">{character.armor_class}</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Classes</h2>
        <div className="border border-gray-300 rounded-md px-4 py-3">
          {character.dnd_class.name} — Level {character.level}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Ability Scores</h2>
        <div className="grid grid-cols-6 gap-2">
          <div className="border border-gray-300 rounded-md px-3 py-3 text-center">
            <p className="text-sm text-gray-600">STR</p>
            <p className="text-lg font-medium">{character.strength} ({getAbilityModifier(character.strength)})</p>
          </div>
          <div className="border border-gray-300 rounded-md px-3 py-3 text-center">
            <p className="text-sm text-gray-600">DEX</p>
            <p className="text-lg font-medium">{character.dexterity} ({getAbilityModifier(character.dexterity)})</p>
          </div>
          <div className="border border-gray-300 rounded-md px-3 py-3 text-center">
            <p className="text-sm text-gray-600">CON</p>
            <p className="text-lg font-medium">{character.constitution} ({getAbilityModifier(character.constitution)})</p>
          </div>
          <div className="border border-gray-300 rounded-md px-3 py-3 text-center">
            <p className="text-sm text-gray-600">INT</p>
            <p className="text-lg font-medium">{character.intelligence} ({getAbilityModifier(character.intelligence)})</p>
          </div>
          <div className="border border-gray-300 rounded-md px-3 py-3 text-center">
            <p className="text-sm text-gray-600">WIS</p>
            <p className="text-lg font-medium">{character.wisdom} ({getAbilityModifier(character.wisdom)})</p>
          </div>
          <div className="border border-gray-300 rounded-md px-3 py-3 text-center">
            <p className="text-sm text-gray-600">CHA</p>
            <p className="text-lg font-medium">{character.charisma} ({getAbilityModifier(character.charisma)})</p>
          </div>
        </div>
      </section>

      {character.backstory && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Backstory</h2>
          <div className="border border-gray-300 rounded-md px-4 py-3 whitespace-pre-wrap">
            {character.backstory}
          </div>
        </section>
      )}
    </section>
  )
}