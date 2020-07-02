
export interface PomodoroInterface {
  id: string;
  text: string;
  value: number;
}
export interface completedPomodorosInterface {
  text: string;
  time: Date;
}

export interface PomodoroFormInterface {
  pomodoros: PomodoroInterface[];
  handlePomodoroCreate: (pomodoro: PomodoroInterface) => void;
}

export interface PomodoroListInterface {
  handlePomodoroUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handlePomodoroRemove: (id: string) => void;
  handlePomodoroComplete: (id: string, time: Date) => void;
  plusPomodoro: (id: string, value: number) => void;
  minusPomodoro: (id: string, value: number) => void;
  handlePomodoroBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setPomodoros: (pomodoros: PomodoroInterface[]) => void;
  pomodoros: PomodoroInterface[];
  completedPomodoros: completedPomodorosInterface[];
}

export interface PomodoroItemInterface {
  handlePomodoroUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handlePomodoroRemove: (id: string) => void;
  handlePomodoroComplete: (id: string, time: Date) => void;
  plusPomodoro: (id: string, value: number) => void;
  minusPomodoro: (id: string, value: number) => void;
  handlePomodoroBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pomodoro: PomodoroInterface;
}
export interface PomodoroTimerInterface {
  pomodoro: PomodoroInterface;
  handlePomodoroComplete: (id: string, time: Date) => void;
}
export interface PomodoroSessionInterface {
  sessionLength: number,
  incrementSession: () => void,
  decrementSession: () => void
}
export interface PomodoroBreakInterface {
  breakLength: number,
  incrementBreak: () => void,
  decrementBreak: () => void
}