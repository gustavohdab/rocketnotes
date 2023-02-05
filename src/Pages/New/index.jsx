import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Button,
  ButtonText,
  Header,
  Input,
  NoteItem,
  Section,
  Textarea,
} from "../../components"
import { api } from "../../services/api"
import { Container, Form } from "./styles"

export function New() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate()

  function handleAddLink() {
    if (!newLink) {
      alert(`você não pode adicionar links sem conteúdo`)
      return
    }

    setLinks((prevState) => [...prevState, newLink])

    setNewLink("")
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted))
  }

  function handleAddTag() {
    if (!newTag) {
      alert(`você não pode adicionar tags sem conteúdo`)
      return
    }
    setTags((prevState) => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted))
  }

  function handleBack() {
    navigate(-1)
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Digite um título para a sua nota")
    }
    if (!description) {
      return alert("Digite um conteúdo para a sua nota")
    }
    if (newLink) {
      return alert(`Voce ainda não adicionou o link "${newLink}"`)
    }
    if (newTag) {
      return alert(`Voce ainda não adicionou a ultima tag "${newTag}"`)
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    })

    alert("nota criada com sucesso")
    navigate(-1)
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="Voltar" onClick={handleBack} />
          </header>

          <Input
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
            <NoteItem
              isNew
              placeholder="Novo Link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}

              <NoteItem
                isNew
                placeholder="Nova tag"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  )
}
