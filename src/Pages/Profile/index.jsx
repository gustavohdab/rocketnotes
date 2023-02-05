import { useState } from "react"
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from "react-icons/fi"
import { Link } from "react-router-dom"
import avatarPlaceholder from "../../assets/avatar-placeholder.svg"
import { Button, Input } from "../../components"
import { useAuth } from "../../hooks/auth"
import { api } from "../../services/api"
import { Avatar, Container, Form } from "./styles"

export function Profile() {
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [oldPassword, setOldPassword] = useState("")
  const [password, setPassword] = useState("")

  const avatarUrl = user.avatar
    ? `
    ${api.defaults.baseURL}/files/${user.avatar}
  `
    : avatarPlaceholder
  const [avatar, setAvatar] = useState(avatarUrl)
  const [avatarFile, setAvatarFile] = useState(null)

  async function handleUpdateProfile() {
    const updated = {
      name,
      email,
      password,
      old_password: oldPassword,
    }

    const userUpdated = Object.assign(user, updated)
    await updateProfile({ user: userUpdated, avatarFile })
  }

  async function handleAvatarChange(event) {
    const file = event.target.files[0]
    setAvatarFile(file)

    const preview = URL.createObjectURL(file)

    setAvatar(preview)
  }

  return (
    <Container>
      <header>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt={`Foto de perfil de ${user.name}`} />

          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleAvatarChange} />
          </label>
        </Avatar>
        <Input
          name="name"
          type="text"
          icon={FiUser}
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          name="email"
          type="email"
          icon={FiMail}
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="old_password"
          type="password"
          icon={FiLock}
          label="Senha atual"
          value={oldPassword}
          autoComplete="off"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          icon={FiLock}
          label="Nova senha"
          value={password}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button title="Salvar" onClick={handleUpdateProfile} />
      </Form>
    </Container>
  )
}
