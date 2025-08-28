import React, {useRef, useEffect} from 'react';
import {FusePageCarded} from '@fuse';
import { useSelector, useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import SharkAttacksTable from './SharkAttacksTable';
import SharkAttacksHeader from './SharkAttacksHeader';
import reducer from '../store/reducers';
import {FuseLoading} from '@fuse';
import * as AppActions from 'app/store/actions';
import { MDText } from 'i18n-react';
import i18n from "../i18n";

import SharkAttacksFilterHeader from './SharkAttacksFilterHeader';
import SharkAttacksFilterContent from './SharkAttacksFilterContent';

function SharkAttacks()
{
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const pageLayout = useRef(null);
    const importState = useSelector(({ SharkAttackManagement }) => SharkAttackManagement.sharkAttacks.import);
    
    const T = new MDText(i18n.get(user.locale));

    // Handle import success/error messages
    useEffect(() => {
        if (importState.success) {
            dispatch(AppActions.showMessage({ 
                message: T.translate("shark_attacks.import_success"), 
                variant: 'success' 
            }));
            // Clear the success message
            dispatch({ type: 'CLEAR_IMPORT_MESSAGES' });
        }
        if (importState.error) {
            dispatch(AppActions.showMessage({ 
                message: T.translate("shark_attacks.import_error"), 
                variant: 'error' 
            }));
            // Clear the error message
            dispatch({ type: 'CLEAR_IMPORT_MESSAGES' });
        }
    }, [importState.success, importState.error, dispatch, T]);

    
    if(!user.selectedOrganization){
        return (<FuseLoading />);
    }

    return (
        <FusePageCarded
            classes={{
                content: "flex",
                //header : "min-h-72 h-72 sm:h-136 sm:min-h-136" // default tall/short header
                header: "min-h-72 h-72 sm:h-72 sm:min-h-72" // short header always
            }}
            header={
                <SharkAttacksHeader pageLayout={pageLayout} />
            }
            content={
                <SharkAttacksTable/>
            }

            leftSidebarHeader={
                <SharkAttacksFilterHeader/>
            }
            leftSidebarContent={
                <SharkAttacksFilterContent/>
            }
            ref={pageLayout}
            innerScroll
            leftSidebarVariant='permanent'
        />
    );
}

export default withReducer('SharkAttackManagement', reducer)(SharkAttacks);
