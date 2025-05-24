import {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type Props = {
    addItem: (title: string) => void,

}


export const AddItemForm = ({addItem}: Props) => {

    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {

        if (itemTitle.trim() !== '') {
            addItem(itemTitle.trim())
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const ChangeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // записываем локальный стейт
        setItemTitle(e.currentTarget.value)
    }


    const addItemHandlerOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    const styles = {
        backgroundColor: 'blue',
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px',
        marginLeft: '5px'
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       variant="outlined"
                       value={itemTitle}
                       // helperText={error}
                       label={error? 'Title is required' : "Type something"}
                       onKeyDown={addItemHandlerOnEnter}
                       onChange={ChangeItemTitleHandler}
                       error={!!error}  // !! превращат строку в булеан
                       size="small"/>

            {/*<input*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*    value={itemTitle}*/}
            {/*    onKeyDown={addItemHandlerOnEnter}*/}
            {/*    onChange={ChangeItemTitleHandler}*/}
            {/*/>*/}
            <Button
                variant="contained"
                size="small"
                onClick={addItemHandler}
                style={styles}
            >+</Button>
            {/*"=условный рендеринг*/}
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    )
}

// брать импорт конкретно с документации компоненты mui