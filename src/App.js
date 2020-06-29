import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => setProjects(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Adicionar",
      url: "http://github.com/adicionar",
      techs: ["Nodejs, Reactjs"],
    });

    setProjects([...projects, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newProjects = projects.filter((project) => project.id !== id);

    setProjects(newProjects);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((pro) => (
          <li key={pro.id}>
            {pro.title}
            <button onClick={() => handleRemoveRepository(pro.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
