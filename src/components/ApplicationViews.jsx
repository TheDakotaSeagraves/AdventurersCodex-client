import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized.jsx"
import { Login } from "./auth/Login.jsx"
import { Register } from './auth/Register.jsx'
import { CharacterEditForm } from "./CharacterEditForm.jsx"
import { CharacterForm } from "./CharacterForm.jsx"
import { CharacterSheet } from "./CharacterSheet.jsx"
import { EditProfile } from "./EditProfile.jsx"
import { Home } from "./Home.jsx"
import { NavBar } from "./nav/Navbar.jsx"
import { Profile } from "./Profile.jsx"

const ApplicationViews = () => {

    return <BrowserRouter>
        <NavBar />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/characters/new" element={<CharacterForm />} />
                <Route path="/characters/:id" element={<CharacterSheet />} />
                <Route path="/characters/:id/edit" element={<CharacterEditForm />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default ApplicationViews
