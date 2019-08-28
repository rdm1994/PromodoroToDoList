import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'
import { red } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';

import { createTask as createTaskAction } from '../redux/actions/taskActions';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            mixWidth: 345,
            maxWidth: 330,
            maxHeight: 230,
            margin: theme.spacing(3),
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);

function CreateTask({ createTask }: { createTask: any }) {
    const [task, setTask] = useState({taskName:'', description:''});

    const classes = useStyles();

    function handleCreateTask(e: any) {
        e.preventDefault();
        if (!task) return;
        createTask(task);
        setTask({taskName: '', description: ''});
    }

    function handleOnChange(e: any) {
        e.preventDefault();
        switch (e.target.name) {
            case 'taskName':
                setTask({ ...task, taskName: e.target.value });
                break;
            case 'description':
                setTask({ ...task, description: e.target.value });
                break;
            default:
                return;
        }
    }

    function cancel() {
        setTask({taskName: '', description: ''});
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <TextField
                    id="taskName"
                    name="taskName"
                    label="Task Name"
                    value={task.taskName}
                    onChange={handleOnChange}
                ></TextField>
                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    value={task.description}
                    onChange={handleOnChange}
                ></TextField>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={handleCreateTask}>
                    Create
                </Button>
                <Button size="small" color="secondary" onClick={cancel}>
                    Cancel
                </Button>
            </CardActions>
        </Card>
    );
}

function mapActionsToProps(dispatch: any) {
    return {
        createTask: (task: any) => dispatch(createTaskAction(task))
    }
}

export default connect(null, mapActionsToProps)(CreateTask)
