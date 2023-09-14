import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import createStore from './store'
import {spots} from '../../../back-end/db.json'

export default function renderWithProviders (ui, initalState = {spot: {selected: spots[0]}}) {
    render(<Provider store={createStore(initalState)}>{ui}</Provider>);
};
