import React from 'react';
import { SignUp } from './SignUp'
import { createShallow } from '@material-ui/core/test-utils';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


describe('<CreateTask> componenet', () => {
    let component;
    let props = {};
    beforeEach(() => {
        let shallow = createShallow();
        component = shallow(<SignUp  {...props} />);
    });

    it('Render DUMB component without error', () => {
        expect(component.length).toBe(1);
    });

    it('Contains <Card/>', () => {
        expect(component.find(Container)).toBeTruthy();
    });

    it('Contains <CssBaseLine/>', () => {
        expect(component.find(CssBaseline)).toBeTruthy();
    });

    it('Contains <Avatar/>', () => {
        expect(component.find(Avatar)).toBeTruthy();
    });

    it('Contains <Typography/>', () => {
        expect(component.find(Typography)).toBeTruthy();
    });

    it('Contains <Grid/>', () => {
        expect(component.find(Grid)).toBeTruthy();
    });

    it('Contains <Button/>', () => {
        expect(component.find(Button)).toBeTruthy();
    });

});