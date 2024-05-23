import React, { useEffect, useState } from 'react';
import Column from '../Column/Column';
import { TASK } from '../../utility/data';
import CreateCol from '../Column/CreateCol';

interface RenderColumnsProps {
    allTask: TASK[];
    modifyTask: (taskId: number, newValue: string | TASK, property: string) => void;
}

interface TaskGroup {
    status: string;
    tasksInGroup: TASK[];
}

const RenderColumns: React.FC<RenderColumnsProps> = ({ allTask, modifyTask }) => {
    const [statuses, setStatuses] = useState<string[]>(['todo', 'in-progress', 'completed', 'ARCHIVED']);
    const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);

    useEffect(() => {
        const groupTasks = (allTasks: TASK[], statuses: string[]): TaskGroup[] => {
            return statuses.map((status) => {
                const tasksInGroup = allTasks.filter((task) => task.status === status);
                return { status, tasksInGroup };
            });
        };
        setTaskGroups(groupTasks(allTask, statuses));
    }, [allTask, statuses]);

    const handleCreateColumn = (newCol: string) => {
        if (newCol === 'ARCHIVED') {
            alert('Cannot name column ARCHIVED');
            return;
        }
        if (statuses.includes(newCol)) {
            const repeats = statuses.filter(i => i === newCol).length;
            newCol = `${newCol} (${repeats})`;
        }
        setStatuses([...statuses, newCol]);
    };

    const handleModifyColumn = (colName: string, activity: string, newName: string = '') => {
        if (activity === 'delete') {
            setStatuses(statuses.filter(status => status !== colName));
            allTask.forEach((task) => {
                if (task.status === colName) {
                    modifyTask(task.id, '', 'deleteTask');
                }
            });
        } else if (activity === 'change-name' && newName) {
            setStatuses(statuses.map(status => status === colName ? newName : status));
        }
    };

    return (
        <div className='flex gap-8'>
            {taskGroups.map((column) => (
                <Column
                    key={column.status}
                    TasksInColumn={column.tasksInGroup}
                    status={column.status}
                    modifyTask={modifyTask}
                    onModify={handleModifyColumn}
                />
            ))}
            <CreateCol onCreate={handleCreateColumn} />
        </div>
    );
};

export default RenderColumns;
