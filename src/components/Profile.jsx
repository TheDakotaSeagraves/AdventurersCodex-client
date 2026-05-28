import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProfile } from "./services/profileServices"
import { getCharacters } from "./services/characterServices"
import { CharacterCard } from "./CharacterCard"

export const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([getProfile(), getCharacters()]).then(([profileData, charactersData]) => {
      setProfile(profileData)
      setCharacters(charactersData)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <section className="pt-20 px-6">
        <p className="text-gray-600">Loading...</p>
      </section>
    )
  }

  const initials = `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`.toUpperCase()
  const displayName = `${profile.firstName} ${profile.lastName}`.trim() || profile.username
  const memberSince = new Date(profile.dateJoined).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

  return (
    <section className="pt-20 px-6 max-w-4xl mx-auto">
      {/* Profile header card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
          {initials}
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl font-bold">{displayName}</h1>
          <p className="text-gray-600">@{profile.username}</p>
          <p className="text-gray-600">{profile.email}</p>
          <p className="text-gray-500 text-sm mt-1">Member since {memberSince}</p>
        </div>
        <button
          onClick={() => navigate("/profile/edit")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md flex-shrink-0"
        >
          Edit Profile
        </button>
      </div>

      {/* My Characters section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">My Characters</h2>
          <button
            onClick={() => navigate("/")}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            View All →
          </button>
        </div>
        {characters.length === 0 ? (
          <p className="text-gray-600">No characters yet.</p>
        ) : (
          <div>
            {characters.slice(0, 2).map(character => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>

      {/* Stretch-feature placeholders */}
      <div className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-400">Campaigns</h2>
        <p className="text-gray-500 text-sm mt-1">Coming soon.</p>
      </div>

      <div className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-400">Game Content</h2>
        <p className="text-gray-500 text-sm mt-1">Coming soon.</p>
      </div>
    </section>
  )
}
