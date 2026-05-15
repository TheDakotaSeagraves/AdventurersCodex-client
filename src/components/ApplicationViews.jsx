import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized.jsx"
import { Login } from "./auth/Login.jsx"
import { Register } from './auth/Register.jsx'
import { Home } from "./Home.jsx"
import { CharacterForm } from "./CharacterForm.jsx"
import { CharacterSheet } from "./CharacterSheet.jsx"

const ApplicationViews = () => {

    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/characters/new" element={<CharacterForm />} />
                <Route path="/characters/:id" element={<CharacterSheet />} />
                <Route path="/characters/:id" element={<CharacterSheet />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default ApplicationViews
