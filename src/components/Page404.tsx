import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    container: {
        padding: 10,
    },
    button: {
        marginTop: 10,
    }
}))

export const Page404 = ({ history }: { history: any }) => {
    const classes = useStyles();

    const handleOnClick = () => {
        history.push('/');
    }
    return (
        <Box
            className={classes.container}
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Typography variant="h4" noWrap align='center'>
                PAGE NOT FOUND! SORRY <span role="img" aria-label="sad">😢</span>
            </Typography>
            <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleOnClick}
            >
                Go Back to main page
            </Button>
        </Box>
    )
}

export default Page404;