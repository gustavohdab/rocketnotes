import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../services/api"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [data, setData] = useState({})

  useEffect(() => {
    const token = localStorage.getItem("@Rocketnotes:token")
    const user = localStorage.getItem("@Rocketnotes:user")

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setData({ token, user: JSON.parse(user) })
    }
  }, [])

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      })
      const { token, user } = response.data

      localStorage.setItem("@Rocketnotes:token", token)
      localStorage.setItem("@Rocketnotes:user", JSON.stringify(user))

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setData({ token, user })
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Ocorreu um erro inesperado, tente novamente mais tarde.")
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@Rocketnotes:token")
    localStorage.removeItem("@Rocketnotes:user")

    setData({})
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const data = new FormData()

        data.append("avatar", avatarFile)

        const response = await api.patch("/users/avatar", data)

        user.avatar = response.data.avatar
      }

      await api.put("/users", user)

      localStorage.setItem("@Rocketnotes:user", JSON.stringify(user))
      setData({ user, token: data.token })

      alert("Perfil atualizado com sucesso!")
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Ocorreu um erro inesperado, tente novamente mais tarde.")
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: data.user,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
