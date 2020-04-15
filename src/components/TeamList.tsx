import React from 'react'
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Team from './Team';
import { createTeam as createTeamAction } from '../redux/actions/teamActions';
import { addTeam as addTeamAction } from '../redux/actions/teamActions';


function TeamList(
    { 
        OnClickMyTeam, 
        teamList, 
        createTeam, 
        addTeam,
    }: {
        OnClickMyTeam: any, 
        teamList: any,
        createTeam: Function,
        addTeam: Function,
    }) {
    const [team, setTeam] = React.useState({name:''});
    const [teamId, setTeamId] = React.useState('');
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
        setTeam({name: ''});
    }
    const handleChange = (e: any) => {
        e.preventDefault();
        setTeam({...team, name: e.target.value});
    }
    const handleChangeAdd = (e: any) => {
        e.preventDefault();
        setTeamId(e.target.value);
    }
    const handleAddTeam = (e: any) => {
        e.preventDefault();
        addTeam(teamId);
    }

    return (
        <>
            {list}
            <ListItem>
                <TextField
                    id="createteam"
                    name="createteam"
                    label="Team name"
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
            <ListItem>
                <TextField
                    id="addteam"
                    name="addteam"
                    label="Team Id"
                    required={true}
                    value={teamId}
                    onChange={handleChangeAdd}
                ></TextField>
                <Button size="small" color="primary" onClick={handleAddTeam}>
                    Add
                </Button>
            </ListItem>
        </>
    )
}

const mapActionsToProps = (dispatch: any) => {
    return {
        createTeam: (team: any) => dispatch(createTeamAction(team)),
        addTeam: (teamId: any) => dispatch(addTeamAction(teamId)),
    }
}

export default connect(null, mapActionsToProps)(TeamList);