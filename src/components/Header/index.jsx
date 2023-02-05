import { RiShutDownLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import avatarPlaceholder from "../../assets/avatar-placeholder.svg"
import { useAuth } from "../../hooks/auth"
import { api } from "../../services/api"
import { Container, Logout, Profile } from "./styles"

export function Header() {
  const navigate = useNavigate()
  const { signOut, user } = useAuth()

  const avatarUrl = user.avatar
    ? `
    ${api.defaults.baseURL}/files/${user.avatar}
  `
    : avatarPlaceholder

  function handleLogout() {
    signOut()
    navigate("/")
  }

  return (
    <Container>
      <Profile to="/profile">
        <img src={avatarUrl} alt={`Foto de perfil de ${user.name}`} />

        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout type="button" onClick={handleLogout}>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}
