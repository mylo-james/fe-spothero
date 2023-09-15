import React, {useState} from 'react';
import {connect} from 'react-redux';
import TextInput from './TextInput';
import {updateUser as _updateUser} from '../checkout/checkout-actions';
import {PropTypes} from 'prop-types';

/**
 * PhoneInput Component: Renders a phone number input with formatting and error handling.
 *
 * @param {string} phone - The phone number value.
 * @param {function} _updateUser - Redux action to update user data.
 * @param {object} errors - Error messages for form validation.
 * @param {boolean} submitting - Whether the form is currently being submitted.
 * @returns {JSX.Element} - Rendered PhoneInput Component
 */
const PhoneInput = ({phone, _updateUser: updateUser, errors, submitting}) => {
    const [inputValue, setInputValue] = useState(phone);

    // Format the phone number input with parentheses and hyphens
    const formatPhoneNumber = input => {
        const cleanedInput = input.replace(/\D/g, '');

        if (cleanedInput.length === 0) {
            return '';
        } else if (cleanedInput.length <= 3) {
            return `(${cleanedInput}`;
        } else if (cleanedInput.length <= 6) {
            return `(${cleanedInput.slice(0, 3)}) ${cleanedInput.slice(3)}`;
        } else {
            return `(${cleanedInput.slice(0, 3)}) ${cleanedInput.slice(
                3,
                6
            )}-${cleanedInput.slice(6, 10)}`;
        }
    };

    // Handle input change and update Redux state with formatted phone number
    const handleInputChange = e => {
        const newInputValue = e.target.value;

        setInputValue(formatPhoneNumber(newInputValue));
        updateUser({phone: formatPhoneNumber(newInputValue)});
    };

    // Handle backspace key to remove characters from the input
    const handleKeyDown = e => {
        if (e.key === 'Backspace') {
            const formattedValue = formatPhoneNumber(inputValue);
            const newValue = formattedValue.slice(0, -1);

            setInputValue(newValue);
        }
    };

    return (
        <TextInput
            type="text"
            value={phone}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            label="Phone"
            autoComplete="tel"
            id="phone"
            errors={errors}
            submitting={submitting}
        />
    );
};

PhoneInput.propTypes = {
    /**
     * The phone number value.
     */
    phone: PropTypes.string.isRequired,

    /**
     * Redux action to update user data.
     */
    _updateUser: PropTypes.func.isRequired,

    /**
     * Error messages for form validation.
     */
    errors: PropTypes.object.isRequired,

    /**
     * Whether the form is currently being submitted.
     */
    submitting: PropTypes.bool.isRequired,
};

/**
 * Map Redux state to component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object} Phone number from the Redux store.
 */
const mapStateToProps = state => {
    // Map Redux state to component props
    const {
        checkout: {user},
    } = state;

    return {
        phone: user.phone,
    };
};

const mapDispatchToProps = {
    _updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneInput);
