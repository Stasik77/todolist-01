import {TasksStateType} from '../App.tsx';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistAction} from './todolists-reducer.ts';


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.taskID)
            }   // логика удаления таски

        }
        case 'ADD_TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }

        case 'CHANGE_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        }

        case  'CHANGE_TITLE_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.updateTitle
                } : el)
            }
        }

        case  'ADD_TODOLIST': {
            return {...state, [action.payload.id]: [],}

        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.id];
            return copyState
        }

// const{[action.payload.id]:_,...rest }=state;
//         return rest

        default:
            throw new Error(`i dont understand action type`);
    }
}

//Action creators


export const removeTaskAC = (payload: { taskID: string, todoListId: string }) => {
    return {
        type: 'REMOVE_TASK', payload
    } as const
}


export const addTaskAC = (payload: { title: string, todolistId: string }) => {
    return {
        type: 'ADD_TASK', payload
    } as const
}

export const changeTaskStatusAC = (payload: { taskId: string, isDone: boolean, todolistId: string }) => {
    return {
        type: 'CHANGE_TASK', payload
    } as const
}

export const changeTaskTitleAC = (payload: { taskId: string, todolistId: string, updateTitle: string }) => {
    return {
        type: 'CHANGE_TITLE_TASK', payload
    } as const
}


//Action Type
type ActionsType =
    | RemoveTaskAction
    | AddTaskAction
    | ChangeTaskAction
    | ChangeTitleTaskAction
    | AddTodolistActionType
    | RemoveTodolistAction
type RemoveTaskAction = ReturnType<typeof removeTaskAC>
type AddTaskAction = ReturnType<typeof addTaskAC>
type ChangeTaskAction = ReturnType<typeof changeTaskStatusAC>
type ChangeTitleTaskAction = ReturnType<typeof changeTaskTitleAC>

