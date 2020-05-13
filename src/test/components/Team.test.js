import React from 'react'
import { Team } from '../../components/Team'
import { mount } from 'enzyme'
import { Router } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

jest.mock('copy-to-clipboard');
// eslint-disable-next-line import/first
import copy from 'copy-to-clipboard';

describe('<Team> component', () => {
    let component;
    let props;
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    beforeEach(() => {
        copy.mockReturnValue('s');
        
        props = {
            team: { id: '1', name: 'test' },
            OnClickMyTeam: jest.fn(),
            deleteTeam: jest.fn(),
            selected: true,
            toast: jest.fn(),
            useHistory: jest.fn(),
        };
        component = mount(
            <Router history={historyMock}>
                <Team {...props} />
            </Router>
        );
    });

    describe('render all elements', () => {
        it('Render DUMB component without error', () => {
            expect(component.length).toBe(1);
        });
        it('contains 1 <ListItem/>', () => {
            expect(component.find(ListItem).length).toBe(4);
        });
        it('contains 1 <ListItemIcon/>', () => {
            expect(component.find(ListItemIcon).length).toBe(4);
        });
        it('contains 1 <ListItemText/>', () => {
            expect(component.find(ListItemText).length).toBe(1);
        });
        it('contains 1 <ListItemSecondaryAction/>', () => {
            expect(component.find(ListItemSecondaryAction).length).toBe(1);
        });
        it('contains 1 <IconButton/>', () => {
            expect(component.find(IconButton).length).toBe(1);
        });
        it('contains 1 <Menu/>', () => {
            expect(component.find(Menu).length).toBe(1);
        });
        it('contains 1 <MenuItem/>', () => {
            expect(component.find(MenuItem).length).toBe(3);
        });
    })

    it('calls copy and toast function on handleInvite', () => {
        component.find(MenuItem).at(0).simulate('click', {
            preventDefault: () => {
            }
        });
        expect(props.toast).toBeCalled();
        expect(copy).toBeCalled();
    });

    it('calls history on handleTeammates', () => {
        component.find(MenuItem).at(1).simulate('click', {
            preventDefault: () => {
            }
        });
        expect(historyMock.push).toBeCalled();;
    });

    it('callse deleteTeam on handleDelete', () => {
        component.find(MenuItem).at(2).simulate('click', {
            preventDefault: () => {
            },
        });
        expect(props.deleteTeam).toBeCalled();
    });
})