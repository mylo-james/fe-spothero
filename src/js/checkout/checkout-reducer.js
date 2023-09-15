import {UPDATE_ACTIVITY, UPDATE_USER, DESTROY_USER} from './checkout-actions';

// Define the initial state of the checkout reducer
const initialState = {
    user: {
        activity: 'active',
        fname: '',
        lname: '',
        email: '',
        phone: '',
    }
};

/**
 * Reducer function for the checkout state.
 *
 * @param {Object} state - The current state.
 * @param {Object} action - The action object containing type and payload.
 * @returns {Object} The new state.
 */
export default function checkout(state = initialState, {type, payload}) {
    switch (type) {
        case UPDATE_USER: {
            return {
                ...state,
                user: {...state.user, ...payload},
            };
        }

        case UPDATE_ACTIVITY: {
            return {
                ...state,
                user: {...state.user, activity: payload},
            };
        }

        case DESTROY_USER: {
            return {
                ...state,
                user: initialState.user,
            };
        }

        default:
            return state;
    }
}
