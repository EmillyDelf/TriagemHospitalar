import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"

import Login from "../pages/login"
import Triagem from "../pages/triagem"
import Fila from  "../pages/fila"
import  CadastroPaciente from "../pages/CadastroPaciente"

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

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

                <Route
                    path="/cadastro"
                    element={<CadastroPaciente/>}
                />
                   

                

            </Routes>

        </BrowserRouter>

    )
}