import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/joy';

function Header() {
    return (
        <div className='flex w-full bg-white rounded-lg shadow-lg p-4 justify-between items-center'>
            <Typography variant="h6" style={{flexGrow: 1, marginLeft: '1rem'}}>
                DashBoard
            </Typography>
            <Button color="inherit" style={{marginRight: '1rem'}}>
                <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </Button>
        </div>
    );
}

export default Header;