import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import TextButton from '../../common/TextButton';
import {updateSelected} from '../../spot/spot-actions';
import {USDollar} from '../../../utils';
import {connect} from 'react-redux';
import {push as dispatchPush} from 'connected-react-router';
import Button from '../../common/Button';

const SpotDetails = ({selectedSpot, dispatchPush: push, setSpot}) => {
    const modal = useRef('modal');

    useEffect(() => {
        modal.current.classList.add('fadeIn');
    }, []);

    const removeModal = () => {
        modal.current.classList.remove('fadeIn');
        setTimeout(setSpot, 200, null);
    };

    return (
        <main
            className="SpotDetails"
            ref={modal}
        >
            <section role="modal">
                <Button onClick={removeModal}>{'\u2715'}</Button>
                <div className="info">
                    <h3>Spot Details</h3>
                    <h4>{selectedSpot.title}</h4>
                    <p data-testid="spotDescription">
                        {selectedSpot.description}
                    </p>
                    <TextButton
                        onClick={() => push(`/checkout/${selectedSpot.id}`)}
                    >
                        {`${USDollar.format(
                            selectedSpot.price / 100
                        )} | Book It!`}
                    </TextButton>
                </div>
            </section>
        </main>
    );
};

SpotDetails.propTypes = {
    selectedSpot: PropTypes.object,
    dispatchPush: PropTypes.func,
    setSpot: PropTypes.func,
};

const mapStateToProps = state => {
    const {
        spot: {selected: selectedSpot},
    } = state;

    return {
        selectedSpot,
    };
};

const mapDispatchToProps = {
    setSpot: updateSelected,
    dispatchPush,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotDetails);
