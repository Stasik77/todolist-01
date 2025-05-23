import {Button} from './Button.tsx';
import {FilterValues} from './App.tsx';
import {ChangeEvent, useState} from 'react';
import {AddItemForm} from './AddItemForm.tsx';


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
    deleteTodolist:(todoListId: string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}


export const TodolistItem = (props: TodolistItemType) => {
    const {todoListId, title, tasks, date, deleteTask, changeFilter, addTask, filter,changeTaskStatus,deleteTodolist} = props
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

const addTaskHandler =(title:string)=>{
    addTask(title,todoListId)
    }

    return (
        <div>
            <Button title="x" onClick={deleteTodolistHandler}/>
            <h3>{title}</h3>
            <AddItemForm addItem={addTaskHandler}  />
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
                <ul>
                    {tasks.map(t => {
                        const deleteTaskHandler = () => {
                            deleteTask(todoListId, t.id)
                        }

                        const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            const newStatus = e.currentTarget.checked
                            changeTaskStatus(todoListId,t.id,newStatus)
                        }
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{t.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}


            <div>
                <Button title={'All'} onClick={() => ChangeFilterHandler('all')}/>
                <Button title={'Active'} onClick={() => ChangeFilterHandler('active')}/>
                <Button title={'Completed'} onClick={() => ChangeFilterHandler('completed')}/>
                <div><span>{date}</span></div>

            </div>
        </div>
    )
}