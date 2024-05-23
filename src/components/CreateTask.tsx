import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import { PRIORITY } from "../utility/data";
const CreateTask: React.FC<{ onCreate: (taskName: string, taskPriority: PRIORITY) => void }> = ({ onCreate }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskPriority, setTaskPriority] = useState<PRIORITY>('low');

    const handleCreateTask = () => {
        setIsAdding(!isAdding);
    };

    const handleSubmit = () => {
        if(!taskName.trim()) {
            return;
        }
        onCreate(taskName, taskPriority);
        setTaskName('');
        setTaskPriority('low');
        setIsAdding(false);
    };

    return (
        <div className="text-[0.5rem] sm:text-base w-56 sm:w-72">
            <div
                onClick={handleCreateTask}
                className="bg-cardBgColor hover:bg-primaryColor text-textColor p-4 mb-4 rounded-md shadow-md flex gap-2 items-center cursor-pointer"
            >
                <div className="flex gap-2 items-center" title="Add Task">
                    <IoIosAdd />
                    <span>{isAdding ? 'Cancel' : 'Add Task'}</span>
                </div>
            </div>
            {isAdding && (
                <div className="bg-cardBgColor p-4 mb-4 rounded-md shadow-md">
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Task Name"
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                    <select
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value as PRIORITY)}
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button onClick={handleSubmit} className="bg-primaryColor text-white p-2 rounded w-full">
                        Create Task
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreateTask