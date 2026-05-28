// Character list page — shows all of the user's characters in a grid with view, edit, and delete actions
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getMyCharacters, deleteCharacter } from "../services/characterService"

export const CharacterList = () => {
    const [characters, setCharacters] = useState([])

    // Fetches the user's characters from the API on mount
    useEffect(() => {
        getMyCharacters().then(setCharacters)
    }, [])

    // Confirms with the user before deleting, then refreshes the list
    const handleDelete = (id) => {
        if (!window.confirm("Strike this character from the codex?")) return
        deleteCharacter(id).then(() => {
            getMyCharacters().then(setCharacters)
        })
    }

    return (
        <main className="page-shell max-w-5xl mx-auto px-4 pt-24 pb-16">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl">The Party Roster</h1>
                <Link to="/characters/create" className="btn-primary">+ New Character</Link>
            </div>
            <div className="divider-ornate">✦</div>

            {characters.length === 0 ? (
                <div className="scroll-card p-10 text-center">
                    <p className="italic text-ink-700 mb-4">
                        No adventurers have answered the call. Yet.
                    </p>
                    <Link to="/characters/create" className="btn-primary">
                        Forge Your First Hero
                    </Link>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {characters.map(char => {
                        // Total level is the sum across all class entries
                        const totalLevel = char.class_levels?.reduce((sum, cl) => sum + cl.level, 0) ?? 0
                        // Class summary e.g. "Fighter 5 / Rogue 2"
                        const classSummary = char.class_levels?.map(cl => `${cl.dnd_class.name} ${cl.level}`).join(" / ") ?? ""

                        return (
                            <article key={char.id} className="scroll-card p-6 flex flex-col">
                                <h2 className="text-2xl mb-1">{char.name}</h2>
                                <p className="text-sm text-ink-700 italic mb-4">
                                    {char.race?.name} · {classSummary}
                                </p>

                                <div className="divider-ornate" style={{ margin: "0.5rem 0" }}>✦</div>

                                {/* Quick-glance stats */}
                                <div className="grid grid-cols-3 gap-2 text-center text-xs mb-5">
                                    <div>
                                        <div className="font-display uppercase tracking-wider">HP</div>
                                        <div className="text-lg font-semibold">
                                            {char.hp_current ?? "—"}/{char.hp_max ?? "—"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-display uppercase tracking-wider">AC</div>
                                        <div className="text-lg font-semibold">{char.armor_class ?? "—"}</div>
                                    </div>
                                    <div>
                                        <div className="font-display uppercase tracking-wider">Lvl</div>
                                        <div className="text-lg font-semibold">{totalLevel || "—"}</div>
                                    </div>
                                </div>

                                <div className="mt-auto flex gap-2 justify-between">
                                    <Link to={`/characters/${char.id}`} className="btn-ghost flex-1 text-center">
                                        View
                                    </Link>
                                    <Link to={`/characters/${char.id}/edit`} className="btn-ghost flex-1 text-center">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(char.id)} className="btn-ghost" style={{ borderColor: "var(--color-burgundy-700)", color: "var(--color-burgundy-700)" }}>
                                        ✕
                                    </button>
                                </div>
                            </article>
                        )
                    })}
                </div>
            )}
        </main>
    )
}
