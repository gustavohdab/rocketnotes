import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, ButtonText, Header, Section, Tag } from "../../components"
import { api } from "../../services/api"
import { Container, Content, Links } from "./styles"

export function Details() {
  const params = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState({})

  function handleBack() {
    navigate(-1)
  }

  async function handleDelete() {
    const confirm = window.confirm("Deseja realmente excluir esta nota?")

    if (confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function getNote() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }
    getNote()
  }, [])

  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText title="Excluir nota" onClick={handleDelete} />

            <h1>{data.title}</h1>

            <p>{data.description}</p>

            {data.links && data.links.length > 0 && (
              <Section title="Links úteis">
                <Links>
                  {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank">
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}

            {data.tags && data.tags.length > 0 && (
              <Section title="Marcadores">
                {data.tags.map((tag) => (
                  <Tag key={String(tag.id)} title={tag.name} />
                ))}
              </Section>
            )}

            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      )}
    </Container>
  )
}
