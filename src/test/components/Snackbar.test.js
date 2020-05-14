import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { mount } from 'enzyme'

import { CustomSnackbar, Alert } from '../../components/Snackbar'

describe('<CustomSnackbar> component', () => {
    let component;
    let props;

    beforeEach(() => {
        props = {
            toasts: [
                { message: 'test', severity: 'info' }
            ]
        };
        component = mount(<CustomSnackbar {...props}/>);
    });
    describe('render all elements with props', () => {
        it('Render DUMB component without error', () => {
            expect(component.length).toBe(1);
        });
        it('contains 1 <Snackbar/>', () => {
            expect(component.find(Snackbar).length).toBe(1);
        });
        it('contains 1 <Alert/>', () => {
            expect(component.find(Alert).length).toBe(1);
        });
        it('contains proper message <Alert/>', () => {
            expect(component.find(Alert).text())
            .toBe(props.toasts[0].message);
        });
        it('shows proper severity', () => {
            expect(component.find(Alert).props().severity).toBe(props.toasts[0].severity);
        });
    });
    it('doesnt render without props', () => {
        component = mount(<CustomSnackbar toasts={undefined}/>);
        expect(component.find(Snackbar).props().open).toBe(false);
    })
})