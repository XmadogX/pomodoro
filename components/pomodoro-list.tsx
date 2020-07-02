import React, { useState } from "react";
import {
  List,
  ListItem,
  Typography,
  Box,
  Divider
} from '@material-ui/core'
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle
} from 'react-beautiful-dnd';
import { 
  PomodoroListInterface,
  PomodoroInterface
 } from '../pages/interfaces'
import moment from 'moment'
import PomodoroItem from './pomodoro-item'

const reorder = (
  list: PomodoroInterface[],
  startIndex: number,
  endIndex: number
): PomodoroInterface[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  padding: grid
});

const PomodoroList = (props: PomodoroListInterface): JSX.Element => {

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    const pomodoros: PomodoroInterface[] = reorder(
      props.pomodoros,
      result.source.index,
      result.destination.index
    );

    props.setPomodoros(pomodoros);
  };
  return (
    <>
    <Typography style={{ width: '100%' }} variant="h6" gutterBottom>Текущии задачи:</Typography>
    <Box display="flex" justifyContent="center">
      <List style={{ width: '100%' }} component="nav">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot): JSX.Element => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {props.pomodoros.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot): JSX.Element => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <PomodoroItem
                          pomodoro={item}
                          handlePomodoroUpdate={props.handlePomodoroUpdate}
                          handlePomodoroRemove={props.handlePomodoroRemove}
                          handlePomodoroComplete={props.handlePomodoroComplete}
                          plusPomodoro={props.plusPomodoro}
                          minusPomodoro={props.minusPomodoro}
                          handlePomodoroBlur={props.handlePomodoroBlur}
                        />
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Box>
    <Divider/>
    <Typography style={{ width: '100%' }} variant="h6" gutterBottom>Выполненные задачи:</Typography>
    <List style={{ width: '100%' }} component="nav">
      {props.completedPomodoros.map((item, index) => (
        <ListItem style={{ width: '100%' }} key={index}>
          <Box style={{ width: '100%' }} display="flex" justifyContent="space-between">
            <div>
              <Typography variant="body1" gutterBottom>{item.text}</Typography>
            </div>
            <div>
              <Typography variant="body1" gutterBottom>{moment(item.time).format('YYYY-MM-DD HH:mm')}</Typography>
            </div>
          </Box>
          <Divider/>
        </ListItem>
      ))}
    </List>
    </>
  );
};

export default PomodoroList
