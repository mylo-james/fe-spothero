export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
export const UPDATE_USER = 'UPDATE_USER';

export const updateActivity = payload => {
    return {
        type: UPDATE_ACTIVITY,
        payload,
    };
};

export const updateUser = payload => {
    return {
        type: UPDATE_USER,
        payload,
    };
};

export const purchase = data => {
    return {
        type: SPOT_PURCHASE,
        payload: data,
    };
};
