import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { strings } from "../../localisation/strings"
import { NavDrawerItem } from "../../types/navBar.types"
import { AddHomeOutlined, GridViewOutlined, ChatBubbleOutlineOutlined, AdminPanelSettingsOutlined } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { selectedDrawerItemUpdate } from "../../redux/reducers/navbarReducer";
import withRouter, { Router } from "../hoc/withRouter";
import { findURLRelatingDrawerItem, navigateTo } from "../../helpers/navigationHelper";
import { Drawer } from "@mui/material";
import { NAV_DRAWER_WIDTH } from "../../theme/theme";

import './Navigation.scss'

export const DRAWER_ITEMS: NavDrawerItem[] = [
    {
        id: 0,
        name: strings.home,
        icon: (selected: boolean) => <AddHomeOutlined />,
        route: '/',
    },
    {
        id: 1,
        name: strings.explorer,
        icon: (selected: boolean) => <GridViewOutlined />,
        route: '/explorer',
    },
    {
        id: 2,
        name: strings.chat,
        icon: (selected: boolean) => <ChatBubbleOutlineOutlined />,
        route: '/chat',
    },
    {
        id: 3,
        name: strings.admin,
        icon: (selected: boolean) => <GridViewOutlined />,
        route: '/admin',
    },
]

interface Props {
    router: Router
}

function NavBarContent(props: Props) {
    const { router } = props
    const dispatch = useDispatch()
    const { selectedDrawerItem } = useSelector((state: any) => state.navbar.selectedDrawerItem)

    function isSelected(item: NavDrawerItem) {
        return item.id === selectedDrawerItem.id
    }

    // useEffect(() => {
    //     dispatch(selectedDrawerItemUpdate(findURLRelatingDrawerItem(location.pathname)))
    // }, [location.pathname])

    function renderMenuItems() {
        return DRAWER_ITEMS.map((item, index) => {
            return (
                <div
                    key={index}
                    className={'nav-drawer-item'}
                    onClick={() => {
                        dispatch(selectedDrawerItemUpdate(item))
                        navigateTo(router, item, true)
                    }}
                >
                    <div className='nav-drawer-item-icon'>
                        {item.icon(isSelected(item))}
                    </div>
                    <div className='nav-drawer-item-text'>
                        {item.name}
                    </div>
                </div>
            )
        })
    }

    return (
        <Drawer
            variant='permanent'
            anchor='left'
            className='app-drawer'
            sx={{
                width: NAV_DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: NAV_DRAWER_WIDTH,
                    boxSizing: 'border-box',
                },
            }}
        >
            <div className="nav-content-sections-holder">
                <div className="section">
                    {renderMenuItems()}
                </div>
            </div>
        </Drawer>
    )
}

export default withRouter(NavBarContent)