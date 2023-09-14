import {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateActivity} from '../checkout/checkout-actions';

const TrackActivity = ({
    waitTime = 500,
    intervalTime = 500,
    updateActivity,
}) => {
    const [_timer, setTimer] = useState(waitTime);
    const [interval, _setInterval] = useState(null);
    const [status, setStatus] = useState('active');
    const intervalRef = useRef(interval);

    const setInterval = data => {
        intervalRef.current = data;
        _setInterval(data);
    };

    useEffect(() => {
        updateActivity(status);
    }, [status]);

    const startActivity = () => {
        setTimer(_timer => waitTime);
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
    };

    useEffect(() => {
        startActivity();
        const isActive = () => {
            if (intervalRef.current) {
                setTimer(_timer => waitTime);
            } else {
                startActivity();
            }
        };
        window.addEventListener('mousemove', isActive);
        window.addEventListener('keydown', isActive);
        return () => {
            window.clearInterval(interval);
            window.removeEventListener('mousemove', isActive);
            window.removeEventListener('keydown', isActive);
        };
    }, []);

    return null;
};

TrackActivity.propTypes = {
    user: PropTypes.object,
};

const mapStateToProps = ({checkout: {user}}) => {
    return user;
};

const mapDispatchToProps = {
    updateActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackActivity);
