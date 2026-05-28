// Character Sheet — full detail view of a single character with edit and delete actions
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getCharacter, deleteCharacter } from "../services/characterService"

// Reusable stat box used throughout the sheet
const Stat = ({ label, value }) => (
    <div className="scroll-card p-3 text-center" style={{ borderRadius: "8px" }}>
        <div className="font-display text-xs uppercase tracking-widest text-ink-700">{label}</div>
        <div className="text-2xl font-semibold">{value ?? "—"}</div>
    </div>
)

export const CharacterSheet = () => {
    const { id } = useParams()
    const [char, setChar] = useState(null)
    const navigate = useNavigate()

    // Fetches the character by ID from the URL param on mount
    useEffect(() => {
        getCharacter(id).then(setChar)
    }, [id])

    // Confirms with the user before deleting, then navigates back to the roster
    const handleDelete = () => {
        if (!window.confirm("Strike this character from the codex?")) return
        deleteCharacter(id).then(() => navigate("/"))
    }

    if (!char) {
        return (
            <main className="page-shell flex justify-center items-center">
                <p className="font-display text-xl text-ink-700">Unrolling the scroll…</p>
            </main>
        )
    }

    // Total level is the sum across all class entries
    const totalLevel = char.class_levels?.reduce((sum, cl) => sum + cl.level, 0) ?? 0
    // Class summary e.g. "Fighter 5 / Rogue 2"
    const classSummary = char.class_levels?.map(cl => `${cl.dnd_class.name} ${cl.level}`).join(" / ") ?? ""

    return (
        <main className="page-shell max-w-5xl mx-auto px-4 pt-24 pb-16">
            <Link to="/" className="inline-block mb-4 text-sm font-semibold">
                ← Back to Roster
            </Link>

            {/* Header — name, race/class summary, edit and delete buttons */}
            <section className="scroll-card p-8 mb-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl mb-1">{char.name}</h1>
                        <p className="italic text-ink-700">
                            Level {totalLevel} {char.race?.name} · {classSummary}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link to={`/characters/${id}/edit`} className="btn-ghost">Edit</Link>
                        <button onClick={handleDelete} className="btn-ghost" style={{ borderColor: "var(--color-burgundy-700)", color: "var(--color-burgundy-700)" }}>
                            Delete
                        </button>
                    </div>
                </div>
            </section>

            {/* Combat stats — hp_current/hp_max and armor_class from the model */}
            <section className="scroll-card p-6 mb-6">
                <h2 className="text-xl mb-3">Combat</h2>
                <div className="divider-ornate">✦</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Stat label="HP (Current)" value={char.hp_current} />
                    <Stat label="HP (Max)" value={char.hp_max} />
                    <Stat label="Armor Class" value={char.armor_class} />
                </div>
            </section>

            {/* Ability scores */}
            <section className="scroll-card p-6 mb-6">
                <h2 className="text-xl mb-3">Ability Scores</h2>
                <div className="divider-ornate">✦</div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    <Stat label="STR" value={char.strength} />
                    <Stat label="DEX" value={char.dexterity} />
                    <Stat label="CON" value={char.constitution} />
                    <Stat label="INT" value={char.intelligence} />
                    <Stat label="WIS" value={char.wisdom} />
                    <Stat label="CHA" value={char.charisma} />
                </div>
            </section>

            {/* Classes — lists each class entry with level and subclass if present */}
            {char.class_levels?.length > 0 && (
                <section className="scroll-card p-6 mb-6">
                    <h2 className="text-xl mb-3">Classes</h2>
                    <div className="divider-ornate">✦</div>
                    <ul className="flex flex-col gap-2">
                        {char.class_levels.map(cl => (
                            <li key={cl.id} className="flex justify-between text-sm">
                                <span>{cl.dnd_class.name}{cl.subclass ? ` — ${cl.subclass}` : ""}</span>
                                <span className="font-semibold">Level {cl.level}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Backstory — only rendered if the character has one */}
            {char.backstory && (
                <section className="scroll-card p-6">
                    <h2 className="text-xl mb-3">Backstory</h2>
                    <div className="divider-ornate">✦</div>
                    <p className="whitespace-pre-line leading-relaxed">{char.backstory}</p>
                </section>
            )}
        </main>
    )
}
