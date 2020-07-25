import React, { useState, useEffect } from "react";
import Repository from './components/Repository'
import api from './services/api'
import "./styles.css";

const App = () => {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then((response) => {
      console.log('Api loaded')
      setRepositories(response.data)
    })
  }, [])

  const handleAddRepository = async () => {
    try {
      const { data } = await api.post('repositories', {
        title: `Título do repositório ${Date.now()}`,
        url: 'https://github.com',
        techs: ['React', 'JavaScript']
      })

      setRepositories([...repositories, data])
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveRepository = async (id) => {
    try {
      await api.delete(`repositories/${id}`)

      setRepositories(repositories.filter(repositories => repositories.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="wrapper">
      <h2>Desafio 03 - Conceitos de ReactJS</h2>

      <ul className="repositories" data-testid="repository-list">
        {repositories.map(({ id, ...rest }) => (
          <li key={id}>
            <Repository 
              id={id}
              handleRemoveRepository={handleRemoveRepository}
              {...rest}
            />
          </li>
        ))}
      </ul>

      <footer>
        <button onClick={handleAddRepository} className="btn-success">
          Adicionar
        </button>
      </footer>
    </div>
  )
}

export default App;
