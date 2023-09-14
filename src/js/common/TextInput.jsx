import React, {forwardRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {updateUser} from '../checkout/checkout-actions';

const TextInput = ({
    label,
    className,
    block,
    disabled,
    autoComplete,
    user,
    updateUser,
    id,
    ...attrs
}) => {
    const labelClasses = classNames('TextInputLabel', className);
    const labelId = label.replace(/\s/g, '').toLowerCase();
    const labelOpts = {
        className: labelClasses,
        disabled,
        ...attrs,
    };

    const formToPayload = e => {
        updateUser({[id]: e?.target?.value});
    };

    const inputClasses = classNames('TextInput', className);
    const inputOpts = {
        className: inputClasses,
        'aria-labelledby': labelId,
        autoComplete,
        disabled,
        onChange: formToPayload,
        value: user[id],
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
        </>
    );
};

TextInput.propTypes = {
    /** Label for the input */
    label: PropTypes.string,
    /** Additional class(es) to add to the component. */
    className: PropTypes.string,
    /** Whether the input should display as a block level element. */
    block: PropTypes.bool,
    /** Whether the input is disabled or not. */
    disabled: PropTypes.bool,
    /** What should be used for autoComplete */
    autoComplete: PropTypes.string,
    /** Information about the user */
    user: PropTypes.object,
};

const mapStateToProps = state => {
    const {
        checkout: {user},
    } = state;

    return {
        user,
    };
};

const mapDispatchToProps = {
    updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);
