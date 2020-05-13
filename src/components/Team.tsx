import React from 'react'
import { connect } from 'react-redux'
import copy from 'copy-to-clipboard'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import GroupIcon from '@material-ui/icons/Group'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ListIcon from '@material-ui/icons/List'
import DeleteIcon from '@material-ui/icons/Delete'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { deleteTeam as deleteTeamAction } from '../redux/actions/teamActions'
import { addToast as addToastAction } from '../redux/actions/toastActions'
import { Toast } from './Snackbar'
import { useHistory } from "react-router-dom"

export function Team({
    team,
    OnClickMyTeam,
    deleteTeam,
    selected,
    toast,
}: {
    team: any,
    OnClickMyTeam: Function,
    deleteTeam: Function,
    selected: boolean,
    toast: Function,
}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const history = useHistory();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleInvite = () => {
        copy(team.id);
        toast({message: `ID of ${team.name} is copied to buffer.`, severity: 'info'})
        setAnchorEl(null);
    }

    const handleTeammates = () => {
        setAnchorEl(null);
        history.push(`teammates/${team.id}`);
    }

    const handleDelete = () => {
        deleteTeam(team.id);
        setAnchorEl(null);
    };

    if (!team) return <ListItem><Typography>team loading...</Typography></ListItem>;

    return (
        <ListItem
            id={team.id}
            button
            onClick={() => OnClickMyTeam(team.id)}
            key={team.id}
            selected={selected}
        >
            <ListItemIcon>
                <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={team.name} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments" onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleInvite}>
                        <ListItemIcon>
                            <GroupAddIcon fontSize="small" />
                        </ListItemIcon>
                        Invite to team
                    </MenuItem>
                    <MenuItem onClick={handleTeammates}>
                        <ListItemIcon>
                            <ListIcon fontSize="small" />
                        </ListItemIcon>
                        Show teammates
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        Delete me from team
                    </MenuItem>
                </Menu>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default
    connect(null, (dispatch: any) => {
        return {
            deleteTeam: (teamId: string) => dispatch(deleteTeamAction(teamId)),
            toast: (toast: Toast) => dispatch(addToastAction(toast)),
        }
    })(Team);
