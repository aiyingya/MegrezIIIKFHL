import { createStore } from 'redux';
import {reducer} from './Reducer';
import {loadingStart,loadingEnd,setDatas,search,getFormItems, setSearchObj, setBtnRequestActive, setBtnRequestDisplay,
    setBtnLoadingActive,setBtnLoadingDisplay,setTypeDatas
} from './Actions';
import {Global} from 'winning-megreziii-utils';
export const store = createStore(reducer);

export const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    };
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dict:{
        }
    }
}