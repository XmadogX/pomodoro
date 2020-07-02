import * as React from 'react'
import shortid from 'shortid'
import {PomodoroInterface, PomodoroFormInterface} from '../pages/interfaces'
import {
  Divider,
  TextField,
  IconButton,
  Box
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const PomodoroForm = (props: PomodoroFormInterface) => {

  const [formState, setFormState] = React.useState<string>('')
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState(event.target.value)
  }
  function handleButton() {
    if (formState) {
      const newPomodoro: PomodoroInterface = {
        id: shortid.generate(),
        text: formState,
        value: 1
      }
      props.handlePomodoroCreate(newPomodoro)
      setFormState('')
    }
  }

  return (
    <Box display="flex" justifyContent="center" p={1}>
      <Box width="100%" p={1}>
        <TextField
          fullWidth
          label="Короткое описание"
          value={formState}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => handleInputChange(event)}
        />
      </Box>
      <Box flexShrink={0} p={1}>
        <Divider  orientation="vertical" />
      </Box>
      <Box flexShrink={0} p={1}>
        <IconButton onClick={() => handleButton()} color="primary" aria-label="directions">
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default PomodoroForm
