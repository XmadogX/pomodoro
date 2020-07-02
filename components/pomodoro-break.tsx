import React from 'react';
import {
    Box,
    IconButton,
    Typography
  } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { PomodoroBreakInterface } from '../pages/interfaces'

const Break = (props: PomodoroBreakInterface): JSX.Element => {
    return (
        <Box display="flex" alignItems="center">
            <Typography variant="h6" gutterBottom>Длина Отдыха:</Typography>
            <Box p={1}>
                <IconButton onClick={props.decrementBreak} color="inherit" aria-label="directions">
                    <RemoveIcon />
                </IconButton>
            </Box>
            <div>
                <Typography style={{ width: '100%' }} variant="h6" gutterBottom>{props.breakLength}</Typography>
            </div>
            <Box p={1}>
                <IconButton onClick={props.incrementBreak} color="inherit" aria-label="directions">
                    <AddIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Break;