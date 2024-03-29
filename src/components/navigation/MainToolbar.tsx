import { DRAWER_ITEMS } from '../../staticcontent/DrawerItems';
import withRouter, { Router } from '../hoc/withRouter';
import { navigateTo } from '../../helpers/navigationHelper';
import { AppBar, Toolbar } from '@mui/material';

import NavBarUser from '../user/NavBarUser';
import { NotificationsOutlined } from '@mui/icons-material';
import logo from '../../assets/logo.png';

import './Navigation.scss';

interface MainToolBarProps {
    router: Router;
}

/**
 * Main toolbar component that renders the logo, notifications and user icon
 */
function MainToolbar(props: MainToolBarProps) {
    const { router } = props;

    return (
        <AppBar
            position="fixed"
            className="main-tool-bar"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <img
                src={logo}
                alt="logo"
                className="toolbar-logo"
                onClick={() => navigateTo(router, DRAWER_ITEMS[0], true)}
            />
            <Toolbar className="toolbar-content">
                <NotificationsOutlined className="toolbar-content-icon" />
                <NavBarUser />
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(MainToolbar);
