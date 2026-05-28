// Login page — authenticates the user and stores the token in localStorage
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../services/userService"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // Submits credentials to the API; on success stores the token and navigates to the profile page
    const handleLogin = (e) => {
        e.preventDefault()
        const userObject = { email, password }
        loginUser(userObject).then(res => {
            if (res.valid) {
                localStorage.setItem("adventurerscodex_token", res.token)
                navigate("/profile")
            } else {
                window.alert("Invalid credentials")
            }
        })
    }

    return (
        <main className="page-shell flex justify-center items-start pt-24 px-4">
            <section className="scroll-card w-full max-w-md p-10">
                <h1 className="text-3xl text-center mb-2">Enter the Codex</h1>
                <p className="text-center text-ink-700 italic mb-6">
                    Sign your name in the great ledger
                </p>
                <div className="divider-ornate">✦</div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <fieldset className="flex flex-col gap-1">
                        <label htmlFor="inputEmail" className="font-display text-sm tracking-wider uppercase text-ink-800">
                            Email
                        </label>
                        <input
                            type="email"
                            id="inputEmail"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            className="form-surface"
                            placeholder="adventurer@codex.com"
                            required
                            autoFocus
                        />
                    </fieldset>

                    <fieldset className="flex flex-col gap-1">
                        <label htmlFor="inputPassword" className="font-display text-sm tracking-wider uppercase text-ink-800">
                            Password
                        </label>
                        <input
                            type="password"
                            id="inputPassword"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="form-surface"
                            placeholder="••••••••"
                            required
                        />
                    </fieldset>

                    <button type="submit" className="btn-primary mt-2">
                        Enter
                    </button>
                </form>

                <div className="divider-ornate">✦</div>

                <p className="text-center text-sm">
                    New to these lands?{" "}
                    <Link to="/register" className="font-semibold">
                        Forge an account
                    </Link>
                </p>
            </section>
        </main>
    )
}
