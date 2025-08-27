import React, { useState } from 'react';
import { Checkbox, FormGroup, FormControlLabel, TextField, Grid } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import { MDText } from 'i18n-react';
import i18n from "../i18n";


function TodoSidebarContent(props) {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const { filters: { active: activeChecked, country: countryFilter, type: typeFilter, species: speciesFilter } } = useSelector(({ SharkAttackManagement }) => SharkAttackManagement.sharkAttacks);
    const T = new MDText(i18n.get(user.locale));


    function handleActiveChange(evt) {
        if (activeChecked === null) {
            dispatch(Actions.setSharkAttacksFilterActive(true));
        } else if (activeChecked) {
            dispatch(Actions.setSharkAttacksFilterActive(false));
        } else {
            dispatch(Actions.setSharkAttacksFilterActive(null));
        }
    }

    function handleCountryChange(evt) {
        dispatch(Actions.setSharkAttacksFilterCountry(evt.target.value));
    }

    function handleTypeChange(evt) {
        dispatch(Actions.setSharkAttacksFilterType(evt.target.value));
    }

    function handleSpeciesChange(evt) {
        dispatch(Actions.setSharkAttacksFilterSpecies(evt.target.value));
    }


    return (
        <FuseAnimate animation="transition.slideUpIn" delay={400}>

            <div className="flex-auto border-l-1 border-solid">

                <div className="p-24">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label={T.translate("shark_attacks.filters.country")}
                                value={countryFilter || ''}
                                onChange={handleCountryChange}
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={T.translate("shark_attacks.filters.type")}
                                value={typeFilter || ''}
                                onChange={handleTypeChange}
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={T.translate("shark_attacks.filters.species")}
                                value={speciesFilter || ''}
                                onChange={handleSpeciesChange}
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={activeChecked === null ? false : activeChecked}
                                            indeterminate={activeChecked === null}
                                            onChange={handleActiveChange}
                                            value="active"
                                            inputProps={{
                                                'aria-label': 'primary checkbox',
                                            }}
                                        />
                                    }
                                    label={T.translate("shark_attacks.filters.active")}
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </div>




            </div>
        </FuseAnimate>
    );
}

export default TodoSidebarContent;
