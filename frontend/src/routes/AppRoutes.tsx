import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../pages/login"
import Triagem from "../pages/triagem"
import Fila from  "../pages/fila"

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/triagem"
                    element={<Triagem />}
                />

                <Route
                     path="/fila"
                     element={<Fila/>}
                />
                   

                

            </Routes>

        </BrowserRouter>

    )
}