import React from 'react'
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Team from './Team';
import { createTeam as createTeamAction } from '../redux/actions/teamActions';


function TeamList(
    { 
        OnClickMyTeam, 
        teamList, 
        createTeam, 
    }: {
        OnClickMyTeam: any, 
        teamList: any,
        createTeam: Function,
    }) {
    const [team, setTeam] = React.useState({name:''});
    if (!teamList) return (
        <ListItem>
            <Typography>team list loading</Typography>
        </ListItem>);
    let list = teamList.map((team: any) => {
        return (
            <Team team={team} OnClickMyTeam={OnClickMyTeam}/>
        )
    })
    const handleCreateTeam = (e: any) => {
        e.preventDefault();
        createTeam(team);
    }
    const handleChange = (e: any) => {
        e.preventDefault();
        setTeam({...team, name: e.target.value});
    }
    return (
        <>
            {list}
            <ListItem>
                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    required={true}
                    multiline
                    rows={1}
                    value={team.name}
                    onChange={handleChange}
                ></TextField>
                <Button size="small" color="primary" onClick={handleCreateTeam}>
                    Create
                </Button>
            </ListItem>
        </>
    )
}

const mapActionsToProps = (dispatch: any) => {
    return {
        createTeam: (team: any) => dispatch(createTeamAction(team))
    }
}

export default connect(null, mapActionsToProps)(TeamList);