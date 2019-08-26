import React, { useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'

import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { red } from '@material-ui/core/colors'

import { firestore } from 'firebase';
import { deleteTask, setTaskTotalTime } from '../redux/actions/taskActions'

const useStyles = makeStyles(theme =>
    createStyles({
        card: {
            minWidth: 330,
            maxWidth: 330,
            margin: theme.spacing(3),
        },
        avatar: {
            backgroundColor: red[500],
        },
        progressRing: {
            margin: "10px auto 10px 60px",
        },
        progressRingCircle: {
            transition: "0.35s stroke-dashoffset",
            // axis compensation
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
        }
    })
);

const formatDate = (timeStamp: firestore.Timestamp) => {
    const date = timeStamp.toDate();
    const days = (date.getDate() > 10) ? (date.getDate()) : ("0" + date.getDate());
    const months = (date.getMonth() > 10) ? (date.getMonth()) : ("0" + date.getMonth());
    return days + '.' + months + '.' + date.getFullYear();
}

function Task({
    task,
    userName,
    deleteTask,
    setTotalTime,
    taskId,
}: { 
    task: TaskType,
    userName: string,
    deleteTask: any, 
    setTotalTime: any, 
    taskId: string
}) {
    const [offset, setOffset] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timeInterval, setTimeInterval] = useState();
    const classes = useStyles();
    const radius = 86;

    function startTimer() {
        const duration = 20;
        let timer = duration;
        if (minutes !== 0 || seconds !== 0) timer = minutes * 60 + seconds;

        let interval = (setInterval(() => {
            let i = (radius*2*Math.PI) - (timer / duration) * (radius*2*Math.PI);
            setOffset(i);
            setMinutes(Math.floor(timer / 60));
            setSeconds(Math.round(timer % 60));

            if (--timer === -1) {
                clearTimer();
                clearInterval(interval);
                setTotalTime(taskId, task.totalTime + duration);
            }
        }, 1000));
        setTimeInterval(interval);
    }

    function stopTimer() {
        console.log(timeInterval);
        clearInterval(timeInterval);
    }

    function clearTimer() {
        clearInterval(timeInterval);
        setMinutes(0);
        setSeconds(0);
        setOffset(0);
    }

    function handleDelete() {
        deleteTask(taskId);
    }

    return (
        <Card className={classes.card} key={taskId}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>R</Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={userName}
                subheader={formatDate(task.timestamp)}
            />
            <CardActionArea>

                <svg
                    className={classes.progressRing}
                    width="200"
                    height="200">
                    <g>
                        <circle
                            className={classes.progressRingCircle}
                            stroke="red"
                            strokeWidth="4"
                            fill="transparent"
                            r={radius}
                            cx="100"
                            cy="100" 
                            strokeDasharray={(radius*2*Math.PI) + ' ' + (radius*2*Math.PI)}
                            strokeDashoffset={offset}/>
                        <text
                            x="100"
                            y="100"
                            textAnchor="middle"
                            fontFamily="Verdana"
                            fontSize="15"
                            fill="black">
                            {minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
                        </text>
                    </g>
                </svg>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {task.taskName}
                    </Typography>
                    <Typography component="p">
                        Total time: {task.totalTime}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {task.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={startTimer}>
                    Start
                </Button>
                <Button size="small" color="primary" onClick={stopTimer}>
                    Stop
                </Button>
                <Button size="small" color="primary" onClick={clearTimer}>
                    Clear
                </Button>
                <Button size="small" color="primary" onClick={handleDelete}>
                    delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default
    connect(({ firestore: { data }, firebase: { auth }}: {firestore: any, firebase: any}, props: any) => ({
        task: data.tasks && data.tasks[props.taskId],
        userName: auth.displayName,
    }), (dispatch: any) => {
        return {
            deleteTask: (taskId: string) => dispatch(deleteTask(taskId)),
            setTotalTime: (taskId: string, timeToAdd: number) => { 
                return dispatch(setTaskTotalTime(taskId, timeToAdd)); 
            }
        }
    })(Task);

interface OwnProps {
    taskId: string,
    key: number
}

export interface TaskType {
    taskName: string,
    description: string,
    timestamp: firestore.Timestamp,
    totalTime: number,
    userId: string
}