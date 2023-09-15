import {useEffect, useState, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateActivity as _updateActivity} from '../checkout/checkout-actions';

/**
 * TrackActivity is a React component designed to monitor user activity and dispatch updates to the Redux store.
 *
 * @param {number} waitTime - The time (in milliseconds) to wait before considering the user inactive.
 * @param {number} intervalTime - The time (in milliseconds) between activity checks.
 * @param {function} _updateActivity - Redux action for updating user activity status.
 * @returns {null} This component doesn't render any visible elements and returns null.
 */
const TrackActivity = ({
    waitTime = 500,
    intervalTime = 500,
    _updateActivity: updateActivity,
}) => {
    // State variables to track timer, interval, and activity status
    /* eslint-disable no-unused-vars */
    const [_timer, setTimer] = useState(waitTime);
    const [interval, _setInterval] = useState(null);
    const [status, setStatus] = useState('active');
    const intervalRef = useRef(interval);

    // Helper function to set the interval and update the ref
    const setInterval = data => {
        intervalRef.current = data;
        _setInterval(data);
    };

    // UseEffect to update user activity status in the Redux store
    useEffect(() => {
        updateActivity(status);
    }, [status, updateActivity]);

    // Function to start user activity tracking
    const startActivity = useCallback(() => {
        setTimer(() => waitTime);
        setStatus('active');
        const start = window.setInterval(setTimer, intervalTime, timer => {
            if (timer <= 0) {
                window.clearInterval(start);
                setInterval(null);
                setStatus('inactive');
            }

            return timer - intervalTime;
        });

        setInterval(start);
    }, [intervalTime, waitTime]);

    // Function to check if the user is active and start tracking if not
    const isActive = useCallback(
        e => {
            if (e.key === 'Enter') {
                return;
            }
            if (intervalRef.current) {
                setTimer(() => waitTime);
            } else {
                startActivity();
            }
        },
        [startActivity, waitTime]
    );

    // UseEffect to initialize activity tracking and add event listeners
    useEffect(() => {
        startActivity();

        // Add a keyboard event listener to detect user activity
        window.addEventListener('keyup', isActive);

        // Clean up by clearing the interval and removing the event listener
        return () => {
            window.clearInterval(intervalRef.current);
            window.removeEventListener('keyup', isActive);
        };
    }, [waitTime, startActivity, isActive]);

    // The component doesn't render any visible elements and returns null
    return null;
};

TrackActivity.propTypes = {
    /**
     * The time (in milliseconds) to wait before considering the user inactive.
     */
    waitTime: PropTypes.number,

    /**
     * The time (in milliseconds) for when the interval should decrease the timer.
     */
    intervalTime: PropTypes.number,

    /**
     * Redux action for updating user activity status.
     */
    _updateActivity: PropTypes.func,
};

/**
 * Map Redux state to component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object} User object from the checkout state.
 */
const mapStateToProps = ({checkout: {user}}) => {
    return user;
};

const mapDispatchToProps = {
    _updateActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackActivity);
