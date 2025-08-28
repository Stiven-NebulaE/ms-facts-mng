
import React from 'react';
import { TextField, FormControlLabel, Switch, Grid } from '@material-ui/core';
import * as Yup from "yup";
import _ from '@lodash';


export function basicInfoFormValidationsGenerator(T) {
    return {
        date: Yup.string()
            .required(T.translate("shark_attack.form_validations.date.required")),
        year: Yup.number()
            .min(1900, T.translate("shark_attack.form_validations.year.min", {min: 1900}))
            .max(new Date().getFullYear(), T.translate("shark_attack.form_validations.year.max", {max: new Date().getFullYear()}))
            .required(T.translate("shark_attack.form_validations.year.required")),
        type: Yup.string()
            .required(T.translate("shark_attack.form_validations.type.required")),
        country: Yup.string()
            .required(T.translate("shark_attack.form_validations.country.required")),
        name: Yup.string()
            .min(3, T.translate("shark_attack.form_validations.name.length", {len:3}))
            .required(T.translate("shark_attack.form_validations.name.required")),
        age: Yup.string()
            .required(T.translate("shark_attack.form_validations.age.required")),
    };
}


/**
 * Aggregate BasicInfo form
 * @param {{dataSource,T}} props 
 */
export function BasicInfo(props) {
    const { dataSource: form, T, onChange, errors, touched, canWrite } = props;
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        helperText={(errors.date && touched.date) && errors.date}
                        error={errors.date && touched.date}
                        required
                        label={T.translate("shark_attack.date")}
                        id="date"
                        name="date"
                        value={form.date || ''}
                        onChange={onChange("date")}
                        onBlur={onChange("date")}
                        variant="outlined"
                        fullWidth
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        helperText={(errors.year && touched.year) && errors.year}
                        error={errors.year && touched.year}
                        required
                        label={T.translate("shark_attack.year")}
                        id="year"
                        name="year"
                        value={form.year || ''}
                        onChange={onChange("year")}
                        onBlur={onChange("year")}
                        variant="outlined"
                        fullWidth
                        type="number"
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        helperText={(errors.type && touched.type) && errors.type}
                        error={errors.type && touched.type}
                        required
                        label={T.translate("shark_attack.type")}
                        id="type"
                        name="type"
                        value={form.type || ''}
                        onChange={onChange("type")}
                        onBlur={onChange("type")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        helperText={(errors.country && touched.country) && errors.country}
                        error={errors.country && touched.country}
                        required
                        label={T.translate("shark_attack.country")}
                        id="country"
                        name="country"
                        value={form.country || ''}
                        onChange={onChange("country")}
                        onBlur={onChange("country")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.area")}
                        id="area"
                        name="area"
                        value={form.area || ''}
                        onChange={onChange("area")}
                        onBlur={onChange("area")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.location")}
                        id="location"
                        name="location"
                        value={form.location || ''}
                        onChange={onChange("location")}
                        onBlur={onChange("location")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.activity")}
                        id="activity"
                        name="activity"
                        value={form.activity || ''}
                        onChange={onChange("activity")}
                        onBlur={onChange("activity")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        helperText={(errors.name && touched.name) && errors.name}
                        error={errors.name && touched.name}
                        required
                        label={T.translate("shark_attack.name")}
                        id="name"
                        name="name"
                        value={form.name || ''}
                        onChange={onChange("name")}
                        onBlur={onChange("name")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.sex")}
                        id="sex"
                        name="sex"
                        value={form.sex || ''}
                        onChange={onChange("sex")}
                        onBlur={onChange("sex")}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{
                            native: true,
                        }}
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    >
                        <option value=""></option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="U">Unknown</option>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        helperText={(errors.age && touched.age) && errors.age}
                        error={errors.age && touched.age}
                        required
                        label={T.translate("shark_attack.age")}
                        id="age"
                        name="age"
                        value={form.age || ''}
                        onChange={onChange("age")}
                        onBlur={onChange("age")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.injury")}
                        id="injury"
                        name="injury"
                        value={form.injury || ''}
                        onChange={onChange("injury")}
                        onBlur={onChange("injury")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.fatal_y_n")}
                        id="fatal_y_n"
                        name="fatal_y_n"
                        value={form.fatal_y_n || ''}
                        onChange={onChange("fatal_y_n")}
                        onBlur={onChange("fatal_y_n")}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{
                            native: true,
                        }}
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    >
                        <option value=""></option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                        <option value="U">Unknown</option>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.time")}
                        id="time"
                        name="time"
                        value={form.time || ''}
                        onChange={onChange("time")}
                        onBlur={onChange("time")}
                        variant="outlined"
                        fullWidth
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.species")}
                        id="species"
                        name="species"
                        value={form.species || ''}
                        onChange={onChange("species")}
                        onBlur={onChange("species")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.investigator_or_source")}
                        id="investigator_or_source"
                        name="investigator_or_source"
                        value={form.investigator_or_source || ''}
                        onChange={onChange("investigator_or_source")}
                        onBlur={onChange("investigator_or_source")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.pdf")}
                        id="pdf"
                        name="pdf"
                        value={form.pdf || ''}
                        onChange={onChange("pdf")}
                        onBlur={onChange("pdf")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.href_formula")}
                        id="href_formula"
                        name="href_formula"
                        value={form.href_formula || ''}
                        onChange={onChange("href_formula")}
                        onBlur={onChange("href_formula")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.href")}
                        id="href"
                        name="href"
                        value={form.href || ''}
                        onChange={onChange("href")}
                        onBlur={onChange("href")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.case_number")}
                        id="case_number"
                        name="case_number"
                        value={form.case_number || ''}
                        onChange={onChange("case_number")}
                        onBlur={onChange("case_number")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label={T.translate("shark_attack.case_number0")}
                        id="case_number0"
                        name="case_number0"
                        value={form.case_number0 || ''}
                        onChange={onChange("case_number0")}
                        onBlur={onChange("case_number0")}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: !canWrite(),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={form.active || false}
                                onChange={onChange("active")}
                                id="active"
                                name="active"
                                value={form.active || false}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                variant="outlined"
                                disabled={!canWrite()}
                            />
                        }
                        label={T.translate("shark_attack.active")}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

