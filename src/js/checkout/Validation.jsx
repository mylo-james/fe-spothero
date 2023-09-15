import {useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateActivity} from '../checkout/checkout-actions';

/**
 * Validation Component: Validates user input fields and updates error messages for the Checkout Component.
 *
 * @param {object} user - The user object containing input field values.
 * @param {function} setErrors - A function to set error messages for each input field.
 * @returns {null} - Handles input validation but does not render
 */
const Validation = ({user, setErrors}) => {
    /**
     * Validate a specific input field.
     *
     * @param {string} id - The field identifier.
     * @param {string} value - The field value to be validated.
     * @param {RegExp} regex - The regular expression for validation.
     * @param {string} errorMessage - The error message for invalid input.
     * @param {string} emptyMessage - The error message for empty input.
     */
    const validateField = useCallback(
        (id, value, regex, errorMessage, emptyMessage) => {
            let error = '';
            const isValid = regex.test(value);

            // Check if the input field is empty or invalid
            if (!value.length) {
                error = emptyMessage;
            } else if (!isValid) {
                error = errorMessage;
            }

            // Set the errors object using the setErrors function
            setErrors(prevErrors => ({
                ...prevErrors,
                [id]: error,
            }));
        },
        [setErrors]
    );

    // Run validation for each input field when the user object changes
    useEffect(() => {
        // First Name
        validateField(
            'fname',
            user.fname,
            /^[a-zA-Z]+$/,
            'Please enter a valid first name',
            'First name is required'
        );

        // Last Name
        validateField(
            'lname',
            user.lname,
            /^[a-zA-Z]+$/,
            'Please enter a valid last name',
            'Last name is required'
        );

        // Email
        validateField(
            'email',
            user.email,
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            'Please enter a valid email address',
            'Email address is required'
        );

        // Phone
        validateField(
            'phone',
            user.phone,
            /\(\d{3}\) \d{3}-\d{4}/,
            'Please enter a valid phone number',
            'Phone number is required'
        );
    }, [user, validateField]);

    // This component doesn't render anything, it just handles validation and errors
    return null;
};

Validation.propTypes = {
    /**
     * The user object containing input field values.
     */
    user: PropTypes.object.isRequired,

    /**
     * A function to set error messages for each input field.
     */
    setErrors: PropTypes.func.isRequired,
};

/**
 * Map Redux state to component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object} An object containing user-related state properties.
 */
const mapStateToProps = ({
    checkout: {
        user: {activity, fname, lname, email, phone},
        user,
    },
}) => {
    return {user, activity, fname, lname, email, phone};
};

const mapDispatchToProps = {
    updateActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Validation);
