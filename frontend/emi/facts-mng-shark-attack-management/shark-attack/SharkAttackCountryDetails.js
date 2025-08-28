/* React core */
import React, { useState, useRef } from 'react';
/* UI core */
import { Button, Typography, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FuseLoading } from '@fuse';
/* Tools */
import { MDText } from 'i18n-react';
import i18n from "../i18n";
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '80%',
        maxWidth: 800,
        maxHeight: '80vh',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3),
        overflow: 'auto'
    },
}));

function SharkAttackCountryDetails({ open, onClose, country, loggedUser }) {
    const classes = useStyles();
    
    // State for related cases
    const [relatedCases, setRelatedCases] = useState([]);
    const [loadingRelatedCases, setLoadingRelatedCases] = useState(false);
    const lastQueriedCountry = useRef(null);

    // Translation services
    let T = new MDText(i18n.get(loggedUser.locale));

    // Modal positioning
    const getModalStyle = () => {
        return {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };
    };

    const [modalStyle] = useState(getModalStyle());

    /**
     * Handle the query related cases when modal opens
     */
    React.useEffect(() => {
        if (open && country) {
            handleQueryRelatedCases();
        }
    }, [open, country]);

    /**
     * Handle the query related cases button action
     */
    async function handleQueryRelatedCases() {
        if (!country || loadingRelatedCases) return;
        
        // If we already have data for this country, just show it
        if (relatedCases.length > 0 && country === lastQueriedCountry.current) {
            return;
        }
        
        setLoadingRelatedCases(true);
        try {
            // Delay 1 sec
            await timer(1000).pipe(take(1)).toPromise();
            
            const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/global-shark-attack/records?where=country%3D'${encodeURIComponent(country.toUpperCase())}'&limit=5`);
            const data = await response.json();
            
            if (data.results) {
                setRelatedCases(data.results);
                lastQueriedCountry.current = country;
            }
        } catch (error) {
            console.error('Error fetching related cases:', error);
        } finally {
            setLoadingRelatedCases(false);
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="related-cases-modal-title"
            aria-describedby="related-cases-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <div className="flex justify-between items-center mb-16">
                    <Typography variant="h5" id="related-cases-modal-title">
                        {T.translate("shark_attack.related_cases_title", { country: country || '' })}
                    </Typography>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        size="small"
                    >
                        Cerrar
                    </Button>
                </div>

                {loadingRelatedCases ? (
                    <div className="flex items-center justify-center p-24">
                        <FuseLoading />
                    </div>
                ) : (
                    <div className="space-y-16">
                        {relatedCases.map((case_, index) => (
                            <div key={index} className="p-16 bg-gray-50 rounded-8 border-l-4 border-blue-500">
                                <Typography variant="h6" className="font-semibold mb-8">
                                    {case_.name || 'Unknown Victim'} - {case_.date || 'Unknown Date'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" className="mb-4">
                                    <strong>Ubicación:</strong> {case_.location || ''} {case_.area ? `(${case_.area})` : ''}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" className="mb-4">
                                    <strong>Actividad:</strong> {case_.activity || ''}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" className="mb-4">
                                    <strong>Especie:</strong> {case_.species || 'Unknown Species'}
                                </Typography>
                                {case_.fatal_y_n && (
                                    <Typography variant="body2" color="textSecondary">
                                        <strong>Fatal:</strong> {case_.fatal_y_n === 'Y' ? 'Sí' : case_.fatal_y_n === 'N' ? 'No' : 'Desconocido'}
                                    </Typography>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default SharkAttackCountryDetails;
