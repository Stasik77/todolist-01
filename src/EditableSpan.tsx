import {ChangeEvent, useState} from 'react';


type Props = {
    oldTitle: string,
    onClick: (updateTitle: string) => void,
}

export const EditableSpan = ({oldTitle,onClick}: Props) => {
    const [edit, setEdit] = useState(false)
    const [updateTitle, setUpdateTitle] = useState(oldTitle)


    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            onClick(updateTitle)
        }
    }

    const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }


    return (
        edit
            ? <input
                value={updateTitle}
                onBlur={editHandler} // чтобы выбрать при нажатии мимо
                autoFocus //автофокус для появления собачки для печатания после двойного нажатия

                onChange={updateTitleHandler}
            />
            : <span onDoubleClick={editHandler}>{oldTitle}</span>
    )
}
export default EditableSpan;