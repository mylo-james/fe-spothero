/**
 * Action type for updating user activity.
 * @type {string}
 */
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';

/**
 * Action type for updating user information.
 * @type {string}
 */
export const UPDATE_USER = 'UPDATE_USER';

/**
 * Action type for destroying user data.
 * @type {string}
 */
export const DESTROY_USER = 'DESTROY_USER';

/**
 * Action creator for updating user activity.
 *
 * @param {any} payload - The data payload for the action.
 * @returns {Object} The action object.
 */
export const updateActivity = payload => {
    return {
        type: UPDATE_ACTIVITY,
        payload,
    };
};

/**
 * Action creator for updating user information.
 *
 * @param {any} payload - The data payload for the action.
 * @returns {Object} The action object.
 */
export const updateUser = payload => {
    return {
        type: UPDATE_USER,
        payload,
    };
};

/**
 * Action creator for destroying user data.
 *
 * @returns {Object} The action object.
 */
export const destroyUser = () => {
    return {
        type: DESTROY_USER,
    };
};
