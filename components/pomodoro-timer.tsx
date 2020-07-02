import * as React from 'react'
import { PomodoroTimerInterface } from '../pages/interfaces'
import PomodoroSession from './pomodoro-session'
import PomodoroBreak from './pomodoro-break'
import {
  Box,
  Button,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
let myAudio: any;
const PomodoroTimer  = (props: PomodoroTimerInterface): JSX.Element =>  {
  const [sessionLength, setSessionLength] = React.useState<number>(25);
  const [breakLength, setBreakLength] = React.useState<number>(5);
  const [timerLabel, setTimerLabel] = React.useState<string>('Работа');
  const [secondsLeft, setSecondsLeft] = React.useState<number>(25 * 60);
  const [timerRunning, setTimerRunning] = React.useState<boolean>(false);
  const classes = useStyles();

  const incrementSession = (): void => {
    if (!timerRunning && sessionLength < 60){
      setSessionLength(sessionLength + 1)
      setSecondsLeft((sessionLength + 1) * 60);
    }
  }
  const decrementSession = (): void => {
    if (!timerRunning && sessionLength > 1) {
      setSessionLength(sessionLength - 1)
      setSecondsLeft((sessionLength - 1) * 60);
    }
  }
  const incrementBreak = (): void => {
    if (!timerRunning && breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  }
  const decrementBreak = (): void => {
    if (!timerRunning && breakLength > 1) {
      setBreakLength(breakLength - 1)
    }
  }
  let minutes:number = Math.floor(secondsLeft / 60);
  let seconds:number = secondsLeft % 60;
  let countdown:number;
  React.useEffect ((): void => {
    myAudio = new Audio('ride.wav')
  }, [])
  React.useEffect(() => {
      const handleSwitch = () => {
          if (timerLabel === 'Работа') {
              myAudio.play()
              props.handlePomodoroComplete(props.pomodoro.id ,new Date)
              setTimerLabel('Отдых');
              setSecondsLeft(breakLength * 60);
          } else if (timerLabel === 'Отдых') {
              setTimerLabel('Работа');
              setSecondsLeft(sessionLength * 60);
          }
      }
      if (timerRunning && secondsLeft > 0) {
          countdown = window.setInterval(() => {
              setSecondsLeft(secondsLeft - 1);
          }, 1000);
      } else if (timerRunning && secondsLeft === 0) {
          countdown = window.setInterval(() => {
              setSecondsLeft(secondsLeft - 1);
          }, 1000);
          handleSwitch();
      } else {
          clearInterval(countdown);
      }
      return (): void =>  { return clearInterval(countdown);}
  },
  [timerRunning, secondsLeft, timerLabel, breakLength, sessionLength]);
  
  const handleStart = (): void => {
      setTimerRunning(true);
  }
  
  const handleStop = (): void => {
      setTimerRunning(false);
  }
  
  const handleReset = (): void => {
      setSessionLength(25);
      setBreakLength(5);
      setSecondsLeft(25 * 60);
      setTimerLabel('Работа');
      setTimerRunning(false);
  }

  return (
      <Box display="flex">
          <div style={{ width: '400px'}}>
            <Typography variant="h3" component="h3">{timerLabel}</Typography>
              <Typography variant="h1" component="h2">
                  {minutes < 10 ? ("0" + minutes).slice(-2) : minutes}:{seconds < 10 ? ("0" + seconds).slice(-2) : seconds}
              </Typography>
              <div className={classes.root}>
                <Button disabled={!props.pomodoro} style={{ width: '120px'}} onClick={timerRunning ? handleStop : handleStart} variant="contained" color={timerRunning ? 'secondary' : 'primary'}>
                  {timerRunning ? 'Остановить' : 'Начать'}
                </Button>
                <Button style={{ width: '120px'}} onClick={handleReset} variant="outlined" color="primary">
                  Сбросить
                </Button>
              </div>
          </div>
          <div style={{ width: '100%', marginLeft: '40px' }}>
            <Box display="flex" justifyContent="space-between">
              <div>
                <PomodoroSession
                sessionLength={sessionLength}
                incrementSession={incrementSession}
                decrementSession={decrementSession}
                />
              </div>
              <div>
                <PomodoroBreak
                breakLength={breakLength}
                incrementBreak={incrementBreak}
                decrementBreak={decrementBreak}
                />
              </div>
            </Box>
            <div>
              <Typography variant="h6">Описание:{props.pomodoro? props.pomodoro.text : ''}</Typography>
            </div>
          </div>
      </Box>
  )
}

export default PomodoroTimer
