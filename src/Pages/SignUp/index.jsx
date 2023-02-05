import { useState } from "react"
import { FiLock, FiMail, FiUser } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { Button, Input } from "../../components"
import { api } from "../../services/api"
import { Background, Container, Form } from "./styles"

export function SignUp() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSignUp() {
    if (name === "" || email === "" || password === "") {
      alert("Preencha todos os campos")
      return
    }

    api
      .post("/users", {
        name,
        email,
        password,
      })
      .then((response) => {
        if (response.status === 201) {
          alert("Usuário cadastrado com sucesso!")
          navigate("/")
        }
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message)
        } else {
          alert("Erro ao cadastrar usuário")
        }
      })
  }

  return (
    <Container>
      <Background />
      <Form>
        <h1>RocketNotes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          label="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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

        <Button title="Cadastrar" onClick={handleSignUp} />

        <Link to="/">Voltar para o login</Link>
      </Form>
    </Container>
  )
}
