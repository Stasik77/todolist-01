import {v1} from 'uuid';
import {FilterValues, TodoListType} from '../App.tsx';

export type RemoveTodolistAction = ReturnType<typeof deleteTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodoListAc>
export type ChangeTodoListTitleAction = ReturnType<typeof updateTodoListTitleAc>
export type ChangeTodoListFilterAction = ReturnType<typeof changeFilterAC>


type ActionsType =

    | RemoveTodolistAction
    | AddTodolistActionType
    | ChangeTodoListTitleAction
    | ChangeTodoListFilterAction


const todolistId1 = v1()
const todolistId2 = v1()

const initialState: TodoListType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
]


export const todolistsReducer = (state = initialState, action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id) // логика удаления тудулиста
        }
        case 'ADD_TODOLIST': {
            const newTodoList: TodoListType = {id:action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodoList] // логика добавления тудулиста
        }

        case 'CHANGE-TODOLIST-TITLE' : {
            const {id, title} = action.payload // дистректурезировали
            return (state.map(el => el.id === id ? {...el, title: title} : el))
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const {id, filter} = action.payload
            return state.map(el => el.id === id ? {...el, filter} : el)
        }

        default:
            throw new Error(`i dont understand action type`);
    }
}

//Action criater

export const deleteTodolistAC = (id: string) => {  // AC action created
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        },
    } as const

}


export const addTodoListAc = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
            id:v1()
        }
    } as const
}


export const updateTodoListTitleAc = (payload: { id: string, title: string }) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload
    } as const
}

export const changeFilterAC = (payload: { id: string, filter: FilterValues }) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload
    } as const
}
