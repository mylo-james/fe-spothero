import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import {spots} from '../../../../back-end/db.json';
import SpotDetails from './SpotDetails';
import {USDollar} from '../../../utils';

const mockStore = configureMockStore();

const renderWithSelectedSpot = () => {
    const initialState = {
        spot: {
            selected: spots[0],
        },
    };

    const store = mockStore(initialState);

    return {
        ...render(
            <Provider store={store}>
                <MemoryRouter>
                    <SpotDetails />
                </MemoryRouter>
            </Provider>
        ),
        store,
    };
};

describe('SpotDetails Component', () => {
    it('renders the SpotDetails component with selected spot', () => {
        renderWithSelectedSpot();

        const modal = screen.getByRole('modal');
        expect(modal).toBeInTheDocument();

        expect(screen.getByText(spots[0].title)).toBeInTheDocument();
        expect(screen.getByText(spots[0].description)).toBeInTheDocument();
        const priceInDollars = USDollar.format(spots[0].price / 100);
        expect(
            screen.getByText(`${priceInDollars} | Book It!`)
        ).toBeInTheDocument();
    });
});
