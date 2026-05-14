import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized.jsx"
import { Login } from "./auth/Login.jsx"
import { Register } from './auth/Register.jsx'
import { Home } from "./Home.jsx"
import { CharacterForm } from "./CharacterForm.jsx"

const ApplicationViews = () => {

    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/characters/new" element={<CharacterForm />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default ApplicationViews
