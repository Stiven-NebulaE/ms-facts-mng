import React, { useState, useEffect } from 'react';
import { Paper, Button, Input, Icon, Typography, Hidden, IconButton } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../store/actions';
import { MDText } from 'i18n-react';
import i18n from "../i18n";
import _ from '@lodash';
import { useEventCallback } from 'rxjs-hooks'
import { debounceTime } from "rxjs/operators";

function SharkAttacksHeader(props) {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const searchTextFilter = useSelector(({ SharkAttackManagement }) => SharkAttackManagement.sharkAttacks.filters.name);
    const importLoading = useSelector(({ SharkAttackManagement }) => SharkAttackManagement.sharkAttacks.import.loading);
    const importSuccess = useSelector(({ SharkAttackManagement }) => SharkAttackManagement.sharkAttacks.import.success);
    const importError = useSelector(({ SharkAttackManagement }) => SharkAttackManagement.sharkAttacks.import.error);
    const [searchText, setSearchText] = useState(searchTextFilter)
    const [keywordCallBack, keyword] = useEventCallback(
        (event$) => event$.pipe(debounceTime(500))
    )

    const T = new MDText(i18n.get(user.locale));

    function handleSearchChange(evt) {
        keywordCallBack(evt.target.value);
        setSearchText(evt.target.value);
    }
    useEffect(() => {
        if (keyword !== undefined && keyword !== null)
            dispatch(Actions.setSharkAttacksFilterName(keyword))
    }, [keyword]);

    // Clear import messages after 5 seconds
    useEffect(() => {
        if (importSuccess || importError) {
            const timer = setTimeout(() => {
                dispatch({ type: 'CLEAR_IMPORT_MESSAGES' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [importSuccess, importError, dispatch]);

    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <Hidden lgUp>
                <IconButton
                    onClick={(ev) => props.pageLayout.current.toggleLeftSidebar()}
                    aria-label="open left sidebar"
                >
                    <Icon>filter_list</Icon>
                </IconButton>
            </Hidden>

            <div className="flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32 mr-0 sm:mr-12">business</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">{T.translate("shark_attacks.shark_attacks")} </Typography>
                </FuseAnimate>
            </div>

            <div className="flex flex-1 items-center justify-center px-12">

                <ThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideDownIn" delay={300}>
                        <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                            <Icon className="mr-8" color="action">search</Icon>

                            <Input
                                placeholder={T.translate("shark_attacks.search")}
                                className="flex flex-1"
                                disableUnderline
                                fullWidth
                                value={searchText}
                                inputProps={{
                                    'aria-label': 'Search'
                                }}
                                onChange={handleSearchChange}
                            />
                        </Paper>
                    </FuseAnimate>
                </ThemeProvider>

            </div>
            <div className="flex items-center space-x-8">
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Button 
                        onClick={() => dispatch(Actions.importSharkAttacks())}
                        className="whitespace-no-wrap" 
                        variant="outlined"
                        color="primary"
                        disabled={importLoading}
                    >
                        {importLoading ? (
                            <>
                                <Icon className="mr-8 animate-spin">refresh</Icon>
                                {T.translate("shark_attacks.importing")}
                            </>
                        ) : (
                            T.translate("shark_attacks.import")
                        )}
                    </Button>
                </FuseAnimate>
                
                {/* Import Status Messages */}
                {importSuccess && (
                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                        <div className="ml-8 p-8 bg-green-100 text-green-800 rounded-4 text-sm">
                            {T.translate("shark_attacks.import_success")}
                        </div>
                    </FuseAnimate>
                )}
                
                {importError && (
                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                        <div className="ml-8 p-8 bg-red-100 text-red-800 rounded-4 text-sm">
                            {T.translate("shark_attacks.import_error")}
                        </div>
                    </FuseAnimate>
                )}
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Button component={Link} to="/shark-attack-mng/shark-attacks/new" className="whitespace-no-wrap" variant="contained">
                        <span className="hidden sm:flex">{T.translate("shark_attacks.add_new_shark_attack")}</span>
                        <span className="flex sm:hidden">{T.translate("shark_attacks.add_new_shark_attack_short")}</span>
                    </Button>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default SharkAttacksHeader;
