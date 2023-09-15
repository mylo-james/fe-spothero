import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {updateUser as _updateUser} from '../checkout/checkout-actions';

/**
 * TextInput Component: Renders a text input with label and error handling.
 *
 * @param {string} label - Label for the input.
 * @param {string} className - Additional class(es) to add to the component.
 * @param {boolean} block - Whether the input should display as a block level element.
 * @param {boolean} disabled - Whether the input is disabled or not.
 * @param {string} autoComplete - What should be used for autoComplete.
 * @param {object} user - Information about the user.
 * @param {function} _updateUser - Redux action to update user data.
 * @param {string} id - ID for the input element.
 * @param {object} errors - Error messages for form validation.
 * @param {boolean} submitting - Whether the form is currently being submitted.
 * @returns {JSX.Element} - Rendered TextInput Component
 */
const TextInput = ({
    label,
    className,
    block,
    disabled,
    autoComplete,
    user,
    _updateUser: updateUser,
    id,
    errors,
    submitting,
    setSubmitting,
    ...attrs
}) => {
    // Get the error message for the current input field
    const error = errors[id];

    // Determine whether to display the error message
    const displayError = () => {
        if (!error) {
            return false;
        } else if (submitting) {
            return true;
        }
    };

    // Create classes for the input label based on error state
    const labelClassList = [
        ...['TextInputLabel', className],
        ...[displayError() && 'TextLabelError'],
    ];
    const labelClasses = classNames(...labelClassList);
    const labelId = label.replace(/\s/g, '').toLowerCase();
    const labelOpts = {
        className: labelClasses,
        disabled,
        ...attrs,
    };

    // Function to update Redux state with user input
    const formToPayload = e => {
        updateUser({[id]: e?.target?.value});
    };

    const checkForSubmit = e => {
        if (e.key === 'Enter') {
            setSubmitting(true);
        } else {
            setSubmitting(false);
        }
    };

    // Create classes for the input element based on error state
    const inputClassList = [
        ...['TextInput', className],
        ...[displayError() && 'TextError'],
    ];
    const inputClasses = classNames(...inputClassList);
    const inputOpts = {
        className: inputClasses,
        'aria-labelledby': labelId,
        autoComplete,
        disabled,
        onChange: formToPayload,
        onKeyDown: checkForSubmit,
        value: user[id],
        id: `${id}-input`,
        ...attrs,
    };

    return (
        <>
            {
                <label
                    className={labelClasses}
                    id={labelId}
                    {...labelOpts}
                >
                    {label}
                </label>
            }
            {React.createElement('input', inputOpts)}
            {displayError() && (
                <p
                    className="errorText"
                    data-testid={`${id}-error`}
                >
                    {error}
                </p>
            )}
        </>
    );
};

TextInput.propTypes = {
    /**
     * Label for the input.
     */
    label: PropTypes.string,

    /**
     * Additional class(es) to add to the component.
     */
    className: PropTypes.string,

    /**
     * Whether the input should display as a block level element.
     */
    block: PropTypes.bool,

    /**
     * Whether the input is disabled or not.
     */
    disabled: PropTypes.bool,

    /**
     * What should be used for autoComplete.
     */
    autoComplete: PropTypes.string,

    /**
     * Information about the user.
     */
    user: PropTypes.object,

    /**
     * Redux action to update user data.
     */
    _updateUser: PropTypes.func,

    /**
     * ID for the input element.
     */
    id: PropTypes.string,

    /**
     * Error messages for form validation.
     */
    errors: PropTypes.object,

    /**
     * Whether the form is currently being submitted.
     */
    submitting: PropTypes.bool,
    /**
     * Function to set the for to be submitted.
     */
    setSubmitting: PropTypes.func,
};

/**
 * Map Redux state to component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object} User object from the Redux store.
 */
const mapStateToProps = state => {
    const {
        checkout: {user},
    } = state;

    return {
        user,
    };
};

const mapDispatchToProps = {
    _updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);
