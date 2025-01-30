import '../index.css'
import { useState } from 'react'

const Form = () => {
  const [tasks, setTasks] = useState<string[]>(["hello", "world"]);
  const [newTask, setNewtask] = useState("");
  const [edit, setEdit] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewtask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewtask("");
    }
  };

  const deleteTask = (item: string) => {
    setTasks(tasks.filter(task => task !== item));
  };

  const editTask = (index: number) => {
    setEdit(index);
    setNewtask(tasks[index]);
  };

  const save = () => {
    setTasks(tasks.map((task, i) => (i === edit ? newTask : task)));
    setEdit(null);
    setNewtask("");
  };

  return (
    <div className='to-do-list flex flex-col gap-8 p-8 w-96 h-96 items-center justify-self-center mt-10 bg-amber-700'>
      <h2 className='heading text-3xl font-bold'>To-do-list</h2>
      <div>
        <input
          type="text"
          className='task-here border-1 bg-amber-200'
          value={newTask}
          onChange={handleChange}
        />
        <button className='addButton p-1 bg-amber-950 text-amber-200 ml-2.5' onClick={addTask}>
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {edit === index ? (
              <>
                <input
                  type="text"
                  className='task-here border-1 bg-amber-200'
                  value={newTask}
                  onChange={handleChange}
                />
                <button className='save-btn p-1 border-2 m-1 bg-green-600 font-bold' onClick={save}>
                  Save
                </button>
              </>
            ) : (
              <>
                {task}
                <button className='delete-btn p-1 border-2 m-1 bg-red-600 font-bold' onClick={() => deleteTask(task)}>
                  Delete
                </button>
                <button className='edit-btn p-1 border-2 m-1 bg-yellow-400 font-bold' onClick={() => editTask(index)}>
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
