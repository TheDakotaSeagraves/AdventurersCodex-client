import { Link } from "react-router-dom"

export const CharacterForm = () => {
  return (
    <section>
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Character List
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">New Character</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
        {/* Fields added in commit 2 */}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Ability Scores</h2>
        {/* Fields added in commit 3 */}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Vitals</h2>
        {/* Fields added in commit 4 */}
      </section>
    </section>
  )
}