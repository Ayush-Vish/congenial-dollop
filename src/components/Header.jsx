import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/joy';

function Header() {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
                <Typography variant="h6" style={{flexGrow: 1}}>
                    DashBoard
                </Typography>
                <Button color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;