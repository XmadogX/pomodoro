import * as React from 'react'
import { PomodoroItemInterface } from '../pages/interfaces'
import {
  Typography,
  TextField,
  IconButton,
  ListItemText,
  Box,
  Divider
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import CheckIcon from '@material-ui/icons/Check'

const PomodoroItem = (props: PomodoroItemInterface) => {
  return (
    <>
    
      <Box>
      <IconButton onClick={() =>props.handlePomodoroComplete(props.pomodoro.id, new Date)} color="primary" aria-label="directions">
        <CheckIcon />
      </IconButton>
      </Box>
      <ListItemText style={{ paddingRight: '10px' }}>
        <TextField
          fullWidth
          value={props.pomodoro.text} 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handlePomodoroUpdate(event, props.pomodoro.id)} 
          label="Описание" 
          variant="outlined" 
        />
      </ListItemText>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => props.pomodoro.value > 1 && props.minusPomodoro(props.pomodoro.id, 1)} color="inherit" aria-label="directions">
          <RemoveIcon />
        </IconButton>
        <Typography variant="h6">{props.pomodoro.value}</Typography>
        <IconButton onClick={() => props.plusPomodoro(props.pomodoro.id, 1)} color="inherit" aria-label="directions">
          <AddIcon />
        </IconButton>
      </Box>
      <Box>
        <IconButton onClick={() =>props.handlePomodoroRemove(props.pomodoro.id)} color="secondary" aria-label="directions">
          <CloseIcon />
        </IconButton>
      </Box>
    <Divider/>
    </>
  )
}

export default PomodoroItem
