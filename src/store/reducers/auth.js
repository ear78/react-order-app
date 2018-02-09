import * actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state, action ) => {
    return {
        ...state,
        error: null,
        loading: true
    }
}

const authSuccess = (state, action) => {

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        default:
            return state;
    }
};

export default reducer;
