import React from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

function Team({OnClickMyTeam, teamList} : any) {

    const createNewTeam = () => {

    }

    if (!teamList) return <MenuItem><Typography>team list loading</Typography></MenuItem>;
    let list = teamList.map((team: any) => {
        return(
        <MenuItem id={team.id} button onClick={() => OnClickMyTeam(team.id)} key={team.id}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={team.teamName} />
        </MenuItem>)
    })
    return (
        <>
            {list}
            <MenuItem>
            <Button size="small" color="primary" onClick={createNewTeam}>
                Create
            </Button>
            </MenuItem>
        </>
    )
}

export default Team
