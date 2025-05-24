import {SxProps} from 'react/jsx-runtime';

export const filterButtonContanerSx: SxProps = {
    display: 'flex', justifyContent: 'space-between'
}

export const getListenitemsSx = (isDone: boolean): SxProps => {
    return {
        p: 0,
        justifyContent: 'space-between',
        opacity:isDone ? 0.5 : 1
    }
}


