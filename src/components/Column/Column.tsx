import React, { useState } from 'react';
import { STATUS, TASK, PRIORITY } from "../../utility/data";
import TaskCard from "../TaskCard/TaskCard";
import CreateTask from "../CreateTask";
import { SlOptionsVertical } from "react-icons/sl";

interface ColumnInterface {
    TasksInColumn: TASK[];
    status: string;
    modifyTask: (taskId: number, newValue: string | TASK, property: string) => void;
    onModify: (colName: string, activity: string, newName:string) => void;
}

const Column: React.FC<ColumnInterface> = ({ TasksInColumn, status, modifyTask, onModify }) => {
    const [optionsOpened, setOptionsOpened] = useState<boolean>(false);
    const [selectedOpt, setSelectedOpt] = useState<string>('select action');
    const [colName, setColName] = useState<string>(status);
    const [isEditingName, setIsEditingName] = useState<boolean>(false);

    const handleCreateTask = (name: string, priority: PRIORITY) => {
        const newTask: TASK = {
            id: Date.now(),
            name,
            status: status as STATUS,
            priority,
        };
        modifyTask(0, newTask, 'createTask');
    };

    const handleSetOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedOpt(selectedValue);
        if (selectedValue === 'delete') {
            onModify(status, 'delete','');
        }
        setOptionsOpened(false); // Close options after selection
    };
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        setColName(newName);
        
    }
    return (
        <div className="rounded-md shadow-md w-56 sm:w-72">
            <div className="text-textColor text-base sm:text-2xl my-2 text-center flex justify-between pr-5 mb-6">
                <div className="flex items-center relative">
                    <SlOptionsVertical className="cursor-pointer" onClick={() => setOptionsOpened(true)} />
                    {optionsOpened && (
                        <div className="absolute left-0 top-0 mt-8 bg-white shadow-md rounded-md z-10">
                            <select
                                id="optionsMenu"
                                className="text-black px-4 py-2 w-full text-left hover:bg-gray-200 font-bold text-[0.5rem] sm:text-base"
                                value={selectedOpt}
                                onChange={handleSetOption}
                                onMouseLeave={() => setOptionsOpened(false)}
                                autoFocus
                            >
                                <option value="select action" disabled>select action</option>
                                <option value="delete">Delete Column</option>
                            </select>
                            
                        </div>
                    )}
                    <div>
                        {isEditingName 
                        ? (<input 
                            className='task-name-edit outline-none bg-bgColor text-textColor w-full text-base sm:text-2xl ml-2'
                            value={colName}
                            onChange={handleChangeName}
                            onBlur={() => setIsEditingName(false)}
                            autoFocus
                            />)
                        : <h2 className="ml-2" onClick={() => setIsEditingName(true)}>{status}</h2>
                        }
                        

                    </div>
                </div>

                <div>{TasksInColumn.length}</div>
            </div>

            <CreateTask onCreate={handleCreateTask} />

            <div>
                {TasksInColumn.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        modifyTask={modifyTask}
                    />
                ))}

            </div>
        </div>
    );
};

export default Column;
