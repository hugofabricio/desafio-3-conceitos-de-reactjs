import React from 'react'

const Repository = ({ id, url, title, techs, handleRemoveRepository }) => (
  <div className="repository" id={id}>
    <h3>{title}</h3>
    <p>{url}</p>
    {techs && (<div className="techs">
        <ul>{techs.map((tech, i) => <li key={i} >{tech}</li>)}</ul>
      </div>)
    }
    <button className="btn-danger" onClick={() => handleRemoveRepository(id)}>Remover</button>
  </div>
)

export default Repository