import React, {useState, useEffect} from 'react';

import api from './services/api';

import './App.css';

function App(){
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    api.get('projects').then(res=>{
      setProjects(res.data);
    });
  }, [])

  async function handleAddProject(){
    //setProjects([...projects, `Novo projeto ${Date.now()}`]);

    const res = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Teste"
    });

    const project = res.data;

    setProjects([...projects, project]);
  }

  return(
    <>
      <ul>
        {projects.map(project=><li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;

