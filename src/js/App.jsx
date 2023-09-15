/* eslint-disable react/jsx-no-bind */
import {hot} from 'react-hot-loader/root';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import Checkout from './checkout/Checkout';
import Confirmation from './confirmation/Confirmation';
import Search from './search/Search';
import '../sass/main.scss';
import Axios from 'axios';

const App = ({spots}) => {
    const dispatch = useDispatch();

    // UseEffect to fetch user data when the component mounts
    useEffect(() => {
        (async () => {
            const sessionId = sessionStorage.getItem('sessionId');

            if (sessionId) {
                // Fetch user data based on sessionId
                const {data} = await Axios.get(`/users/${sessionId}`);

                dispatch({type: 'UPDATE_USER', payload: data});
            }
        })();
    }, [dispatch]);

    return (
        <Switch>
            <Route
                exact
                path="/"
                render={() => {
                    return <Search spots={spots} />;
                }}
            />
            <Route
                path="/checkout/:id"
                render={() => {
                    return (
                        <Checkout
                            spots={spots}
                            selectedSpot={spots.selectedSpot}
                        />
                    );
                }}
            />
            <Route
                path="/confirmation"
                component={Confirmation}
            />
        </Switch>
    );
};

App.propTypes = {
    spots: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default hot(App);
