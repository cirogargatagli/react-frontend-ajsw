import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../../images/logo.png'
import { AuthContext } from '../../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const Header = () => {

    const { logOut, user } = React.useContext(AuthContext);
    const history = useHistory();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const pages = [
        {
            name: 'Courses',
            path: "/courses",
            canAccess: ["Admin", "Client"]
        },
        {
            name: 'Activities',
            path: "/activities",
            canAccess: ["Admin", "Client"]
        },
        {
            name: 'My Reserves',
            path: "/reserves",
            canAccess: ["Client"]
        },
    ];
    const settings = [
        {
            name: 'Profile',
            icon: <AccountCircle />,
            onClick: () => { onProfile() }
        },
        {
            name: 'Logout',
            icon: <Logout />,
            onClick: () => { onLogOut() }
        }
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onCickPage = (page) => {
        handleCloseNavMenu();
        history.push(page)
    }

    const onLogOut = () => {
        handleCloseUserMenu();
        logOut();
    }

    const onProfile = () => {
        handleCloseUserMenu();
        history.push("/profile");
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img
                        src={Logo}
                        alt='logo'
                        className='logo-header'
                        onClick={() => history.push("/home")}
                    />

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                page.canAccess.some(x => x === user.account.role.description) &&
                                <MenuItem key={page.name} onClick={() => onCickPage(page.path)}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', marginLeft: "15px" } }}>
                        {pages.map((page) => (
                            page.canAccess.some(x => x === user.account.role.description) &&
                            <Button
                                key={page.name}
                                onClick={() => onCickPage(page.path)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar>
                                    {user.firstName[0] + user.lastName[0]}
                                </Avatar>
                                <KeyboardArrowDownOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={setting.onClick}>
                                    <Grid container direction="row" spacing={2}>
                                        <Grid item>
                                            {setting.icon}
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle2">{setting.name}</Typography>
                                        </Grid>
                                    </Grid>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
