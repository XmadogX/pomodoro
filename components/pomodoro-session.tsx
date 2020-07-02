import React from 'react';
import {
    Box,
    IconButton,
    Typography
  } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { PomodoroSessionInterface } from '../pages/interfaces'

const Session = (props: PomodoroSessionInterface): JSX.Element => {
    return (
        <Box display="flex" alignItems="center">
            <Typography variant="h6" gutterBottom>Длина Работы:</Typography>
            <Box p={1}>
                <IconButton onClick={props.decrementSession} color="inherit" aria-label="directions">
                    <RemoveIcon />
                </IconButton>
            </Box>
            <div>
            <Typography style={{ width: '100%' }} variant="h6" gutterBottom>{props.sessionLength}</Typography>
            </div>
            <Box p={1}>
                <IconButton onClick={props.incrementSession} color="inherit" aria-label="directions">
                    <AddIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Session;