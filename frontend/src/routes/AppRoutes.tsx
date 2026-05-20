import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../pages/login"
import Triagem from "../pages/triagem"

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/triagem"
                    element={<Triagem />}
                />

            </Routes>

        </BrowserRouter>

    )
}