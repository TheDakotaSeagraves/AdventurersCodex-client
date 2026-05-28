import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createCharacter } from "../services/characterService"
import { getRaces } from "../services/raceService"
import { getClasses } from "../services/classService"
import { PHB_BACKGROUNDS, ALIGNMENTS } from "../../constants/characterForm"

// Hardcoded 5e subclass options per class (PHB + Xanathar's + Tasha's). Subclass is a free-text
// field on the API, so this lookup lives client-side and is never validated server-side.
const SUBCLASSES_BY_CLASS = {
    Barbarian: ["Path of the Berserker", "Path of the Totem Warrior", "Path of the Ancestral Guardian", "Path of the Storm Herald", "Path of the Zealot", "Path of the Beast", "Path of Wild Magic"],
    Bard: ["College of Lore", "College of Valor", "College of Glamour", "College of Swords", "College of Whispers", "College of Eloquence", "College of Spirits"],
    Cleric: ["Knowledge Domain", "Life Domain", "Light Domain", "Nature Domain", "Tempest Domain", "Trickery Domain", "War Domain", "Forge Domain", "Grave Domain", "Order Domain", "Peace Domain", "Twilight Domain"],
    Druid: ["Circle of the Land", "Circle of the Moon", "Circle of Dreams", "Circle of the Shepherd", "Circle of Spores", "Circle of Stars", "Circle of Wildfire"],
    Fighter: ["Champion", "Battle Master", "Eldritch Knight", "Arcane Archer", "Cavalier", "Samurai", "Echo Knight", "Psi Warrior", "Rune Knight"],
    Monk: ["Way of the Open Hand", "Way of Shadow", "Way of the Four Elements", "Way of the Drunken Master", "Way of the Kensei", "Way of the Sun Soul", "Way of Mercy", "Way of the Astral Self"],
    Paladin: ["Oath of Devotion", "Oath of the Ancients", "Oath of Vengeance", "Oath of Conquest", "Oath of Redemption", "Oath of Glory", "Oath of the Watchers", "Oathbreaker"],
    Ranger: ["Hunter", "Beast Master", "Gloom Stalker", "Horizon Walker", "Monster Slayer", "Fey Wanderer", "Swarmkeeper", "Drakewarden"],
    Rogue: ["Thief", "Assassin", "Arcane Trickster", "Inquisitive", "Mastermind", "Scout", "Swashbuckler", "Phantom", "Soulknife"],
    Sorcerer: ["Draconic Bloodline", "Wild Magic", "Divine Soul", "Shadow Magic", "Storm Sorcery", "Aberrant Mind", "Clockwork Soul"],
    Warlock: ["The Archfey", "The Fiend", "The Great Old One", "The Hexblade", "The Celestial", "The Fathomless", "The Genie", "The Undead", "The Undying"],
    Wizard: ["School of Abjuration", "School of Conjuration", "School of Divination", "School of Enchantment", "School of Evocation", "School of Illusion", "School of Necromancy", "School of Transmutation", "Bladesinging", "War Magic", "Chronurgy Magic", "Graviturgy Magic", "Order of Scribes"],
}

