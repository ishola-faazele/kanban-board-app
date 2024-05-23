import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CreateCol = ({ onCreate }: { onCreate: (newCol: string) => void }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [colName, setColName] = useState('');

    const handleCreateCol = () => {
        setIsAdding(!isAdding);
    };

    const handleSubmit = () => {
        if (!colName.trim()) {
            return;
        }
        onCreate(colName);
        setColName('');
        setIsAdding(false);
    };

    return (
        <div className="mb-4">
            <div
                onClick={handleCreateCol}
                className=" text-textColor text-base p-4 rounded-md  w-64 flex gap-2 items-center cursor-pointer"
            >
                <div className="flex gap-2 items-center" title="Add Column">
                    {isAdding ? <FaMinus /> : <FaPlus />}
                    <span>{isAdding ? "Cancel" : "Add Column"}</span>
                </div>
            </div>

            {isAdding && (
                <div className="flex flex-col gap-2 mt-2 w-64">
                    <input
                        type="text"
                        value={colName}
                        onChange={(e) => setColName(e.target.value)}
                        placeholder="Column Name"
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-primaryColor text-white p-2 rounded"
                    >
                        Create Column
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreateCol;
