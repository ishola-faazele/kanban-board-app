// src/utility/data.ts
export type STATUS = 'todo' | 'in-progress' | 'completed';
export type PRIORITY = 'low' | 'medium' | 'high';

export interface TASK {
    id: number;
    name: string;
    status: STATUS;
    priority: PRIORITY;
}

const generateId = (): number => Date.now() + Math.floor(Math.random() * 1000);

export const initialCardsData: TASK[] = [
    {
        id: generateId(),
        name: 'Implement authentication',
        status: 'todo',
        priority: 'high',
    },
    {
        id: generateId(),
        name: 'Set up database',
        status: 'in-progress',
        priority: 'medium',
    },
    {
        id: generateId(),
        name: 'Design the homepage',
        status: 'completed',
        priority: 'low',
    },
    {
        id: generateId(),
        name: 'Configure CI/CD',
        status: 'todo',
        priority: 'high',
    },
    {
        id: generateId(),
        name: 'Write unit tests',
        status: 'in-progress',
        priority: 'medium',
    },
    {
        id: generateId(),
        name: 'Deploy to production',
        status: 'todo',
        priority: 'high',
    },
    {
        id: generateId(),
        name: 'Fix login bug',
        status: 'completed',
        priority: 'high',
    },
];

export default initialCardsData;
