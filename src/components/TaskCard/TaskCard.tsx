import React, { useState } from 'react';
import { TASK } from '../../utility/data';
import PriorityIcon from './PriorityIcon';
import { SlOptionsVertical } from "react-icons/sl";

interface TaskCardProps {
    task: TASK;
    modifyTask: (taskId: number, newValue: string, property: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, modifyTask }) => {
    const [taskName, setTaskName] = useState<string>(task.name);
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [taskPriority, setTaskPriority] = useState<string>(task.priority);
    const [isEditingPriority, setIsEditingPriority] = useState<boolean>(false);
    const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        setTaskName(newName);
        modifyTask(task.id, newName, 'name');
    }

    const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newPriority = event.target.value;
        setTaskPriority(newPriority);
        modifyTask(task.id, newPriority, 'priority');
        setIsEditingPriority(false);
    }

    const handleTaskOptions = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setIsOptionsVisible(false);
        if (selectedValue === 'delete') {
            modifyTask(task.id, '', 'deleteTask');
        }
        else if (selectedValue === 'archive') {
            modifyTask(task.id, 'ARCHIVED', 'status');
        }
    }

    const toggleOptions = () => {
        setIsOptionsVisible(prevState => !prevState);
    }

    return (
        <div className="task-card bg-cardBgColor p-4 mb-4 rounded-md shadow-md w-56 sm:w-72 flex gap-2 justify-between items-center">
            <div className='flex items-center relative gap-1 flex-1  font-bold text-[0.5rem] sm:text-base'>
                <div className=''>
                    <span className="cursor-pointer text-textColor" onClick={toggleOptions}>
                        <SlOptionsVertical />
                    </span>
                    {isOptionsVisible && (
                        <div className="absolute left-0 top-0 mt-8 bg-white shadow-md rounded-md z-10">
                            <select 
                                value="select action"
                                onChange={handleTaskOptions}
                                onMouseLeave={() => setIsOptionsVisible(false)}
                                className="text-black px-4 py-2 w-full text-left hover:bg-gray-200"
                            >
                                <option value='select action' disabled>Select action</option>
                                <option value='delete'>Delete Task</option>
                                <option value='archive'>Archive Task</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className='flex-1 h-6 flex items-center'>
                    {!isEditingName ? (
                        <h3
                            className="task-name text-textColor"
                            onClick={() => setIsEditingName(true)}
                        >   
                            {taskName}
                        </h3>
                    ) : (
                        <input
                            className='task-name-edit outline-none bg-cardBgColor text-textColor w-full'
                            value={taskName}
                            onChange={handleChangeName}
                            onBlur={() => setIsEditingName(false)}
                            autoFocus
                        />
                    )}
                </div>
            </div>

            <div>
                {!isEditingPriority ? (
                    <div 
                        className='cursor-pointer'
                        onClick={() => setIsEditingPriority(true)} 
                        title={`${task.priority} priority`}
                    >
                        <PriorityIcon priority={task.priority} />
                    </div>
                ) : (
                    <select 
                        value={taskPriority}
                        onChange={handlePriorityChange}
                        onBlur={() => setIsEditingPriority(false)}
                        autoFocus
                        className='priority-select outline-none text-sm bg-cardBgColor text-textColor cursor-pointer'
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
