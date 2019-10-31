import React from 'react'

import clsx from 'clsx'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import UserIcon from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

function Team({OnClickMyTeam} : any) {
    const createNewTeam = () => {

    }
    return (
        <MenuItem id="My team" button onClick={OnClickMyTeam} key={"My team"}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"My team"} />
            <Button size="small" color="primary" onClick={createNewTeam}>
                    Create
            </Button>
        </MenuItem>
    )
}

export default Team
