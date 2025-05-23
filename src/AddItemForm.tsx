import {Button} from './Button.tsx';
import {ChangeEvent, useState} from 'react';

type Props = {
    addItem: (title: string) => void,

}


export const AddItemForm = ({addItem}: Props) => {

    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {

        if ( itemTitle.trim() !== '') {
            addItem( itemTitle.trim())
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

    return (
        <div>
            <input
                className={error? "error" : ''}
                value={itemTitle}
                onKeyDown={addItemHandlerOnEnter}
                onChange={ChangeItemTitleHandler}
            />
            <Button title={'+'} onClick={addItemHandler}/>
            {/*"=условный рендеринг*/}
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}
