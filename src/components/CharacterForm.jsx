import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getRaces } from "./services/raceServices"
import { getDndClasses } from "./services/dndClassServices"
import { PHB_BACKGROUNDS, ALIGNMENTS } from "../constants/characterForm"

export const CharacterForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    race_id: "",
    dnd_class_id: "",
    level: 1,
    background: "",
    alignment: "",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    hp_max: 1,
    hp_current: 1,
    armor_class: 10
  })

  const [races, setRaces] = useState(null)
  const [dndClasses, setDndClasses] = useState(null)

  useEffect(() => {
    getRaces().then(data => setRaces(data))
    getDndClasses().then(data => setDndClasses(data))
  }, [])

  const handleChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value })
  }

  return (
    <section>
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Character List
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">New Character</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Basic Info</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">Character Name</label>
          <input
            id="name"
            type="text"
            value={formValues.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="race">Race</label>
          <select
            id="race"
            value={formValues.race_id}
            onChange={(e) => handleChange("race_id", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            {races === null ? (
              <option value="">Loading races...</option>
            ) : (
              <>
                <option value="">Select a race</option>
                {races.map(race => (
                  <option key={race.id} value={race.id}>{race.name}</option>
                ))}
              </>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="dnd_class">Class</label>
          <select
            id="dnd_class"
            value={formValues.dnd_class_id}
            onChange={(e) => handleChange("dnd_class_id", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            {dndClasses === null ? (
              <option value="">Loading classes...</option>
            ) : (
              <>
                <option value="">Select a class</option>
                {dndClasses.map(dndClass => (
                  <option key={dndClass.id} value={dndClass.id}>{dndClass.name}</option>
                ))}
              </>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="level">Level</label>
          <input
            id="level"
            type="number"
            min="1"
            max="20"
            value={formValues.level}
            onChange={(e) => handleChange("level", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="background">Background</label>
          <input
            id="background"
            type="text"
            list="background-options"
            value={formValues.background}
            onChange={(e) => handleChange("background", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <datalist id="background-options">
            {PHB_BACKGROUNDS.map(bg => (
              <option key={bg} value={bg} />
            ))}
          </datalist>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="alignment">Alignment</label>
          <input
            id="alignment"
            type="text"
            list="alignment-options"
            value={formValues.alignment}
            onChange={(e) => handleChange("alignment", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <datalist id="alignment-options">
            {ALIGNMENTS.map(al => (
              <option key={al} value={al} />
            ))}
          </datalist>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Ability Scores</h2>

        <div className="grid grid-cols-6 gap-2">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="strength">STR</label>
            <input
              id="strength"
              type="number"
              min="3"
              max="20"
              value={formValues.strength}
              onChange={(e) => handleChange("strength", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="dexterity">DEX</label>
            <input
              id="dexterity"
              type="number"
              min="3"
              max="20"
              value={formValues.dexterity}
              onChange={(e) => handleChange("dexterity", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="constitution">CON</label>
            <input
              id="constitution"
              type="number"
              min="3"
              max="20"
              value={formValues.constitution}
              onChange={(e) => handleChange("constitution", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="intelligence">INT</label>
            <input
              id="intelligence"
              type="number"
              min="3"
              max="20"
              value={formValues.intelligence}
              onChange={(e) => handleChange("intelligence", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="wisdom">WIS</label>
            <input
              id="wisdom"
              type="number"
              min="3"
              max="20"
              value={formValues.wisdom}
              onChange={(e) => handleChange("wisdom", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="charisma">CHA</label>
            <input
              id="charisma"
              type="number"
              min="3"
              max="20"
              value={formValues.charisma}
              onChange={(e) => handleChange("charisma", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Vitals</h2>
        {/* Fields added in commit 4 */}
      </section>
    </section>
  )
}