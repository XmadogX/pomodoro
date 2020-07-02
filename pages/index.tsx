
import * as React from 'react'
import PomodoroTimer from '../components/pomodoro-timer'
import PomodoroForm from '../components/pomodoro-form'
import PomodoroList from '../components/pomodoro-list'
import { PomodoroInterface, completedPomodorosInterface } from './interfaces'


const PomodoroListApp = (): JSX.Element => {
  const [pomodoros, setPomodoros] = React.useState<PomodoroInterface[]>([])
  const [completedPomodoros, setCompletedPomodoros] = React.useState<completedPomodorosInterface[]>([])
  function handlePomodoroCreate(Pomodoro: PomodoroInterface) {
    const newPomodorosState: PomodoroInterface[] = [...pomodoros]
    newPomodorosState.push(Pomodoro)
    setPomodoros(newPomodorosState)
  }
  function handlePomodoroUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
    const newPomodorosState: PomodoroInterface[] = [...pomodoros]
    newPomodorosState.find((pomodoro: PomodoroInterface) => pomodoro.id === id)!.text = event.target.value
    setPomodoros(newPomodorosState)
  }
  function handlePomodoroRemove(id: string) {
    const newPomodorosState: PomodoroInterface[] = pomodoros.filter((pomodoro: PomodoroInterface) => pomodoro.id !== id)
    setPomodoros(newPomodorosState)
  }
  function handlePomodoroComplete(id: string, time: Date) {
    const newPomodorosState: PomodoroInterface[] = [...pomodoros]
    const newCompletedPomodorosState: completedPomodorosInterface[] = [...completedPomodoros]
    const index: number = newPomodorosState.findIndex((pomodoro: PomodoroInterface) => pomodoro.id === id)
    const NewCompletedPomodoro: completedPomodorosInterface = {
      text: newPomodorosState[index].text,
      time: time
    }
    if (newPomodorosState[index].value > 1) {
      newPomodorosState[index].value -= 1
    }
    else {
      newPomodorosState.splice(index, 1)
    }

    newCompletedPomodorosState.splice(0, 0, NewCompletedPomodoro)
    setPomodoros(newPomodorosState)
    setCompletedPomodoros(newCompletedPomodorosState)
  }
  function handlePomodoroBlur(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      event.target.classList.add('Pomodoro-input-error')
    } else {
      event.target.classList.remove('Pomodoro-input-error')
    }
  }
  function plusPomodoro (id: string, value: number) {
    const newPomodorosState: PomodoroInterface[] = [...pomodoros]
    newPomodorosState.find((pomodoro: PomodoroInterface) => pomodoro.id === id)!.value += value
    setPomodoros(newPomodorosState)
  }
  function minusPomodoro (id: string, value: number) {
    console.log('test')
    const newPomodorosState: PomodoroInterface[] = [...pomodoros]
    newPomodorosState.find((pomodoro: PomodoroInterface) => pomodoro.id === id)!.value -= value
    setPomodoros(newPomodorosState)
  }
  return (
    <div  style={{ width: '100%' }}>
      <PomodoroTimer
        pomodoro={pomodoros[0]}
        handlePomodoroComplete={handlePomodoroComplete}
      />

      <PomodoroForm
        pomodoros={pomodoros}
        handlePomodoroCreate={handlePomodoroCreate}
      />

      <PomodoroList
        pomodoros={pomodoros}
        completedPomodoros={completedPomodoros}
        handlePomodoroUpdate={handlePomodoroUpdate}
        handlePomodoroRemove={handlePomodoroRemove}
        handlePomodoroComplete={handlePomodoroComplete}
        plusPomodoro={plusPomodoro}
        minusPomodoro={minusPomodoro}
        handlePomodoroBlur={handlePomodoroBlur}
        setPomodoros={setPomodoros}
      />
    </div>
  )
}

export default (PomodoroListApp)