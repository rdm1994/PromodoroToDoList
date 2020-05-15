import React, { useState } from 'react'
import { Task } from '../../components/Task'
import { createShallow } from '@material-ui/core/test-utils'
import { firestore } from 'firebase';
import { mount } from 'enzyme'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Slider from '@material-ui/core/Slider'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

describe('<CustomSnackbar> component', () => {
    let component;
    let props;

    beforeEach(() => {
        props = {
            task: {
                taskName: 'test',
                description: 'testing',
                timestamp: new firestore.Timestamp(),
                totalTime: 10,
                userId: '1',
                done: false, 
            },
            username: 'Jest',
            userPhoto: 'jest.png',
            deleteTask: jest.fn(),
            setTotalTime: jest.fn(),
            setTaskDone: jest.fn(),
            taskId: '1',
        };

        component = mount(<Task {...props}/>);
    });
    describe('render all elements with props', () => {
        it('Render DUMB component without error', () => {
            expect(component.length).toBe(1);
        });
        it('contains 1 <Card/>', () => {
            expect(component.find(Card).length).toBe(1);
        });
        it('contains 1 <CardHeader/>', () => {
            expect(component.find(CardHeader).length).toBe(1);
        });
        it('contains 1 <Avatar/>', () => {
            expect(component.find(Avatar).length).toBe(1);
        });
        it('contains 1 <IconButton/>', () => {
            expect(component.find(IconButton).length).toBe(1);
        });
        it('contains 1 <Menu/>', () => {
            expect(component.find(Menu).length).toBe(1);
        });
        it('contains 2 <MenuItem/>', () => {
            expect(component.find(MenuItem).length).toBe(2);
        });
        it('contains 5 <Typography/>', () => {
            expect(component.find(Typography).length).toBe(5);
        });
        it('contains 1 <Slider/>', () => {
            expect(component.find(Slider).length).toBe(1);
        });
        it('contains 1 <CardActionArea/>', () => {
            expect(component.find(CardActionArea).length).toBe(1);
        });
        it('contains 1 <CardContent/>', () => {
            expect(component.find(CardContent).length).toBe(1);
        });
        it('contains 2 <Button/>', () => {
            expect(component.find(Button).length).toBe(2);
        });
    })
    describe('buttoms works properly', () => {
        it('set task as done on button click', () => {
            component.find(MenuItem).at(0).simulate('click');
            expect(props.setTaskDone).toBeCalledWith(props.taskId, !props.task.done);
        });
        it('set task as done on button click', () => {
            component.find(MenuItem).at(1).simulate('click');
            expect(props.deleteTask).toBeCalledWith(props.taskId);
        });
        it('starts timer on button click', () => {
            expect(component.find(Button).at(0).text()).toBe('Start');
            component.find(Button).at(0).simulate('click');
            expect(component.find(Button).at(0).text()).toBe('Stop');
        });
    })
});