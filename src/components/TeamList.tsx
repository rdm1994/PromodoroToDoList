import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Team from './Team';


function TeamList({ OnClickMyTeam, teamList }: {OnClickMyTeam: any, teamList: any}) {
    if (!teamList) return (
        <ListItem>
            <Typography>team list loading</Typography>
        </ListItem>);
    let list = teamList.map((team: any) => {
        return (
            <Team team={team} OnClickMyTeam={OnClickMyTeam}/>
        )
    })
    const createNewTeam = () => {}
    return (
        <>
            {list}
            <ListItem>
                <Button size="small" color="primary" onClick={createNewTeam}>
                    Create
                </Button>
            </ListItem>
        </>
    )
}

export default TeamList;