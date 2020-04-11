import React from 'react'
import { connect } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListIcon from '@material-ui/icons/List';
import DeleteIcon from '@material-ui/icons/Delete'
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { deleteTeam } from '../redux/actions/teamActions';

function Team({team, OnClickMyTeam, deleteTeam}: {team: any, OnClickMyTeam: any, deleteTeam: any}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => { 
        deleteTeam(team.id);
        setAnchorEl(null);
    };

    if (!team) return <ListItem><Typography>team loading...</Typography></ListItem>;

    return (
        <ListItem id={team.id} button onClick={() => OnClickMyTeam(team.id)} key={team.id}>
            <ListItemIcon><GroupIcon /></ListItemIcon>
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
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <GroupAddIcon fontSize="small" />
                        </ListItemIcon>
                        Invite to group
                        </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <ListIcon fontSize="small" />
                        </ListItemIcon>
                        Show teammates
                        </MenuItem>
                    <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        Delete me from group
                    </MenuItem>
                </Menu>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default
    connect(null, (dispatch: any) => {
        return {
            deleteTeam: (teamId: string) => dispatch(deleteTeam(teamId)),
        }
    })(Team);
