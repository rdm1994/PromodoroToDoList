import React from 'react'
import { TeamList } from '../../components/TeamList'
import { createShallow } from '@material-ui/core/test-utils'

import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'


describe('<TeamList> component', () => {
    let component;

    beforeEach(() => {
        let shallow = createShallow();
        component = shallow(<TeamList/>);
    });

    describe('render all elements', () => {
        it('Render DUMB component without error', () => {
            expect(component.length).toBe(1);
        });
        it('Contains 2 <ListItem/>', () => {
            expect(component.find(ListItem).length).toBe(2);
        });
        it('Contains 2 <TextFild/>', () => {
            expect(component.find(TextField).length).toBe(2);
        });
        it('Contains 2 ß<Button />', () => {
            expect(component.find(Button).length).toBe(2);
        });
        
        it('Contains <CardActions/>', () => {
            expect(component.find(CardActions)).toBeTruthy();
        });
    })
})