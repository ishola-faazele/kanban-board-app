import { useState } from 'react';
import './App.css';
import { initialCardsData, PRIORITY, STATUS, TASK } from './utility/data';
import RenderColumns from './components/RenderColumns/RenderColumns';

function App() {
    const [allTasks, setAllTasks] = useState<TASK[]>(initialCardsData);
    const [projectName, setProjectName] = useState<string>('Project Name');
    const [isEditingName, setIsEditingName] = useState<boolean>(false);

    const modifyTask = (taskId: number, newValue: string | TASK, property: string) => {
      if(property === 'createTask') {
        const taskObj  = newValue as TASK;
        setAllTasks([...allTasks, taskObj]);
        return;
      }
      if(property === 'deleteTask') {
        const updatedTasks = allTasks.filter((task) => task.id !== taskId)
        setAllTasks(updatedTasks);
        return;
      }
      const updatedTasks = allTasks.map((task) => {
            if (task.id === taskId) {
                if (property === 'name') {
                    const newName = newValue as string
                    return { ...task, name: newName };
                } else if (property === 'priority') {
                  const priorityValue = newValue as PRIORITY;
                    return { ...task, priority: priorityValue };
                } else if (property === 'status') {
                    const statusValue = newValue as STATUS
                    return {...task, status: statusValue}
                }
            }
            return task;
        });
        setAllTasks(updatedTasks);
    };

    return (

        <div className='bg-bgColor w-full min-h-[100vh] flex overflow-scroll flex-col p-8 gap-8'>
            <div className='text-textColor text-2xl sm:text-4xl font-semibold bg-bgColor'>
                {isEditingName 
                    ? (
                    
                    <input 
                        value={projectName}
                        onChange={(event) => setProjectName(event?.target.value)}
                        onMouseLeave={()=> setIsEditingName(false)}
                        className=' outline-none w-fit bg-bgColor'
                    
                    />)
                    : <h2  onClick={()=> setIsEditingName(true)}>{projectName}</h2>
                }
            </div>
            <RenderColumns allTask={allTasks} modifyTask={modifyTask} />
        </div>
    );
}

export default App;
