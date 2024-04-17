import React, { useState, useEffect, useMemo } from "react";

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


  // useMemo soh vai computar o valor (tasksTotal) quando tiver uma atualizacao no estado de tasks
  const tasksTotal = useMemo(()=> tasks.length, [tasks]);


  return (
    <div>
      <h1> React Hooks</h1>
      <ul>
        { tasks.map(task => 
            <li key={task}> { task } </li> 
        )}
      </ul>
      <br/>

      <strong> Você tem {tasksTotal} tarefas! </strong>
      <br/>
      <br/>

      <input type="text" value={input} onChange={(e)=> setInput(e.target.value)} />
      <button type="button" onClick={handleAdd} >Adicionar</button>
    </div>
  );
}

export default App;
