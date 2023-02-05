import { useState } from "react"
import { FiLock, FiMail } from "react-icons/fi"
import { Link } from "react-router-dom"
import { Button, Input } from "../../components/index"
import { useAuth } from "../../hooks/auth"
import { Background, Container, Form } from "./styles"

export function SignIn() {
  const { signIn } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSignIn(e) {
    e.preventDefault()
    await signIn({ email, password })
  }
  return (
    <Container>
      <Form>
        <h1>RocketNotes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Faça seu login</h2>

        <Input
          label="E-mail"
          type="email"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Senha"
          type="password"
          icon={FiLock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title="Entrar" onClick={handleSignIn} />

        <Link to="/register">Criar conta</Link>
      </Form>

      <Background />
    </Container>
  )
}
