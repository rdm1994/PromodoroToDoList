import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { connect } from 'react-redux'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        zIndex: 1000
    },
}));

function CustomSnackbar({ toasts }: any) {
    const classes = useStyles({});
    const [open, setOpen] = React.useState(false);
    const [toast, setToast] = React.useState<Toast>({ message: '', severity: 'success'});

    React.useEffect(() => {
        if(toasts && toasts.length > 0) {
            setToast([...toasts].pop());
            setOpen(true);
        }
    }, [toasts])

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={toast.severity}>
                    {toast && toast.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default connect((store: any) => {
    return {
        toasts: store.toasts.toasts,
    }
})(CustomSnackbar)

export interface Toast {
    message: String,
    severity: Color,
}