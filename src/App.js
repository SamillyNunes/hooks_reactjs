import React, { useState, useEffect } from "react";

function App(){
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  function handleAdd(){

    setTasks([...tasks, input]);
    setInput('');
  }

  // Quando a gente deixa o paramatro de observacao (segundO) vazio, ele vai executar isso
  // assim que montar a tela
  useEffect(()=>{
    const tasksStorage = localStorage.getItem('tasks');

    // Se tem alguma coisa na lista...
    if(tasksStorage){
      setTasks(JSON.parse(tasksStorage));
    }

    // A linha abaixo trabalha equivalente ao componente willMount():
    return () => {}
  }, []);
  
  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  return (
    <div>
      <h1> React Hooks</h1>
      <ul>
        { tasks.map(task => 
            <li key={task}> { task } </li> 
        )}
      </ul>
      <input type="text" value={input} onChange={(e)=> setInput(e.target.value)} />
      <button type="button" onClick={handleAdd} >Adicionar</button>
    </div>
  );
}

export default App;
