import {FilterValues} from './App.tsx';
import {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm.tsx';
import EditableSpan from './EditableSpan.tsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {filterButtonContanerSx, getListenitemsSx} from './Todolist.styles.ts';

type TodolistItemType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    date?: string
    deleteTask: (todoListId: string, taskId: string,) => void
    changeFilter: (todoListId: string, filter: FilterValues) => void;
    addTask: (todoListId: string, title: string) => void;
    filter: FilterValues
    changeTaskStatus: (todoListId: string, taskId: string, taskStatus: boolean) => void;
    deleteTodolist: (todoListId: string) => void
    updateTaskTitle: (todoListId: string, taskId: string, updateTitle: string) => void,
    updateTodoListTitle: (todoListId: string, updateTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}


export const TodolistItem = (props: TodolistItemType) => {
    const {
        todoListId,
        title,
        tasks,
        date,
        deleteTask,
        changeFilter,
        addTask,
        filter,
        changeTaskStatus,
        deleteTodolist,
        updateTaskTitle,
        updateTodoListTitle

    } = props
    // const [taskTitle, setTaskTitle] = useState('')
    // const[error, setError] = useState<string | null>(null)


    // Todo:перенести условие
    // let filteredTasks = tasks
    // if (el.filter === 'active') {
    //     filteredTasks = tasks.filter(task => !task.isDone)
    // }
    // if (el.filter === 'completed') {
    //     filteredTasks = tasks.filter(task => task.isDone)
    // }


    // const createTaskHandler = () => {
    //     const trimeTitle = taskTitle.trim()
    //     if(trimeTitle !==''){
    //         cteateTask( trimmedTitle ,todoListId, taskTitle)
    //         setTaskTitle('')
    //     } else {
    //         setError('Title is required')
    //     }
    //
    // }

    // const ChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTaskTitle(e.currentTarget.value)
    // }

    // const CreateTaskHandlerOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null)
    //     if (e.key === 'Enter') {
    //         createTaskHandler()
    //     }
    // }

    const deleteTodolistHandler = () => {
        deleteTodolist(todoListId)
    }

    const ChangeFilterHandler = (filter: FilterValues) => {
        changeFilter(todoListId, filter)
    }

    const addTaskHandler = (title: string) => {
        addTask(title, todoListId)
    }

    const updateTodoListTitleHandler = (updateTitle: string) => {
        updateTodoListTitle(todoListId, updateTitle)
    }

    const updateTaskTitleHandler = (taskId: string, updateTitle: string,) => {
        updateTaskTitle(todoListId, taskId, updateTitle)
    }

    const stylesBtn = {
        marginLeft: '2px',
    }

    return (
        <div>
            <IconButton aria-label="delete"
                        onClick={deleteTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
            <EditableSpan
                oldTitle={title}
                onClick={updateTodoListTitleHandler}/>
            <AddItemForm addItem={addTaskHandler}/>
            {/*<div>*/}
            {/*<input className={error? "error": ""}*/}
            {/*    value={taskTitle}*/}
            {/*    onKeyDown={CreateTaskHandlerOnEnter}*/}
            {/*    onChange={ChangeTaskTitleHandler}/>*/}
            {/*<Button title={'+'} onClick={createTaskHandler}/>*/}
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
            {/*</div>*/}
            {tasks.length === 0 ? (
                <p>Tasks is not </p>
            ) : (
                <List>
                    {tasks.map(t => {
                        const deleteTaskHandler = () => {
                            deleteTask(todoListId, t.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatus = e.currentTarget.checked
                            changeTaskStatus(todoListId, t.id, newStatus)
                        }

                        // const updateTaskTitleHandler = (updateTitle: string) => {
                        //     updateTaskTitle(todoListId, t.id, updateTitle)
                        // }

                        return (
                            <ListItem key={t.id}
                                      sx={getListenitemsSx(t.isDone)}
                            >
                                <Box style={{display:"flex",justifyContent:"space-between"}}>
                                    <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                    {/*<input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>*/}
                                    {/*<span>{t.title}</span>*/}

                                    <EditableSpan oldTitle={t.title} onClick={(updateTitle) => {
                                        updateTaskTitleHandler(t.id, updateTitle)
                                    }}/>
                                </Box>



                                <IconButton aria-label="delete"
                                            onClick={deleteTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}


            <Box sx={filterButtonContanerSx}>

                <Button variant={filter === 'all' ? 'outlined' : 'contained'} style={stylesBtn} color="success"
                        onClick={() => ChangeFilterHandler('all')}>All</Button>
                <Button variant={filter === 'active' ? 'outlined' : 'contained'} color="error"
                        onClick={() => ChangeFilterHandler('active')}>Active</Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'contained'} color="secondary"
                        onClick={() => ChangeFilterHandler('completed')}>Completed</Button>

                <div><span>{date}</span></div>

            </Box>
        </div>
    )
}