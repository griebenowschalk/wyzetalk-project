import { Grid, Button, Box } from '@mui/material';
import { Fragment } from 'react';
import { TAB_ITEMS } from '../../staticcontent/NavTabItems';
import {
    FeedState,
    selectedFilterItemUpdate,
} from '../../redux/slice/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TabItem } from '../../types/navTab.types';
import { strings } from '../../localisation/strings';

import './NavTabs.scss';

/**
 * The navigation tabs component for filtering feed items by tag
 * @returns
 */
function NavTabs() {
    const spacing = 12 / TAB_ITEMS.length;
    const dispatch = useDispatch();
    const { selectedFilterItem } = useSelector(
        (state: any) => state.feed as FeedState,
    );

    const isSelected = (item: TabItem) => {
        return item.value === selectedFilterItem;
    };

    function isSelectedStyle(item: TabItem) {
        return `button${isSelected(item) ? '--selected' : ''}`;
    }

    function updateSelectedFilterItem(item: TabItem) {
        let filterValue = strings.all;
        if (!isSelected(item)) filterValue = item.value;
        dispatch(selectedFilterItemUpdate(filterValue));
    }

    return (
        <div className="tab-container">
            <div className="tabs">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid container item spacing={1}>
                            <Fragment>
                                {TAB_ITEMS.map((item) => {
                                    return (
                                        <Grid key={item.id} item xs={spacing}>
                                            <Button
                                                className={isSelectedStyle(
                                                    item,
                                                )}
                                                onClick={() =>
                                                    updateSelectedFilterItem(
                                                        item,
                                                    )
                                                }
                                            >
                                                {item.name}
                                            </Button>
                                        </Grid>
                                    );
                                })}
                            </Fragment>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
}

export default NavTabs;
