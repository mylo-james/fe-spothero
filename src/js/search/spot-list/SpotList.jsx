import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import TextButton from '../../common/TextButton';
import SpotItem from '../../spot/SpotItem';
import Button from '../../common/Button';
import {DESTROY_USER, destroyUser} from '../../checkout/checkout-actions';
import {connect} from 'react-redux';

class SpotList extends PureComponent {
    static propTypes = {
        selectedSpot: PropTypes.object,
        spots: PropTypes.arrayOf(PropTypes.object).isRequired,
        setSpot: PropTypes.func.isRequired,
        destroyUser: PropTypes.func,
    };

    componentDidMount() {
        document
            .getElementsByClassName('SpotItem-selected')[0]
            ?.scrollIntoView();
    }

    _onDetailsClick = spot => {
        this.props.setSpot(spot);
    };

    // Clears the session storage and triggers the Redux action to destroy user data.
    _onRemoveSession = () => {
        sessionStorage.clear();
        this.props.destroyUser({type: DESTROY_USER});
    };

    render() {
        const {selectedSpot, spots} = this.props;

        return (
            <div className="SpotList">
                <div className="SpotList-feature">
                    <div className="SpotList-breadcrumbs">
                        <TextButton>Chicago</TextButton> &gt; Millennium Park
                    </div>
                    <h1>Millennium Park</h1>
                    <div className="buttonContainer">
                        <p>{spots.length} Spots Available</p>
                        <Button onClick={this._onRemoveSession}>
                            Clear Session
                        </Button>
                    </div>
                </div>
                <div className="SpotList-spots">
                    {spots.map(spot => {
                        return (
                            <SpotItem
                                key={spot.id}
                                data={spot}
                                isSelected={selectedSpot?.id === spot.id}
                                onDetailsClick={this._onDetailsClick}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    destroyUser: () => dispatch(destroyUser()),
});

export default connect(null, mapDispatchToProps)(SpotList);
