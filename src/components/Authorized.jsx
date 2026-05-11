import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./nav/Navbar.jsx"

export const Authorized = () => {
  if (localStorage.getItem("adventurerscodex_token")) {
    return <>
      <NavBar />
      <main className="pt-28 px-4 pb-4">
        <Outlet />
      </main>
    </>
  }
  return <Navigate to="/login" replace />
}
