//React
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Task, { TaskType } from './Task'
import CreateTask from './CreateTask';
import TeamList from './TeamList';
//Firebase
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import { flatten } from 'lodash'
//MUI
import clsx from 'clsx'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import UserIcon from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'



const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        divider: {
            marginBottom: 5,
        },
        content: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        card: {
            maxWidth: 345,
            margin: theme.spacing(3),
        },
    }),
);

function MainBoard({ firebase, tasks, teams, userName, userId, ttask }: { firebase: any, tasks: any, teams: any, userName: string, userId: string, ttask: any }) {
    const [dateFilter, setDateFilter] = useState<any>(null);
    const [teamFilter, setTeamFilter] = useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState('');

    useEffect(() => { console.log(ttask)}, [ttask]);

    const openAnchor = Boolean(anchorEl);
    const classes = useStyles();
    const theme = useTheme();

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    function handleOnMenuClose() {
        setAnchorEl(null);
    }

    function handleOnCLickDateFilter() {
        setDateFilter(new Date());
        setSelectedMenu('Today');
    }

    function handleOnCLickDateFilterYesterday() {
        setDateFilter(new Date(Date.now() - 86400000));
        setSelectedMenu('Yesterday');
    }

    function handleOnCLickNoDateFilter() {
        setDateFilter(null);
        setSelectedMenu('');
    }

    function handleOnCLickMyTeam(teamId: string) {
        !teamFilter ? setTeamFilter(teamId) : setTeamFilter('');
    }

    function handleMenuOnClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleLogOut() {
        setAnchorEl(null);
        firebase.logout();
    }

    function filterTasks(task: TaskType) {
        if (teamFilter) { 
            if (task.userId !== teamFilter) return false; else return true;
        }
        if (!dateFilter) return true;
        const taskDate = task.timestamp.toDate();
        if (taskDate.getFullYear() === dateFilter.getFullYear() &&
            taskDate.getMonth() === dateFilter.getMonth() &&
            taskDate.getDate() === dateFilter.getDate()
        ) {
            return true;
        }
        return false;
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        TEAM TOMATO
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Typography
                        component='h4'
                        paragraph={true}
                        align='center'
                        color='primary'
                    >
                        YOUR PROFILE
                    </Typography>
                    <ListItem button onClick={handleMenuOnClick}>
                        <ListItemIcon><UserIcon /></ListItemIcon>
                        <ListItemText primary={userName} />
                    </ListItem>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={openAnchor}
                        onClose={handleOnMenuClose}
                        PaperProps={{
                            style: {
                                width: 200,
                            },
                        }}
                    >
                        <MenuItem onClick={handleLogOut}>
                            Log Out
                        </MenuItem>
                    </Menu>
                    <MenuItem
                        button
                        onClick={handleOnCLickDateFilter}
                        key={"Today"}
                        selected={selectedMenu === 'Today'}
                    >
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={"Today"} />
                    </MenuItem>
                    <MenuItem
                        button
                        onClick={handleOnCLickDateFilterYesterday}
                        key={"Yesterday"}
                        selected={selectedMenu === 'Yesterday'}
                    >
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={"Yesterday"} />
                    </MenuItem>
                    <MenuItem id="Any time" button onClick={handleOnCLickNoDateFilter} key={"Any time"}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={"Any time"} />
                    </MenuItem>
                    <Divider className={classes.divider} />
                    <Typography
                        component='h4'
                        paragraph={true}
                        align='center'
                        color='primary'
                    >
                        TEAMS
                        </Typography>
                    <TeamList OnClickMyTeam={handleOnCLickMyTeam} teamList={teams} />
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {
                    (tasks) ? tasks.filter(filterTasks).sort((a: TaskType, b: TaskType) => {
                        return b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime();
                    }).map((task: any, index: number) => (
                        <Task taskId={task.id} key={task.id} task={task}/>
                    )) : (
                            <Typography paragraph>Loading...</Typography>
                        )
                }
                <CreateTask teamId={teamFilter} />
            </main>
        </div>
    );
}

export default compose(
    connect((store: any) => {
        console.log('=========store============');
        console.log(store);
        return {
            // if we have teams we merge user's task array with all teams' task arrays. Else we just return user's tasks array
            tasks: store.firestore.ordered.teams ? 
                store.firestore.ordered.tasks.concat(
                    flatten(
                        store.firestore.ordered.teams.map((x: any) => {
                            return store.firestore.ordered[`tasks${x.id}`] ? store.firestore.ordered[`tasks${x.id}`] : [];
                }))) 
                : store.firestore.ordered.tasks,
            
            ttask: store.firestore.ordered.teams ? flatten(store.firestore.ordered.teams.map((x: any) => {
                return store.firestore.ordered[`tasks${x.id}`] ? store.firestore.ordered[`tasks${x.id}`] : {};
            })) : null,

            teams: store.firestore.ordered.teams,
            userName: store.firebase.auth.displayName,
            userId: store.firebase.auth.uid,
        }
    }),
    firestoreConnect(({ userId }: any) => {
        if (!userId) return [];
        return [{
            collection: 'teams',
            where: ['users', 'array-contains', userId]
        }]
    }),
    firestoreConnect(({ userId }: any) => {
        if (!userId) return [];
        return [{
            collection: 'tasks',
            where: ['userId', '==', userId]
        }]
    }),
    firestoreConnect(({ teams }: any) => {
        if (!teams) return [];
        console.log('============fireStoreConnect firestore================');
        console.log(teams);
        /*
        if(firestore.ordered.teams) return [{
            collection: 'tasks',
            where: ['userId', '==', firestore.ordered.teams[0].id]
        }];
        */
        let ids = teams.map((team: any) => team.id);
        console.log(ids);
        let res = ids.map((id: any, index: number) => ({
            collection: 'tasks',
            where: ['userId', '==', id],
            storeAs: `tasks${id}`,
        }));
        console.log(res);
        return res;
    }),
)(MainBoard)