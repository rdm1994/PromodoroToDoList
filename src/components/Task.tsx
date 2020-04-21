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
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { red } from '@material-ui/core/colors'
import PopperJs from 'popper.js'
import { firestore } from 'firebase';
import { deleteTask, setTaskTotalTime, setTaskDone } from '../redux/actions/taskActions'

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
    userPhoto,
    deleteTask,
    setTotalTime,
    setTaskDone,
    taskId,
}: {
    task: TaskType,
    userName: string,
    userPhoto: string,
    deleteTask: any,
    setTotalTime: any,
    setTaskDone: any,
    taskId: string
}) {
    const [offset, setOffset] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timeInterval, setTimeInterval] = useState<any>();
    const [duration, setDuration] = useState(20);
    console.log('==========task============')
    console.log(task);
    //MIU declarations
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const radius = 86;

    function togleTimer() {
        if (!timeInterval) startTimer()
        else stopTimer();
    }

    function startTimer() {
        if(task.done) return;
        let timer = duration;
        if (minutes !== 0 || seconds !== 0) timer = minutes * 60 + seconds;

        setMinutes(Math.floor(timer / 60));
        setSeconds(Math.round(timer % 60));

        let interval = (setInterval(() => {
            let i = (radius * 2 * Math.PI) - (timer / duration) * (radius * 2 * Math.PI);
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
        setTimeInterval(null);
    }

    function clearTimer() {
        clearInterval(timeInterval);
        setTimeInterval(null);
        setMinutes(0);
        setSeconds(0);
        setOffset(0);
    }

    function handleDelete() {
        deleteTask(taskId);
        setAnchorEl(null);
    }

    function handleOnChangeDuration(e: any, value: any) {
        setDuration(value);
    }

    function handleSetTaskDone() {
        setTaskDone(taskId, !task.done);
        clearTimer();
        setAnchorEl(null);
    }

    //MUI function
    function handleMenuOnClose() {
        setAnchorEl(null);
    }

    function ValueLabelComponent(props: any) {
        const { children, open, value } = props;

        const popperRef = React.useRef<PopperJs | null>(null);
        React.useEffect(() => {
            if (popperRef.current) {
                popperRef.current.update();
            }
        });

        return (
            <Tooltip
                PopperProps={{
                    popperRef,
                }}
                open={open}
                enterTouchDelay={0}
                placement="top"
                title={value}
            >
                {children}
            </Tooltip>
        );
    }

    function handleMenuOnClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    return (
        <Card className={classes.card} key={taskId}>
            <CardHeader
                avatar={
                    <Avatar
                        aria-label="user"
                        className={classes.avatar}
                        src={userPhoto}
                    >
                        U
                    </Avatar>
                }
                action={
                    <div>
                        <IconButton
                            aria-label="settings"
                            onClick={handleMenuOnClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleMenuOnClose}
                            PaperProps={{
                                style: {
                                    width: 300,
                                },
                            }}
                        >
                            <MenuItem onClick={handleSetTaskDone}>
                                Mark as {(task.done) ? 'undone' : 'done'}
                            </MenuItem>
                            <MenuItem onClick={handleDelete}>
                                Delete Task
                            </MenuItem>
                            <div style={{ padding: 16 }}>
                                <Typography
                                    gutterBottom
                                >Set timer</Typography>
                                <Slider
                                    ValueLabelComponent={ValueLabelComponent}
                                    aria-label="custom thumb label"
                                    defaultValue={20}
                                    min={5}
                                    max={30}
                                    onChange={handleOnChangeDuration}
                                />
                            </div>
                        </Menu>
                    </div>
                }
                title={userName}
                subheader={formatDate(task.timestamp)}
            />
            <CardActionArea onClick={togleTimer}>

                <svg
                    className={classes.progressRing}
                    width="200"
                    height="200">
                    <g>
                        <circle
                            className={classes.progressRingCircle}
                            stroke={(task.done) ? 'grey' : 'rgb(0,0,255)'}
                            strokeWidth="4"
                            fill="transparent"
                            r={radius}
                            cx="100"
                            cy="100"
                            strokeDasharray={(radius * 2 * Math.PI) + ' ' + (radius * 2 * Math.PI)}
                            strokeDashoffset={offset} />
                        <text
                            x="100"
                            y="100"
                            textAnchor="middle"
                            fontFamily="Verdana"
                            fontSize="15"
                            fill="black">
                            {(minutes < 10) ? "0" + minutes : minutes}:{(seconds < 10) ? "0" + seconds : seconds}
                        </text>
                    </g>
                </svg>
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" 
                    color={(task.done)? 'textSecondary' : 'textPrimary'}
                >
                    {task.taskName}
                </Typography>
                <Typography component="p" 
                    color={(task.done)? 'textSecondary' : 'primary'}
                >
                    Total time: {task.totalTime}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {task.description} 
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" 
                    onClick={togleTimer}
                    disabled={task.done}
                >
                    { (!timeInterval)? 'Start' : 'Stop'}
                </Button>
                <Button size="small" color="primary" 
                    onClick={clearTimer}
                    disabled={task.done}
                >
                    Clear
                </Button>
            </CardActions>
        </Card>
    )
}

export default
    connect(({ firestore: { data }, firebase: { auth } }: { firestore: any, firebase: any }, props: any) => ({
        //task: data.tasks && data.tasks[props.taskId],
        userName: (data.teams && data.teams[props.task.userId] && data.teams[props.task.userId].name ) || auth.displayName,
        userPhoto: auth.photoURL,
    }), (dispatch: any) => {
        return {
            deleteTask: (taskId: string) => dispatch(deleteTask(taskId)),
            setTotalTime: (taskId: string, timeToAdd: number) => {
                return dispatch(setTaskTotalTime(taskId, timeToAdd));
            },
            setTaskDone: (taskId: string, done: boolean) => {
                return dispatch(setTaskDone(taskId, done));
            }
        }
    })(Task);

export interface TaskType {
    taskName: string,
    description: string,
    timestamp: firestore.Timestamp,
    totalTime: number,
    userId: string,
    done: boolean,
}