export const CreateCharacter = () => {
    const [form, setForm] = useState({
        name: "",
        race_id: "",
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
        armor_class: 10,
        hp_max: 10,
        hp_current: 10,
        background: "",
        alignment: "",
        backstory: "",
        class_levels: [{ dnd_class_id: "", level: 1, subclass: "" }],
    })
    const [races, setRaces] = useState([])
    const [classes, setClasses] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getRaces().then(setRaces)
        getClasses().then(setClasses)
    }, [])

    const change = (field) => (e) => setForm({ ...form, [field]: e.target.value })

    const changeClassRow = (index, field) => (e) => {
        const next = [...form.class_levels]
        next[index] = { ...next[index], [field]: e.target.value }
        // If the class changes, clear the subclass since it no longer applies
        if (field === "dnd_class_id") {
            next[index].subclass = ""
        }
        setForm({ ...form, class_levels: next })
    }

    const addClassRow = () => {
        setForm({
            ...form,
            class_levels: [...form.class_levels, { dnd_class_id: "", level: 1, subclass: "" }],
        })
    }

    const removeClassRow = (index) => {
        setForm({
            ...form,
            class_levels: form.class_levels.filter((_, i) => i !== index),
        })
    }

    // Looks up the class name for a given id from the loaded classes list
    const classNameFor = (classId) => classes.find(c => String(c.id) === String(classId))?.name ?? ""

    // Returns the subclass dropdown state for one class row
    const subclassState = (cl) => {
        if (!cl.dnd_class_id) return { disabled: true, placeholder: "Choose a class first", options: [] }
        if (Number(cl.level) < 3) return { disabled: true, placeholder: "Unlocks at level 3", options: [] }
        const className = classNameFor(cl.dnd_class_id)
        return { disabled: false, placeholder: "Choose a subclass…", options: SUBCLASSES_BY_CLASS[className] ?? [] }
    }

    const totalLevel = form.class_levels.reduce((sum, cl) => sum + Number(cl.level || 0), 0)

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")

        if (form.class_levels.length === 0) {
            setError("At least one class is required.")
            return
        }
        if (form.class_levels.some(cl => !cl.dnd_class_id)) {
            setError("Every class row must have a class selected.")
            return
        }
        if (totalLevel > 20) {
            setError(`Total level must not exceed 20 (currently ${totalLevel}).`)
            return
        }
        const classIds = form.class_levels.map(cl => cl.dnd_class_id)
        if (new Set(classIds).size !== classIds.length) {
            setError("Each class may only appear once.")
            return
        }

        const payload = {
            ...form,
            strength: Number(form.strength),
            dexterity: Number(form.dexterity),
            constitution: Number(form.constitution),
            intelligence: Number(form.intelligence),
            wisdom: Number(form.wisdom),
            charisma: Number(form.charisma),
            armor_class: Number(form.armor_class),
            hp_max: Number(form.hp_max),
            hp_current: Number(form.hp_current),
            class_levels: form.class_levels.map(cl => ({
                dnd_class_id: Number(cl.dnd_class_id),
                level: Number(cl.level),
                subclass: cl.subclass,
            })),
        }

        createCharacter(payload).then(() => navigate("/"))
    }

    return (
        <main className="page-shell max-w-3xl mx-auto px-4 pt-24 pb-16">
            <section className="scroll-card p-8">
                <h1 className="text-3xl text-center mb-2">Forge a New Hero</h1>
                <p className="text-center text-ink-700 italic mb-2">A new chapter begins</p>
                <div className="divider-ornate">✦</div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <fieldset className="flex flex-col gap-1">
                        <label className="font-display text-sm tracking-wider uppercase">Character Name</label>
                        <input className="form-surface" value={form.name} onChange={change("name")} required autoFocus />
                    </fieldset>

                    <fieldset className="flex flex-col gap-1">
                        <label className="font-display text-sm tracking-wider uppercase">Race</label>
                        <select className="form-surface" value={form.race_id} onChange={change("race_id")} required>
                            <option value="">Choose a race…</option>
                            {races.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                    </fieldset>

                    <div>
                        <div className="flex items-baseline justify-between mb-2">
                            <h2 className="font-display text-lg uppercase tracking-wider">Classes</h2>
                            <span className={`text-sm font-semibold ${totalLevel > 20 ? "text-burgundy-700" : "text-ink-700"}`}>
                                Total Level: {totalLevel} / 20
                            </span>
                        </div>
                        <div className="divider-ornate" style={{ margin: "0.25rem 0 0.75rem" }}>✦</div>

                        <div className="flex flex-col gap-3">
                            {form.class_levels.map((cl, i) => {
                                const sub = subclassState(cl)
                                return (
                                    <div key={i} className="grid grid-cols-12 gap-2 items-end">
                                        <div className="col-span-4 flex flex-col gap-1">
                                            <label className="font-display text-xs tracking-wider uppercase">Class</label>
                                            <select className="form-surface" value={cl.dnd_class_id} onChange={changeClassRow(i, "dnd_class_id")} required>
                                                <option value="">Choose…</option>
                                                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="col-span-2 flex flex-col gap-1">
                                            <label className="font-display text-xs tracking-wider uppercase">Lvl</label>
                                            <input type="number" min="1" max="20" className="form-surface" value={cl.level} onChange={changeClassRow(i, "level")} required />
                                        </div>
                                        <div className="col-span-5 flex flex-col gap-1">
                                            <label className="font-display text-xs tracking-wider uppercase">Subclass</label>
                                            <select
                                                className="form-surface"
                                                value={cl.subclass}
                                                onChange={changeClassRow(i, "subclass")}
                                                disabled={sub.disabled}
                                                style={sub.disabled ? { opacity: 0.55, cursor: "not-allowed" } : {}}
                                            >
                                                <option value="">{sub.placeholder}</option>
                                                {sub.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                        </div>
                                        <div className="col-span-1 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => removeClassRow(i)}
                                                className="btn-ghost"
                                                style={{ borderColor: "var(--color-burgundy-700)", color: "var(--color-burgundy-700)", padding: "0.5rem 0.75rem" }}
                                                title="Remove class"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}

                            <button type="button" onClick={addClassRow} className="btn-ghost self-start">
                                + Add Class
                            </button>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-display text-lg uppercase tracking-wider mb-1">Combat</h2>
                        <div className="divider-ornate" style={{ margin: "0.25rem 0 0.75rem" }}>✦</div>
                        <div className="grid grid-cols-3 gap-3">
                            <fieldset className="flex flex-col gap-1">
                                <label className="font-display text-xs tracking-wider uppercase">Armor Class</label>
                                <input type="number" className="form-surface" value={form.armor_class} onChange={change("armor_class")} required />
                            </fieldset>
                            <fieldset className="flex flex-col gap-1">
                                <label className="font-display text-xs tracking-wider uppercase">HP Max</label>
                                <input type="number" className="form-surface" value={form.hp_max} onChange={change("hp_max")} required />
                            </fieldset>
                            <fieldset className="flex flex-col gap-1">
                                <label className="font-display text-xs tracking-wider uppercase">HP Current</label>
                                <input type="number" className="form-surface" value={form.hp_current} onChange={change("hp_current")} required />
                            </fieldset>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-display text-lg uppercase tracking-wider mb-1">Ability Scores</h2>
                        <div className="divider-ornate" style={{ margin: "0.25rem 0 0.75rem" }}>✦</div>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                            {["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"].map(stat => (
                                <fieldset key={stat} className="flex flex-col gap-1">
                                    <label className="font-display text-xs tracking-wider uppercase text-center">{stat.slice(0, 3)}</label>
                                    <input
                                        type="number"
                                        min="3"
                                        max="20"
                                        className="form-surface text-center"
                                        value={form[stat]}
                                        onChange={change(stat)}
                                        required
                                    />
                                </fieldset>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-display text-lg uppercase tracking-wider mb-1">Background & Story</h2>
                        <div className="divider-ornate" style={{ margin: "0.25rem 0 0.75rem" }}>✦</div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <fieldset className="flex flex-col gap-1">
                                <label className="font-display text-xs tracking-wider uppercase">Background</label>
                                <select className="form-surface" value={form.background} onChange={change("background")}>
                                    <option value="">Choose a background…</option>
                                    {PHB_BACKGROUNDS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                </select>
                            </fieldset>
                            <fieldset className="flex flex-col gap-1">
                                <label className="font-display text-xs tracking-wider uppercase">Alignment</label>
                                <select className="form-surface" value={form.alignment} onChange={change("alignment")}>
                                    <option value="">Choose an alignment…</option>
                                    {ALIGNMENTS.map(al => <option key={al} value={al}>{al}</option>)}
                                </select>
                            </fieldset>
                        </div>
                        <fieldset className="flex flex-col gap-1">
                            <label className="font-display text-xs tracking-wider uppercase">Backstory</label>
                            <textarea className="form-surface" rows="5" value={form.backstory} onChange={change("backstory")} placeholder="Whence came this hero?" />
                        </fieldset>
                    </div>

                    {error && (
                        <p className="text-burgundy-700 text-sm font-semibold text-center">{error}</p>
                    )}

                    <div className="flex justify-end gap-3 mt-2">
                        <button type="button" onClick={() => navigate("/")} className="btn-ghost">Cancel</button>
                        <button type="submit" className="btn-primary">Inscribe Character</button>
                    </div>
                </form>
            </section>
        </main>
    )
}
