import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateSelected} from '../spot/spot-actions';
import {updateUser} from '../checkout/checkout-actions';
import TextButton from '../common/TextButton';
import Image from '../common/Image';
import {push as dispatchPush} from 'connected-react-router';
import {USDollar} from '../../utils';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import {useParams} from 'react-router-dom';
import TrackActivity from '../trackActivity/TrackActivity';
import {sendUser, sendReservation} from './api.ts';
import Validation from './Validation';
import PhoneInput from '../common/PhoneInput';

/**
 * Checkout Component: Allows users to make reservations and complete purchases.
 *
 * @param {object} selectedSpot - The selected spot for reservation.
 * @param {function} dispatchPush - Redux action to navigate to different pages.
 * @param {function} setSpot - Redux action to update the selected spot.
 * @param {array} spots - List of available spots.
 * @param {object} user - User information for reservation.
 * @returns {JSX.Element} - Rendered Checkout Component
 */
const Checkout = ({selectedSpot, dispatchPush: push, setSpot, spots, user}) => {
    const {id} = useParams();

    // State for form errors and submission status
    const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
    });
    const [submitting, setSubmitting] = useState(false);

    // Effect to handle user activity and submission
    useEffect(() => {
        if (user.activity === 'active') {
            // Reset submission status when the user is active
            setSubmitting(false);
        }
        if (user.activity === 'inactive') {
            // Send user data when the user is inactive
            sendUser(sessionStorage.getItem('sessionId'), user);
        }
    }, [user]);

    // Effect to set the selected spot
    useEffect(() => {
        setSpot(spots[id - 1]);
    }, [id, spots, setSpot]);

    // Effect to handle form submission and reservation
    useEffect(() => {
        (async () => {
            // Check if there are errors in the form
            const hasErrors = !Object.values(errors).every(error => !error);

            if (!hasErrors && submitting) {
                // Send the reservation when there are no errors
                const res = await sendReservation(selectedSpot, user);

                if (res === 201) {
                    // Redirect to confirmation page on successful reservation
                    push('/confirmation');
                }
            }
        })();
    }, [submitting, errors, push, selectedSpot, user]);

    // Function to focus errors, if any
    const focusError = () => {
        const inputs = Object.keys(errors);

        for (let i = 0; i < inputs.length; i++) {
            const key = inputs[i];
            const error = errors[key];

            if (error) {
                const element = document.getElementById(`${key}-input`);
                
                element.focus();
                break;
            }
        }
    };

    // Function to handle form submission
    const validateOnSubmit = e => {
        e.preventDefault();
        focusError();
        setSubmitting(true);
    };

    // Render
    return selectedSpot ? (
        <div
            className="Checkout"
            data-testid="checkout-main"
        >
            <TrackActivity />
            <Validation
                errors={errors}
                setErrors={setErrors}
                submitting={submitting}
            />
            <nav role="navigation">
                <TextButton onClick={() => push('/')}>
                    &lt; Back to Search
                </TextButton>
            </nav>
            <section>
                <header>
                    <Image src={selectedSpot?.image} />
                    <div>
                        <h1 className="headerText">{selectedSpot?.title}</h1>
                        <p>{selectedSpot.distance}</p>
                    </div>
                </header>
                <form
                    onSubmit={validateOnSubmit}
                    data-testid="checkout-form"
                >
                    <TextInput
                        label="First Name"
                        autoComplete="given-name"
                        id="fname"
                        errors={errors}
                        submitting={submitting}
                        setSubmitting={setSubmitting}
                    />
                    <TextInput
                        label="Last Name"
                        autoComplete="family-name"
                        id="lname"
                        errors={errors}
                        submitting={submitting}
                        setSubmitting={setSubmitting}
                    />
                    <TextInput
                        label="Email"
                        autoComplete="email"
                        id="email"
                        errors={errors}
                        submitting={submitting}
                        setSubmitting={setSubmitting}
                    />
                    <PhoneInput
                        errors={errors}
                        submitting={submitting}
                        setSubmitting={setSubmitting}
                    />
                    <Button type="submit">
                        {`Purchase for ${USDollar.format(
                            selectedSpot.price / 100
                        )}`}
                    </Button>
                </form>
            </section>
        </div>
    ) : null;
};

Checkout.propTypes = {
    /**
     * The selected spot for reservation.
     */
    selectedSpot: PropTypes.object,

    /**
     * Redux action to navigate to different pages.
     */
    dispatchPush: PropTypes.func,

    /**
     * Redux action to update the selected spot.
     */
    setSpot: PropTypes.func,

    /**
     * List of available spots.
     */
    spots: PropTypes.array,

    /**
     * User information for reservation.
     */
    user: PropTypes.object,
};

/**
 * Map Redux state to component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object} User object and selected spot from the Redux store.
 */
const mapStateToProps = state => {
    const {
        spot: {selected: selectedSpot},
        checkout: {user},
    } = state;

    return {
        selectedSpot,
        user,
    };
};

const mapDispatchToProps = {
    setSpot: updateSelected,
    dispatchPush,
    updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
