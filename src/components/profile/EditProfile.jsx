// Edit Profile page — lets the user update their name, username, email, and password
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getProfile, updateProfile } from "../services/profileService"

export const EditProfile = () => {
    const [form, setForm] = useState(null)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    // Pre-fills the form with the current profile data on mount
    useEffect(() => {
        getProfile().then(p => setForm({
            firstName: p.firstName ?? "",
            lastName: p.lastName ?? "",
            username: p.username ?? "",
            email: p.email ?? "",
        }))
    }, [])

    // Returns a change handler for a specific form field
    const change = (field) => (e) => setForm({ ...form, [field]: e.target.value })

    // Validates passwords match, then PUTs the updated data to the API
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password && password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }
        const payload = { ...form }
        // Only include password in the payload if the user entered a new one
        if (password) payload.password = password
        updateProfile(payload).then(() => navigate("/profile"))
    }

    if (!form) {
        return (
            <main className="page-shell flex justify-center items-center">
                <p className="font-display text-xl text-ink-700">Unrolling the scroll…</p>
            </main>
        )
    }

    return (
        <main className="page-shell max-w-2xl mx-auto px-4 pt-24 pb-16">
            <Link to="/profile" className="inline-block mb-4 text-sm font-semibold">
                ← Back to Profile
            </Link>

            <section className="scroll-card p-8">
                <h1 className="text-3xl text-center mb-2">Edit Your Chronicle</h1>
                <div className="divider-ornate">✦</div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                        <fieldset className="flex flex-col gap-1">
                            <label className="font-display text-sm tracking-wider uppercase">First Name</label>
                            <input className="form-surface" value={form.firstName} onChange={change("firstName")} required />
                        </fieldset>
                        <fieldset className="flex flex-col gap-1">
                            <label className="font-display text-sm tracking-wider uppercase">Last Name</label>
                            <input className="form-surface" value={form.lastName} onChange={change("lastName")} required />
                        </fieldset>
                    </div>

                    <fieldset className="flex flex-col gap-1">
                        <label className="font-display text-sm tracking-wider uppercase">Username</label>
                        <input className="form-surface" value={form.username} onChange={change("username")} required />
                    </fieldset>

                    <fieldset className="flex flex-col gap-1">
                        <label className="font-display text-sm tracking-wider uppercase">Email</label>
                        <input type="email" className="form-surface" value={form.email} onChange={change("email")} required />
                    </fieldset>

                    <div className="divider-ornate">✦</div>

                    <fieldset className="flex flex-col gap-1">
                        <label className="font-display text-sm tracking-wider uppercase">New Password (optional)</label>
                        <input type="password" className="form-surface" value={password} onChange={e => setPassword(e.target.value)} placeholder="Leave blank to keep current" />
                    </fieldset>

                    <fieldset className="flex flex-col gap-1">
                        <label className="font-display text-sm tracking-wider uppercase">Confirm Password</label>
                        <input type="password" className="form-surface" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </fieldset>

                    {error && (
                        <p className="text-burgundy-700 text-sm font-semibold text-center">{error}</p>
                    )}

                    <div className="flex justify-end gap-3 mt-3">
                        <Link to="/profile" className="btn-ghost">Cancel</Link>
                        <button type="submit" className="btn-primary">Save Profile</button>
                    </div>
                </form>
            </section>
        </main>
    )
}
