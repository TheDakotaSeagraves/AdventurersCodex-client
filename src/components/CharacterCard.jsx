import { useNavigate } from "react-router-dom"

export const CharacterCard = ({ character }) => {
    const navigate = useNavigate()

    const classSummary = character.class_levels
        .map(entry => `${entry.dnd_class.name} ${entry.level}`)
        .join(" / ")

    return (
        <article className="flex items-center justify-between border border-gray-300 rounded-md bg-white p-4 mb-3">
            <div>
                <h2 className="text-lg font-semibold text-gray-900">{character.name}</h2>
                <p className="text-sm text-gray-700">
                    {character.race.name} · {classSummary}
                </p>
                <p className="text-sm text-gray-600">
                    HP {character.hp_current}/{character.hp_max} · AC {character.armor_class}
                </p>
            </div>
            <button
                onClick={() => navigate(`/characters/${character.id}`)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md"
            >
                View →
            </button>
        </article>
    )
}