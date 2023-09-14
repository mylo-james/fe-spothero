export const SPOT_PURCHASE = 'SPOT_PURCHASE';
import {UPDATE_ACTIVITY, UPDATE_USER} from './checkout-actions';

const initialState = {
    user: {
        activity: 'active',
        fname: '',
        lname: '',
        email: '',
        phone: '',
    },
    reservations: {},
};

export default function checkout(state = initialState, {type, payload}) {
    switch (type) {
        case SPOT_PURCHASE: {
            return {
                ...state,
                reservations: {...state.reservations, ...payload},
            };
        }
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

        default:
            return state;
    }
}
