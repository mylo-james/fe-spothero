import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Button from '../common/Button';
import Image from '../common/Image';
import {getReservation} from '../checkout/api';
import {updateSelected} from '../spot/spot-actions';
import {updateUser} from '../checkout/checkout-actions';

class Confirmation extends PureComponent {
    static propTypes = {
        email: PropTypes.string.isRequired,
        user: PropTypes.object.isRequired,
        selectedSpot: PropTypes.object,
        pushTo: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        const {selectedSpot, pushTo, user} = props;
    }

    //onMount looks for the reservation based off the the id from params
    componentDidMount() {
        // make api call for id
        getReservation(this.props.match.params.resId).then(data => {
            if (data) {
                this.props.updateSelected(data.spot);
                this.props.updateUser(data.user);
            } else {
                pushTo('/');
            }
        });
    }

    _onPurchaseAnotherClick = evt => {
        const {pushTo} = this.props;

        pushTo('/');
    };

    render() {
        const {email, selectedSpot} = this.props;

        if (!selectedSpot) {
            return null;
        }

        return (
            <div className="Confirmation">
                <h1>Park it like its hot!</h1>
                <p>
                    You successfully purchased parking at{' '}
                    <strong>{selectedSpot.title}</strong> for{' '}
                    <strong>${(selectedSpot.price / 100).toFixed(2)}</strong>.
                </p>
                <Image src={selectedSpot.image} />
                <p>
                    We emailed a receipt to{' '}
                    <a href={`mailto:${email}`}>{email}</a>.
                </p>
                <Button
                    color="primary"
                    onClick={this._onPurchaseAnotherClick}
                >
                    Purchase Another Spot!
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        checkout: {
            user: {email},
            user,
        },
        spot: {selected: selectedSpot},
    } = state;

    return {
        email,
        selectedSpot,
        user,
    };
};

const mapDispatchToProps = {
    pushTo: push,
    updateSelected,
    updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
