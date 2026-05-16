import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getRaces } from "./services/raceServices"
import { getDndClasses } from "./services/dndClassServices"
import { getCharacter, updateCharacter } from "./services/characterServices"
import { PHB_BACKGROUNDS, ALIGNMENTS } from "../constants/characterForm"
import { DND_SUBCLASSES } from "../constants/dndSubclasses"

export const CharacterEditForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState(null)
  const [races, setRaces] = useState(null)
  const [dndClasses, setDndClasses] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    getRaces().then(data => setRaces(data))
    getDndClasses().then(data => setDndClasses(data))
    getCharacter(id).then(data => {
      setFormValues({
        name: data.name,
        race_id: data.race.id,
        class_levels: data.class_levels.map(entry => ({
          dnd_class_id: entry.dnd_class.id,
          level: entry.level,
          subclass: entry.subclass
        })),
        background: data.background,
        alignment: data.alignment,
        strength: data.strength,
        dexterity: data.dexterity,
        constitution: data.constitution,
        intelligence: data.intelligence,
        wisdom: data.wisdom,
        charisma: data.charisma,
        hp_max: data.hp_max,
        hp_current: data.hp_current,
        armor_class: data.armor_class,
        backstory: data.backstory
      })
    })
  }, [id])

  const handleChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value })
  }

  const handleClassLevelChange = (index, field, value) => {
    const updated = formValues.class_levels.map((entry, i) => {
      if (i !== index) return entry
      const updatedEntry = { ...entry, [field]: value }
      if (field === "dnd_class_id") {
        updatedEntry.subclass = ""
      }
      return updatedEntry
    })
    setFormValues({ ...formValues, class_levels: updated })
  }

  const handleAddClass = () => {
    setFormValues({
      ...formValues,
      class_levels: [
        ...formValues.class_levels,
        { dnd_class_id: "", level: 1, subclass: "" }
      ]
    })
  }

  const handleRemoveClass = (index) => {
    setFormValues({
      ...formValues,
      class_levels: formValues.class_levels.filter((_, i) => i !== index)
    })
  }

  const getSubclassOptions = (dndClassId) => {
    if (!dndClassId || !dndClasses) return []
    const selectedClass = dndClasses.find(c => c.id === parseInt(dndClassId))
    if (!selectedClass) return []
    return DND_SUBCLASSES[selectedClass.name] || []
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateCharacter(id, formValues).then(response => {
      if (response.id) {
        navigate(`/characters/${id}`)
      } else {
        setErrors(response)
      }
    })
  }

  if (formValues === null) {
    return (
      <section>
        <p className="text-gray-600">Loading...</p>
      </section>
    )
  }

  return (
    <section>
      <Link to={`/characters/${id}`} className="text-blue-600 hover:underline">
        ← Back to Character Sheet
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">Edit Character</h1>

      <form onSubmit={handleSubmit}>
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
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name[0]}</p>}
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
            {errors.race_id && <p className="text-red-600 text-sm mt-1">{errors.race_id[0]}</p>}
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
            {errors.background && <p className="text-red-600 text-sm mt-1">{errors.background[0]}</p>}
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
            {errors.alignment && <p className="text-red-600 text-sm mt-1">{errors.alignment[0]}</p>}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Classes</h2>

          {formValues.class_levels.map((entry, index) => {
            const subclassOptions = getSubclassOptions(entry.dnd_class_id)

            return (
              <div key={index} className="border border-gray-200 rounded-md p-4 mb-3 relative">
                {formValues.class_levels.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveClass(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-600 text-lg font-bold"
                    aria-label="Remove class"
                  >
                    ×
                  </button>
                )}

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1" htmlFor={`class-${index}`}>Class</label>
                  <select
                    id={`class-${index}`}
                    value={entry.dnd_class_id}
                    onChange={(e) => handleClassLevelChange(index, "dnd_class_id", e.target.value)}
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

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1" htmlFor={`level-${index}`}>Level</label>
                  <input
                    id={`level-${index}`}
                    type="number"
                    min="1"
                    max="20"
                    value={entry.level}
                    onChange={(e) => handleClassLevelChange(index, "level", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1" htmlFor={`subclass-${index}`}>Subclass</label>
                  <select
                    id={`subclass-${index}`}
                    value={entry.subclass}
                    onChange={(e) => handleClassLevelChange(index, "subclass", e.target.value)}
                    disabled={!entry.dnd_class_id}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="">
                      {!entry.dnd_class_id ? "Select a class first" : "None"}
                    </option>
                    {subclassOptions.map(subclass => (
                      <option key={subclass} value={subclass}>{subclass}</option>
                    ))}
                  </select>
                </div>
              </div>
            )
          })}

          <button
            type="button"
            onClick={handleAddClass}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md"
          >
            + Add Class
          </button>

          {errors.class_levels && (
            <p className="text-red-600 text-sm mt-2">
              {Array.isArray(errors.class_levels) && typeof errors.class_levels[0] === "string"
                ? errors.class_levels[0]
                : "Please correct the errors in the class entries."}
            </p>
          )}
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
              {errors.strength && <p className="text-red-600 text-xs mt-1">{errors.strength[0]}</p>}
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
              {errors.dexterity && <p className="text-red-600 text-xs mt-1">{errors.dexterity[0]}</p>}
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
              {errors.constitution && <p className="text-red-600 text-xs mt-1">{errors.constitution[0]}</p>}
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
              {errors.intelligence && <p className="text-red-600 text-xs mt-1">{errors.intelligence[0]}</p>}
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
              {errors.wisdom && <p className="text-red-600 text-xs mt-1">{errors.wisdom[0]}</p>}
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
              {errors.charisma && <p className="text-red-600 text-xs mt-1">{errors.charisma[0]}</p>}
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Vitals</h2>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="hp_max">HP Max</label>
              <input
                id="hp_max"
                type="number"
                min="1"
                value={formValues.hp_max}
                onChange={(e) => handleChange("hp_max", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {errors.hp_max && <p className="text-red-600 text-sm mt-1">{errors.hp_max[0]}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="hp_current">HP Current</label>
              <input
                id="hp_current"
                type="number"
                min="0"
                value={formValues.hp_current}
                onChange={(e) => handleChange("hp_current", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {errors.hp_current && <p className="text-red-600 text-sm mt-1">{errors.hp_current[0]}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="armor_class">Armor Class</label>
              <input
                id="armor_class"
                type="number"
                min="0"
                value={formValues.armor_class}
                onChange={(e) => handleChange("armor_class", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {errors.armor_class && <p className="text-red-600 text-sm mt-1">{errors.armor_class[0]}</p>}
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Backstory</h2>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="backstory">Backstory (optional)</label>
            <textarea
              id="backstory"
              rows="6"
              value={formValues.backstory}
              onChange={(e) => handleChange("backstory", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.backstory && <p className="text-red-600 text-sm mt-1">{errors.backstory[0]}</p>}
          </div>
        </section>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate(`/characters/${id}`)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}