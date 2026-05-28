// Profile page — shows the user's info and a preview of their first four characters
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getProfile } from "../services/profileService"
import { getMyCharacters } from "../services/characterService"

export const Profile = () => {
    const [profile, setProfile] = useState(null)
    const [characters, setCharacters] = useState([])

    // Fetches profile and characters in parallel on mount
    useEffect(() => {
        getProfile().then(setProfile)
        getMyCharacters().then(setCharacters)
    }, [])

    if (!profile) {
        return (
            <main className="page-shell flex justify-center items-center">
                <p className="font-display text-xl text-ink-700">Unrolling the scroll…</p>
            </main>
        )
    }

    // Build display values from the profile data
    const initials = `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase()
    const memberSince = new Date(profile.dateJoined).toLocaleDateString("en-US", {
        year: "numeric", month: "long"
    })

    return (
        <main className="page-shell max-w-5xl mx-auto px-4 pt-24 pb-16">

            {/* Profile header card */}
            <section className="scroll-card p-8 mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div
                        className="flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center font-display text-3xl"
                        style={{
                            backgroundColor: "var(--color-burgundy-700)",
                            color: "var(--color-parchment-50)",
                            border: "3px solid var(--color-gold-600)",
                            boxShadow: "inset 0 0 12px rgba(0,0,0,0.4)",
                        }}
                    >
                        {initials || "?"}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl mb-1">{profile.firstName} {profile.lastName}</h1>
                        <p className="text-ink-700 italic mb-3">@{profile.username}</p>
                        <p className="text-sm text-ink-700">{profile.email}</p>
                        <p className="text-sm text-ink-700">Member since {memberSince}</p>
                    </div>

                    <Link to="/profile/edit" className="btn-ghost self-center md:self-start">
                        Edit Profile
                    </Link>
                </div>
            </section>

            {/* My Characters — shows up to 4 with a link to see all */}
            <section className="mb-10">
                <div className="flex items-baseline justify-between mb-4">
                    <h2 className="text-2xl">My Characters</h2>
                    <Link to="/" className="text-sm font-semibold">View All →</Link>
                </div>
                <div className="divider-ornate">✦</div>

                {characters.length === 0 ? (
                    <p className="italic text-center text-ink-700 py-8">
                        Your party has not yet been assembled.
                    </p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {characters.slice(0, 4).map(char => {
                            // Total level and class summary derived from class_levels array
                            const totalLevel = char.class_levels?.reduce((sum, cl) => sum + cl.level, 0) ?? 0
                            const classSummary = char.class_levels?.map(cl => cl.dnd_class.name).join(" / ") ?? ""
                            return (
                                <Link
                                    to={`/characters/${char.id}`}
                                    key={char.id}
                                    className="scroll-card p-5 hover:translate-y-[-2px] transition-transform"
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <h3 className="text-xl mb-1">{char.name}</h3>
                                    <p className="text-sm text-ink-700">
                                        Level {totalLevel} {char.race?.name} · {classSummary}
                                    </p>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </section>

            {/* Campaigns — stretch placeholder */}
            <section className="mb-10">
                <h2 className="text-2xl mb-4">Campaigns</h2>
                <div className="divider-ornate">✦</div>
                <div className="scroll-card p-6 text-center italic text-ink-700">
                    The annals of your campaigns shall be written here soon.
                </div>
            </section>

            {/* Game Content — stretch placeholder */}
            <section>
                <h2 className="text-2xl mb-4">Game Content</h2>
                <div className="divider-ornate">✦</div>
                <div className="scroll-card p-6 text-center italic text-ink-700">
                    Homebrew races, classes, and lore shall be inscribed here.
                </div>
            </section>
        </main>
    )
}
