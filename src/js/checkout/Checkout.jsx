import React, {useEffect} from 'react';
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
import {sendUser, sendReservation} from './api';

const Checkout = ({
    selectedSpot,
    dispatchPush: push,
    setSpot,
    spots,
    activity,
    user,
}) => {
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            if (activity === 'inactive') {
                sendUser(sessionStorage.getItem('sessionId'), user);
            }
        })();
    }, [activity]);

    useEffect(() => {
        setSpot(spots[id - 1]);
    }, [id, spots, setSpot]);

    const onSubmit = async e => {
        e.preventDefault;
        const res = await sendReservation(selectedSpot, user);
        console.log(res)
        if (res === 201) {
            push('/confirmation');
        }
        
    };

    return (
        selectedSpot && (
            <div className="Checkout">
                <TrackActivity />
                <nav role="navigation">
                    <TextButton onClick={() => push('/')}>
                        {'< Back to Search'}
                    </TextButton>
                </nav>
                <section>
                    <header>
                        <Image src={selectedSpot?.image} />
                        <div>
                            <h1 className="headerText">
                                {selectedSpot?.title}
                            </h1>
                            <p>{selectedSpot.distance}</p>
                        </div>
                    </header>
                    <form data-testid="checkout form">
                        <TextInput
                            label="First Name"
                            autoComplete="given-name"
                            id="fname"
                        />
                        <TextInput
                            label="Last Name"
                            autoComplete="family-name"
                            id="lname"
                        />
                        <TextInput
                            label="Email Name"
                            autoComplete="email"
                            id="email"
                        />
                        <TextInput
                            label="Phone Name"
                            autoComplete="tel"
                            id="phone"
                        />
                        <Button onClick={onSubmit}>
                            {`Purchase for ${USDollar.format(
                                selectedSpot.price / 100
                            )}`}
                        </Button>
                    </form>
                </section>
            </div>
        )
    );
};

Checkout.propTypes = {
    selectedSpot: PropTypes.object,
    dispatchPush: PropTypes.func,
    setSpot: PropTypes.func,
    spots: PropTypes.array,
    activity: PropTypes.string,
    user: PropTypes.object,
};

const mapStateToProps = state => {
    const {
        spot: {selected: selectedSpot},
        checkout: {
            user: {activity},
            user,
        },
    } = state;

    return {
        selectedSpot,
        activity,
        user,
    };
};

const mapDispatchToProps = {
    setSpot: updateSelected,
    dispatchPush,
    updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
