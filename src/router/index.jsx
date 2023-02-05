import { BrowserRouter } from "react-router-dom"
import { useAuth } from "../hooks/auth"

import { AppRouter } from "./app.router"
import { AuthRouter } from "./auth.router"

export function Router() {
  const { user } = useAuth()
  return <BrowserRouter>{user ? <AppRouter /> : <AuthRouter />}</BrowserRouter>
}
