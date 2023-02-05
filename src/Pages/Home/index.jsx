import { useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { ButtonText, Header, Input, Note, Section } from "../../components"
import { api } from "../../services/api"
import { Brand, Container, Content, Menu, NewNote, Search } from "./styles"

export function Home() {
  const navigate = useNavigate()

  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])
  const [search, setSearch] = useState("")
  const [notes, setNotes] = useState([])

  function handleTagSelected(tag) {
    const alreadySelected = tagsSelected.includes(tag)

    if (alreadySelected) {
      const filteredTags = tagsSelected.filter((t) => t !== tag)
      setTagsSelected(filteredTags)
    } else {
      setTagsSelected([...tagsSelected, tag])
    }
  }

  function handleDetail(id) {
    navigate(`/details/${id}`)
  }

  useEffect(() => {
    async function getTags() {
      const response = await api.get("/tags")
      setTags(response.data)
    }
    getTags()
  }, [])

  useEffect(() => {
    async function getNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${tagsSelected}`
      )
      setNotes(response.data)
    }
    getNotes()
  }, [tagsSelected, search])
  return (
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            onClick={() => setTagsSelected([])}
            isActive={tagsSelected.length === 0}
          />
        </li>
        {tags &&
          tags.map((tag) => (
            <li key={String(tag.name)}>
              <ButtonText
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))}
      </Menu>

      <Search>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar pelo título"
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {notes &&
            notes.map((note) => (
              <Note
                key={String(note.id)}
                data={note}
                onClick={() => handleDetail(note.id)}
              />
            ))}
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  )
}
