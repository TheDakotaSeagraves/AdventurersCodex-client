import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem("adventurerscodex_token") !== null

    const handleLogout = () => {
        localStorage.removeItem("adventurerscodex_token")
        navigate('/login')
    }

    return (
        <nav className="navbar">
            <NavLink to={isLoggedIn ? "/profile" : "/login"} className="navbar__brand">
                Adventurer's Codex
            </NavLink>

            <ul className="navbar__links">
                {isLoggedIn ? (
                    <>
                        <li className="navbar__item">
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink to="/">Characters</NavLink>
                        </li>
                        <li className="navbar__item navbar__item--disabled" title="Coming soon">
                            Campaigns
                        </li>
                        <li className="navbar__item navbar__item--disabled" title="Coming soon">
                            Races/Classes
                        </li>
                        <li className="navbar__item navbar__item--disabled" title="Coming soon">
                            Notes
                        </li>
                        <li className="navbar__item">
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="navbar__item">
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink to="/register">Register</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}
