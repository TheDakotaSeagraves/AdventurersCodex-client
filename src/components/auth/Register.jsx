// Registration page — creates a new account and logs the user in immediately
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../services/userService"

export const Register = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // Submits registration data to the API; on success stores the token and navigates to the profile page
    const handleRegister = (e) => {
        e.preventDefault()
        const newUser = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
        }
        registerUser(newUser).then(res => {
            if (res.token) {
                localStorage.setItem("adventurerscodex_token", res.token)
                navigate("/profile")
            } else {
                window.alert("Registration failed")
            }
        })
    }

    return (
        <main className="page-shell flex justify-center items-start pt-24 px-4 pb-16">
            <section className="scroll-card w-full max-w-md p-10">
                <h1 className="text-3xl text-center mb-2">Forge Your Legend</h1>
                <p className="text-center text-ink-700 italic mb-6">
                    Inscribe your name into the codex
                </p>
                <div className="divider-ornate">✦</div>

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                        <fieldset className="flex flex-col gap-1">
                            <label className="font-display text-sm tracking-wider uppercase text-ink-800">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={evt => setFirstName(evt.target.value)}
                                className="form-surface"
                                required
                                autoFocus
                            />
                        </fieldset>
                        <fieldset className="flex flex-col gap-1">
                            <label className="font-display text-sm tracking-wider uppercase text-ink-800">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={evt => setLastName(evt.target.value)}
                                className="form-surface"
                                required
                            />
                        </fieldset>
                    </div>

                    <fieldset className="flex flex-col gap-1">
                        <label className="font-display text-sm tracking-wider uppercase text-ink-800">
                            Adventurer Name
                        </label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={evt => setDisplayName(evt.target.value)}
                            className="form-surface"
                            placeholder="The name by which you'll be known"
                            required
                        />
                    </fieldset>

                    <fieldset className="flex flex-col gap-1">
                        <label className="font-display text-sm tracking-wider uppercase text-ink-800">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            className="form-surface"
                            required
                        />
                    </fieldset>

                    <fieldset className="flex flex-col gap-1">
                        <label className="font-display text-sm tracking-wider uppercase text-ink-800">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="form-surface"
                            required
                        />
                    </fieldset>

                    <button type="submit" className="btn-primary mt-2">
                        Forge Account
                    </button>
                </form>

                <div className="divider-ornate">✦</div>

                <p className="text-center text-sm">
                    Already chronicled?{" "}
                    <Link to="/login" className="font-semibold">
                        Return to the codex
                    </Link>
                </p>
            </section>
        </main>
    )
}
