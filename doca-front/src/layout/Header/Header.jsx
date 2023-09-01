import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { useMessageContext } from '../../components/context/MessageContext';
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
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ErrorIcon from '@mui/icons-material/Error';
import { useAuth } from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import docca from '../../assets/Ic2.svg'
import { CleaningServices } from '@mui/icons-material';
import './Header.css';
import { Link, useMediaQuery } from '@mui/material';

export const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElReg, setAnchorElReg] = React.useState(null);
    const [anchorElRegXs, setAnchorElRegXs] = React.useState(null);
    const isMobile = useMediaQuery('(max-width: 900px)')

    // React.useEffect(() => {
    //     handleCloseUserMenu(); // This will close the user menu when the component mounts
    //     return () => {
    //         handleCloseUserMenu(); // This will also close the user menu when navigating away from the current page
    //     };
    // }, []);

    const auth = useAuth();

    const { conversations } = useMessageContext();
    const navigate = useNavigate();

    const totalMessages = conversations.reduce((total, conversation) => {
        return (
            total +
            conversation.messages.filter(
                (message) => message.receiverId === auth.user.id && !message.isRead
            ).length
        );
    }, 0);

    const handleProfile = () => {
        window.location.href = '/perfil';
    };

    const handleAdmin = () => {
        navigate('/admin');
    };

    const handleMessages = () => {
        navigate('/messages')
    };

    const handleTests = () => {
        navigate('/tests')
    };

    const handleQueries = () => {
        navigate('/Consultas')
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenRegMenu = (event, size) => {
        if (size === 'xs') {
            setAnchorElRegXs(event.currentTarget);
        } else {
            setAnchorElReg(event.currentTarget);
        }
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseRegMenu = (size) => {
        if (size === 'xs') {
            setAnchorElRegXs(null);
        } else {
            setAnchorElReg(null);
        }
    };

    const handleRegister = (userValue) => {
        navigate(`/register-${userValue}`);
    }

    return (
        <>
            <AppBar position="static" id='navBar'>
                <Container maxWidth="100%">
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <a href='/'>
                                <img src={docca} style={{ height: '5rem', width: '5rem' }} />
                            </a>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'black',
                                    textDecoration: 'none',
                                    marginRight: '1.5em'
                                }}
                            >
                                DOCAPPOINT
                            </Typography>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                DOCAPPOINT
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexGrow: 0, flexDirection: 'row', }}>
                            {
                                auth.user
                                    ?
                                    <Container id='kilombero' sx={{ display: 'flex', alignItems: 'center', gap: 2, }}>
                                        <Container sx={{ display: 'flex', alignItems: 'center', }}>
                                            <Button sx={{ color: 'white', }} onClick={() => { handleMessages() }}>
                                                <QuestionAnswerIcon />
                                                <div style={{ backgroundColor: 'red', borderRadius: 100, textAlign: 'center', minHeight: '1.5rem', minWidth: '1.5rem ', position: 'relative', bottom: '8px' }}>{totalMessages}</div>
                                            </Button>
                                        </Container>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar alt="user-profile-pic" src={auth.user.profile_picture_url} />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="user-appbar"
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
                                            <MenuItem onClick={() => { handleCloseUserMenu(); handleProfile() }}>
                                                <Typography textAlign="center">PERFIL</Typography>
                                            </MenuItem>
                                            {auth.user.userType === 'lab' &&
                                                <MenuItem onClick={() => { handleCloseUserMenu(); handleTests() }}>
                                                    <Typography textAlign="center">MIS ANALISIS</Typography>
                                                </MenuItem>
                                            }
                                            {auth.user.userType === 'patient' &&<MenuItem onClick={() => { handleCloseUserMenu(); handleQueries() }}>
                                            <Typography textAlign="center">MIS CONSULTAS</Typography>
                                        </MenuItem>}
                                        {/* 
                                            auth.user.userType === 'doctor' &&
                                            <MenuItem onClick={() => { handleCloseUserMenu() }}>
                                                <Typography textAlign="center">AGENDA</Typography>
                                            </MenuItem>
                                        }
                                        <MenuItem onClick={() => { handleCloseUserMenu() }}>
                                            <Typography textAlign="center">MEDIOS DE PAGO</Typography>
                                        </MenuItem> */}
                                            {
                                                auth.user.admin &&
                                                <MenuItem onClick={() => { handleCloseUserMenu(); handleAdmin() }}>
                                                    <Typography textAlign="center">ADMIN</Typography>
                                                </MenuItem>
                                            }
                                            <MenuItem onClick={auth.logout}>
                                                <Typography textAlign="center">CERRAR SESION</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Container>
                                    :
                                    <Container>
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
                                                id="nav-appbar"
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
                                                <Button
                                                    onClick={handleCloseNavMenu}
                                                    sx={{ display: 'block', }}
                                                    href="login"
                                                >
                                                    INICIO DE SESION
                                                </Button>
                                                <Tooltip title="Ver Opciones">
                                                    <Button
                                                        onClick={(event) => handleOpenRegMenu(event, 'xs')}
                                                        sx={{ display: 'block' }}
                                                    >
                                                        REGISTRARME
                                                    </Button>
                                                </Tooltip>
                                                <Menu
                                                    sx={{ mt: '45px' }}
                                                    id="reg-appbar"
                                                    anchorEl={anchorElRegXs}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    open={Boolean(anchorElRegXs)}
                                                    onClose={() => handleCloseRegMenu('xs')}
                                                >
                                                    <MenuItem onClick={() => { handleRegister('doctor'); handleCloseRegMenu(); handleCloseNavMenu() }}>
                                                        <Typography textAlign="center">DOCTOR</Typography>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => { handleRegister('laboratorio'); handleCloseRegMenu(); handleCloseNavMenu() }}>
                                                        <Typography textAlign="center">LABORATORIO</Typography>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => { handleRegister('paciente'); handleCloseRegMenu(); handleCloseNavMenu() }}>
                                                        <Typography textAlign="center">PACIENTE</Typography>
                                                    </MenuItem>
                                                </Menu>
                                            </Menu>
                                        </Box>
                                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                            <Button
                                                onClick={handleCloseNavMenu}
                                                sx={{ display: 'block', color: 'white' }}
                                                href="login"
                                            >
                                                INICIO DE SESION
                                            </Button>
                                            <Tooltip title="Ver Opciones">
                                                <Button
                                                    onClick={(event) => handleOpenRegMenu(event, 'md')}
                                                    sx={{ display: 'block', color: 'white' }}
                                                >
                                                    REGISTRARME
                                                </Button>
                                            </Tooltip>
                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="reg-appbar"
                                                anchorEl={anchorElReg}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElReg)}
                                                onClose={() => handleCloseRegMenu('md')}
                                            >
                                                <MenuItem onClick={() => { handleRegister('doctor'); handleCloseRegMenu(); }}>
                                                    <Typography textAlign="center">DOCTOR</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={() => { handleRegister('laboratorio'); handleCloseRegMenu(); }}>
                                                    <Typography textAlign="center">LABORATORIO</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={() => { handleRegister('paciente'); handleCloseRegMenu(); }}>
                                                    <Typography textAlign="center">PACIENTE</Typography>
                                                </MenuItem>
                                            </Menu>
                                        </Box>
                                    </Container>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar >
            {auth.user && auth.user.userType != 'patient' && auth.user.subscription === false &&
                <Box sx={{ backgroundColor: 'gray', minWidth: '100%', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box id="redline"></Box>
                    <Box sx={{p:isMobile? 1:"", display: 'flex', alignItems: 'center', gap: 2, height:"100%"}}>
                        <Typography variant='body1' sx={{ color: 'white', fontWeight: 'bold', }}> <Link href={`/plan/${auth.user.userType}`} sx={{ textDecoration: 'none', color: 'red', "&:hover": { textDecoration: 'underline', color: 'orange' } }}>Subscríbete</Link> a un plan para tener acceso a todas las funciones de la página</Typography>
                        <ErrorIcon sx={{ color: 'red', backgroundColor: 'white', borderRadius: '100%' }} />
                    </Box>
                </Box>
            }
        </>
    )
}