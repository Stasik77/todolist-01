import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';

type MenuButtonProps = {
    background?: string;
}

// export const MenuButton =styled(Button)<MenuButtonProps>(({background,theme})=>
//     (
//     {
//         fontWeight: 'bold',
//         boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
//         borderRadius: '2px',
//         margin: ' 0 5px',
//         padding: '8 25px',
//         color: 'white',
//         background: background ||  'blue'
//
//     }
// ))

export const MenuButton =styled(Button)<MenuButtonProps>(({background,theme})=>
    (
        {
            fontWeight: 'bold',
            boxShadow: `0 0 0 2px rgba(0, 0, 0, 0.2) ${theme.palette.primary.dark}`,
            borderRadius: '2px',
            margin: ' 0 5px',
            padding: '8 25px',
            color: 'white',
            background: background ||  'blue'

        }
    ))