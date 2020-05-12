import React from 'react'
import { CreateTask } from '../../components/CreateTask'
import { createShallow } from '@material-ui/core/test-utils'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


describe('<CreateTask> componenet', () => {
    let component;
    let props;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);
    beforeEach(() => {
        let shallow = createShallow();
        props = {
            createTask: jest.fn(),
            toast: jest.fn()
        }
        component = shallow(<CreateTask {...props}/>);
    });

    describe('render all elemets', () => {
        it('Render DUMB component without error', () => {
            expect(component.length).toBe(1);
        });
        it('Contains <Card/>', () => {
            expect(component.find(Card)).toBeTruthy();
        });
        it('Contains <CardContent/>', () => {
            expect(component.find(CardContent)).toBeTruthy();
        });
        it('Contains <TextFild/>', () => {
            expect(component.find(TextField).length).toBe(2);
        });
        it('Contains <CardActions/>', () => {
            expect(component.find(CardActions)).toBeTruthy();
        });
        it('Contains <Button />', () => {
            expect(component.find(Button).length).toBe(2);
        });
    })

    it('Create Button should trigger createTask ', () => {
        component.find(TextField).at(0).simulate('change', {
            target: {
                name: 'taskName',
                value: 'Test'
            },
            preventDefault: () => {
            },
        });
        component.find(TextField).at(1).simulate('change', {
            target: {
                name: 'description',
                value: 'Test'
            },
            preventDefault: () => {
            },
        });
        component.find(Button).at(0).simulate('click', {
            preventDefault: () => {
            }
        });
        expect(props.createTask).toBeCalled();
    });
    it('OnChange name input changes value properly', () => {
        component.find(TextField).at(0).simulate('change', {
            target: {
                name: 'taskName',
                value: 'Test',
            },
            preventDefault: () => {
            },
        });
        expect(component.find(TextField).at(0).props().value).toBe('Test');
    });
    it('OnChange description input changes value properly', () => {
        component.find(TextField).at(1).simulate('change', {
            target: {
                name: 'description',
                value: 'Test',
            },
            preventDefault: () => {
            },
        });
        expect(component.find(TextField).at(1).props().value).toBe('Test');
    });
});
