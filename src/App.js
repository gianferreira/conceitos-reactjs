import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

export default function App() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject() {
    //setProjects([...projects, `Novo Projeto ${Date.now()}`]);

    const response = await api.post('projects', {
      title: `API REST com NodeJS ${Date.now()}`,
      owner: 'Gian Ferreira'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  );
}
