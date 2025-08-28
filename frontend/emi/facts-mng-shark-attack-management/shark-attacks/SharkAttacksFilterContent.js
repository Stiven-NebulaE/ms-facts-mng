import React, { useEffect, useRef, useState } from 'react';
import { Checkbox, FormGroup, FormControlLabel, TextField, Grid } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import { MDText } from 'i18n-react';
import i18n from "../i18n";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


function TodoSidebarContent() {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const { filters: { active: activeChecked, country: countryFilter, type: typeFilter, species: speciesFilter } } = useSelector(({ SharkAttackManagement }) => SharkAttackManagement.sharkAttacks);
    const T = new MDText(i18n.get(user.locale));

    // Estado local para UI inmediata
    const [localFilters, setLocalFilters] = useState({
        country: countryFilter || '',
        type: typeFilter || '',
        species: speciesFilter || ''
    });

    // RxJS subject para debounce de consultas
    const filterSubject = useRef(new Subject());

    // Configuración de campos de filtro
    const filterFields = [
        { key: 'country', label: 'shark_attacks.filters.country' },
        { key: 'type', label: 'shark_attacks.filters.type' },
        { key: 'species', label: 'shark_attacks.filters.species' }
    ];

    useEffect(() => {
        const subscription = filterSubject.current.pipe(
            debounceTime(500)
        ).subscribe(filters => {
            // Aplicar filtros después del debounce (esto dispara las consultas)
            Object.entries(filters).forEach(([key, value]) => {
                switch(key) {
                    case 'country':
                        dispatch(Actions.setSharkAttacksFilterCountry(value));
                        break;
                    case 'type':
                        dispatch(Actions.setSharkAttacksFilterType(value));
                        break;
                    case 'species':
                        dispatch(Actions.setSharkAttacksFilterSpecies(value));
                        break;
                }
            });
        });

        return () => subscription.unsubscribe();
    }, [dispatch]);

    // Sincronizar estado local
    useEffect(() => {
        setLocalFilters({
            country: countryFilter || '',
            type: typeFilter || '',
            species: speciesFilter || ''
        });
    }, [countryFilter, typeFilter, speciesFilter]);

    function handleActiveChange() {
        if (activeChecked === null) {
            dispatch(Actions.setSharkAttacksFilterActive(true));
        } else if (activeChecked) {
            dispatch(Actions.setSharkAttacksFilterActive(false));
        } else {
            dispatch(Actions.setSharkAttacksFilterActive(null));
        }
    }

    // Función genérica para manejar cambios de filtros
    function handleFilterChange(filterType, value) {
        setLocalFilters(prev => ({ ...prev, [filterType]: value }));
        filterSubject.current.next({ [filterType]: value });
    }

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={400}>

            <div className="flex-auto border-l-1 border-solid">

                <div className="p-24">
                    <Grid container spacing={2}>
                        {/* Renderizar campos de filtro dinámicamente */}
                        {filterFields.map(field => (
                            <Grid item xs={12} key={field.key}>
                                <TextField
                                    label={T.translate(field.label)}
                                    value={localFilters[field.key]}
                                    onChange={(evt) => handleFilterChange(field.key, evt.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                />
                            </Grid>
                        ))}
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
