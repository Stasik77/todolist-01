import {v1} from 'uuid'
import {expect, test} from 'vitest'
import {FilterValues, TodoListType} from '../App'
import {addTodoListAc, changeFilterAC, deleteTaskAC, todolistsReducer, updateTodoListTitleAc} from './todolists-reducer'

test('correct todolist should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // 2. Действие
    // const action = {
    //     type: 'REMOVE-TODOLIST',
    //     payload: {
    //         id: todolistId1,
    //     },
    // } as const  // в конце каждого actiona  AS CONST

    const endState = todolistsReducer(startState, deleteTaskAC(todolistId1))

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be created', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // const action = {
    //     type: 'ADD_TODOLIST',
    //     payload: {
    //         title: 'New Todolist'
    //     }
    // } as const


    const endState = todolistsReducer(startState,addTodoListAc('New Todolist'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todolist')
})

test('correct todolist should change its title', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     payload: {
    //         id: todolistId2,
    //         title: "New Todolist"
    //     }
    // } as const

    const endState = todolistsReducer(startState,updateTodoListTitleAc(todolistId2,"New Todolist"))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe("New Todolist")
})



test('correct todolist should change its filter', () => {


    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
   // const action = {
   //     type: 'CHANGE-TODOLIST-FILTER',
   //     payload: {
   //         id: todolistId2,
   //         filter: 'completed'
   //     }
   // } as const

    const endState = todolistsReducer(startState,changeFilterAC(todolistId2,'completed'))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')

})
