import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import { createTask as createTaskAction } from '../redux/actions/taskActions';
import { addToast as addToastAction } from '../redux/actions/toastActions'
import { Toast } from './Snackbar'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            width: 330,
            maxHeight: 280,
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
        textField: {
            marginTop: 18,
            marginBottom: 5,
        }
    }),
);

export function CreateTask({
    createTask,
    toast, 
    teamId 
}: { 
    createTask: Function,
    toast: Function,
    teamId: string 
}) {
    const [newTask, setNewTask] = useState({ taskName: '', description: '', userId: teamId });
    const [error, setError] = useState({ taskName: '', description: '', userId: '' });

    useEffect(() => {
        setNewTask(newTask => {
            return { ...newTask, userId: teamId }
        })
    }, [teamId]);

    const classes = useStyles({});

    function handleCreateTask(e: any) {
        e.preventDefault();
        if (error.taskName || error.description) return;
        if (!newTask.taskName || !newTask.description) {
            setError({
                ...error,
                taskName: (!newTask.taskName) ? 'Enter name! ' : '',
                description: (!newTask.description) ? 'Enter description! ' : '',
            });
            toast({message: 'Can\'t create task.', severity: 'error'})
            return;
        }
        createTask(newTask);
        setNewTask({ ...newTask,  taskName: '', description: '' });
    }

    function handleOnChange(e: any) {
        e.preventDefault();
        switch (e.target.name) {
            case 'taskName':
                setNewTask({ ...newTask, taskName: e.target.value });
                if (e.target.value === '')
                    setError({ ...error, taskName: 'Enter name! ' });
                else if (e.target.value.length > 20)
                    setError({ ...error, taskName: 'Name should be less than 20 symbols! ' });
                else
                    setError({ ...error, taskName: '' });
                break;
            case 'description':
                setNewTask({ ...newTask, description: e.target.value });
                if (e.target.value === '')
                    setError({ ...error, description: 'Enter description! ' });
                else if (e.target.value.length > 50)
                    setError({ ...error, description: 'Name should be less than 50 symbols! ' });
                else
                    setError({ ...error, description: '' });
                break;
            default:
                return;
        }
    }

    function cancel() {
        setNewTask({ ...newTask, taskName: '', description: '' });
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <TextField
                    id="taskName"
                    name="taskName"
                    label="Task Name"
                    required={true}
                    error={Boolean(error.taskName)}
                    value={newTask.taskName}
                    onChange={handleOnChange}
                ></TextField>
                {error.taskName && (
                    <FormHelperText id="component-error-text">
                        {error.taskName}
                    </FormHelperText>
                )}
                <TextField
                    className={classes.textField}
                    id="description"
                    name="description"
                    label="Description"
                    required={true}
                    multiline
                    rows={2}
                    error={Boolean(error.description)}
                    value={newTask.description}
                    onChange={handleOnChange}
                ></TextField>
                {error.description && (
                    <FormHelperText id="component-error-text">
                        {error.description}
                    </FormHelperText>
                )}
                <Typography
                    component='h4'
                    paragraph={true}
                    align='center'
                    color='primary'
                >
                    { teamId && 'Task will be created in selected group' }
                </Typography>

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
        createTask: (task: any) => dispatch(createTaskAction(task)),
        toast: (toast: Toast) => dispatch(addToastAction(toast)),
    }
}

export default connect(null, mapActionsToProps)(CreateTask)
