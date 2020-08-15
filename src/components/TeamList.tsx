import React, { useState } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

//Material UI
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Team from './Team'
import { createTeam as createTeamAction } from '../redux/actions/teamActions'
import { addTeam as addTeamAction } from '../redux/actions/teamActions'
import CircularProgress from '@material-ui/core/CircularProgress'

export function TeamList(
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
    const [teamListOrdered, setTeamListOrdered] = useState([]);
    const [team, setTeam] = useState({ name: '' });
    const [teamId, setTeamId] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');

    React.useEffect(() => {
        setTeamListOrdered(teamList);
    }, [teamList])

    const handleClickMyTeam = (teamId: string) => {
        (teamId === selectedTeam) ? setSelectedTeam('') : setSelectedTeam(teamId)
        OnClickMyTeam(teamId);
    }
    let list: any;

    if (teamListOrdered) {
        list = teamListOrdered.map((team: any, index: number) => {
            return (
                <Draggable draggableId={team.id} index={index} key={team.id}>
                    {(provided) => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={provided.draggableProps.style}
                        >
                            <Team
                                team={team}
                                OnClickMyTeam={handleClickMyTeam}
                                selected={selectedTeam === team.id}
                                key={team.id}
                            />
                        </div>
                    )}
                </Draggable>
            )
        });
    }

    const handleCreateTeam = (e: any) => {
        e.preventDefault();
        createTeam(team);
        setTeam({ name: '' });
    }

    const handleChange = (e: any) => {
        e.preventDefault();
        setTeam({ ...team, name: e.target.value });
    }

    const handleChangeAdd = (e: any) => {
        e.preventDefault();
        setTeamId(e.target.value);
    }

    const handleAddTeam = (e: any) => {
        e.preventDefault();
        addTeam(teamId);
        setTeamId('');
    }

    const handleDragEnd = ({ destination, source, draggbleId }: any) => {
        if (!destination) return;
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return;
        let res = Array.from(teamListOrdered);
        const [removed] = res.splice(source.index, 1);
        res.splice(destination.index, 0, removed);
        setTeamListOrdered(res);
    }

    return (
        <>
            {
                (!teamList) ? (
                    <ListItem>
                        <CircularProgress />
                    </ListItem>
                ) : (
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId={'123'}>
                                {provided => (
                                    <div {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {list}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    )
            }
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
        addTeam: (teamId: String) => dispatch(addTeamAction(teamId)),
    }
}

export default connect(null, mapActionsToProps)(React.memo(TeamList));