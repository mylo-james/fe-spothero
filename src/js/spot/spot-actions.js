/**
 * Action type for updating the selected spot.
 * @type {string}
 */
export const SPOT_UPDATE_SELECTED = 'SPOT_UPDATE_SELECTED';

/**
 * Action creator to update the selected spot.
 *
 * @param {object} spot - The selected spot to update.
 * @returns {object} - Action object for updating the selected spot.
 */
export const updateSelected = spot => {
    return {
        type: SPOT_UPDATE_SELECTED,
        payload: spot,
    };
};
