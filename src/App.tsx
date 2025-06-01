import './App.css'
import {TaskType, TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm.tsx';
import ButtonAppBar from './ButtonAppBar.tsx';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';


export type FilterValues = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValues,
}

type ThemeMode = 'light' | 'dark';

function App() {


    const todolistId1 = v1()
    const todolistId2 = v1()

    // глобальный стейт

    const [todoLists, settodoLists] = useState<TodoListType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })


    // const [filter, setFilter] = useState<FilterValues>('all');


    // const [todoLists, settodoLists] = useState<TodoListType[]>(
    //     [
    //         {id: v1(), title: 'What to learn', filter: 'all'},
    //         {id: v1(), title: 'What to buy', filter: 'all'},
    //     ])
    //
    //


    // let [tasks, setTasks] = useState<TaskType[]>([
    //
    //     {id: v1(), title: 'html', isDone: false},
    //     {id: v1(), title: 'react', isDone: true},
    //     {id: v1(), title: 'js', isDone: true},
    //     {id: v1(), title: 'redux', isDone: true},
    //     {id: v1(), title: 'Typescript', isDone: false},
    //     {id: v1(), title: 'RTK query', isDone: false},
    // ])


    const changeFilter = (todoListId: string, newFilter: FilterValues) => {
//                                                          {id: v1(), title: 'What to buy', filter: 'all'},
        settodoLists(prevState => (prevState.map(el => el.id === todoListId ? {...el, filter: newFilter} : el)))

        //     const currentTodo = todoLists.find(el => el.id === todoListId)
        //     if (currentTodo) {
        //         currentTodo.filter = newFilter
        //         settodoLists([...todoLists])
        //     }

    }

    const deleteTask = (todoListId: string, taskId: string) => {

        setTasks(prevState => ({
            ...prevState, [todoListId]: prevState[todoListId].filter(el => el.id !== taskId)
        }))
        // const removeTasks = tasks.filter(f => {
        //     return f.id !== taskId
        // })
        // setTasks(removeTasks);
    }

    const addTask = (title: string, todoListId: string) => {

        const newTask = {id: v1(), title, isDone: true};
        setTasks(prevState => ({...prevState, [todoListId]: [...prevState[todoListId], newTask,]}))

        // const newTasks = [newTask, ...tasks];
        // setTasks(newTasks);
    }


    const addTodoList = (title: string) => {

        const id = v1()
        const newTodoList: TodoListType = {id, title, filter: 'all'}
        settodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [id]: [],})
    }


    const changeTaskStatus = (todoListId: string, taskId: string, taskStatus: boolean) => {
        setTasks(prevState => ({
            ...prevState,
            [todoListId]: prevState[todoListId].map(el => el.id === taskId ? {...el, isDone: taskStatus} : el)
        }))
    }

    const deleteTodolist = (todoListId: string) => {
        settodoLists((prevState) => prevState.filter(el => el.id !== todoListId))
        delete tasks[todoListId]
    }

    const updateTaskTitle = (todoListId: string, taskId: string, updateTitle: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, title: updateTitle} : el)
        },)
    }

    const updateTodoListTitle = (todoListId: string, updateTitle: string) => {
        settodoLists(todoLists.map(el => el.id === todoListId ? {...el, title: updateTitle} : el))
    }


    // const theme = createTheme({
    //     palette: {
    //         primary: {
    //             light: '#757ce8',
    //             main: '#3f50b5',
    //             dark: '#002884',
    //             contrastText: '#fff',
    //         },
    //         secondary: {
    //             light: '#ff7961',
    //             main: '#f44336',
    //             dark: '#ba000d',
    //             contrastText: '#000',
    //         },
    //     },
    // });

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')


    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'dark' : 'light',
            primary: {
                main: '#6f7b7e'
            }
        }
    })

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
        return (
            <ThemeProvider theme={theme}>
          <CssBaseline/>
                <Container fixed>
                    <div className="app">
                        <ButtonAppBar changeModeHandler={changeModeHandler}/>
                        <Grid container>
                            <AddItemForm addItem={addTodoList}/>
                        </Grid>
                        <Grid container>
                            {todoLists.map(el => {

                                let filteredTasks = tasks[el.id]
                                if (el.filter === 'active') {
                                    filteredTasks = tasks[el.id].filter(task => !task.isDone)
                                }
                                if (el.filter === 'completed') {
                                    filteredTasks = tasks[el.id].filter(task => task.isDone)
                                }

                                return (
                                    <Paper elevation={3} sx={{p: 1, m: 1}}>
                                        <TodolistItem
                                            key={el.id}
                                            todoListId={el.id}
                                            title={el.title}
                                            tasks={filteredTasks}
                                            date={'1.201'}
                                            deleteTask={deleteTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            filter={el.filter}
                                            changeTaskStatus={changeTaskStatus}
                                            deleteTodolist={deleteTodolist}
                                            updateTaskTitle={updateTaskTitle}
                                            updateTodoListTitle={updateTodoListTitle}
                                        />
                                    </Paper>

                                )
                            })}
                        </Grid>
                    </div>
                </Container>
            </ThemeProvider>


        )
    }


    export default App


// брать импорт конкретно с документации компоненты mui