import React from 'react'
import { TeamList } from '../../components/TeamList'
import { createShallow } from '@material-ui/core/test-utils'

import Team from '../../components/Team'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


describe('<TeamList> component', () => {
    let component;
    let props;

    beforeEach(() => {
        props = {
            OnClickMyTeam: jest.fn(),
            teamList: [],
            createTeam: jest.fn(),
            addTeam: jest.fn()
        }
        let shallow = createShallow();
        component = shallow(<TeamList {...props}/>);
    });

    describe('render all elements', () => {
        it('Render DUMB component without error', () => {
            expect(component.length).toBe(1);
        });
        it('contains 2 <ListItem/>', () => {
            expect(component.find(ListItem).length).toBe(2);
        });
        it('contains 2 <TextFild/>', () => {
            expect(component.find(TextField).length).toBe(2);
        });
        it('contains 2 <Button />', () => {
            expect(component.find(Button).length).toBe(2);
        });
        it('renders list of teams', () => {
            let shallow = createShallow();
            let teamList = [{ id: '1', name: 'team1' }, { id: '2', name: 'team2'}]
            component = shallow(<TeamList {...props} teamList={teamList} />);
            expect(component.find(Team).length).toBe(2);
        });
    })

    it('creates team on buttom click', () => {
        component.find(Button).at(0).simulate('click', {
            preventDefault: () => {
            }
        });
        expect(props.createTeam).toBeCalled();
    });

    it('adds team on buttom click', () => {
        component.find(Button).at(1).simulate('click', {
            preventDefault: () => {
            }
        });
        expect(props.addTeam).toBeCalled();;
    });

    it('OnChange name input changes value properly', () => {
        component.find(TextField).at(0).simulate('change', {
            target: {
                value: 'Test',
            },
            preventDefault: () => {
            },
        });
        expect(component.find(TextField).at(0).props().value).toBe('Test');
    });

    it('OnChange ID input changes value properly', () => {
        component.find(TextField).at(1).simulate('change', {
            target: {
                value: 'Test',
            },
            preventDefault: () => {
            },
        });
        expect(component.find(TextField).at(1).props().value).toBe('Test');
    });

})