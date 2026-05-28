// Root router — defines all app routes and renders NavBar on every page
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized.jsx"
import { Login } from "./auth/Login.jsx"
import { Register } from './auth/Register.jsx'
import { EditCharacter } from "./character/EditCharacter.jsx"
import { CharacterSheet } from "./character/CharacterSheet.jsx"
import { EditProfile } from "./profile/EditProfile.jsx"
import { CharacterList } from "./character/CharacterList.jsx"
import { CreateCharacter } from "./character/CreateCharacter.jsx"
import { NavBar } from "./nav/Navbar.jsx"
import { Profile } from "./profile/Profile.jsx"

const ApplicationViews = () => {

    return <BrowserRouter>
        <NavBar />
        <Routes>
            {/* Public routes — accessible without a token */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes — Authorized redirects to /login if no token */}
            <Route element={<Authorized />}>
                <Route path="/" element={<CharacterList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/characters/create" element={<CreateCharacter />} />
                <Route path="/characters/:id" element={<CharacterSheet />} />
                <Route path="/characters/:id/edit" element={<EditCharacter />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default ApplicationViews
