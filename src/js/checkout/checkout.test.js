import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route} from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import Checkout from './Checkout';
import {blankUser, invalidUser, validUser} from './testData'; // Import users
import {spots} from '../../../back-end/db.json'; // Assuming you have imported spots correctly
import * as api from './api';
import {USDollar} from '../../utils';

const mockStore = configureMockStore();

const renderWithTestData = (selected, user) => {
    const initialState = {
        spot: {selected},
        checkout: {
            user,
        },
    };

    const store = mockStore(initialState);

    return {
        ...render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/checkout/1']}>
                    <Route path="/checkout/:id">
                        <Checkout spots={spots} />
                    </Route>
                </MemoryRouter>
            </Provider>
        ),
        store,
    };
};

describe('Checkout Component', () => {
    let sendReservationSpy;

    beforeEach(() => {
        sendReservationSpy = jest.spyOn(api, 'sendReservation');
    });

    afterEach(() => {
        sendReservationSpy.mockRestore();
    });
    describe('Rendering', () => {
        const users = [
            {name: 'Blank User', user: blankUser},
            {name: 'Invalid User', user: invalidUser},
            {name: 'Valid User', user: validUser},
        ];

        users.forEach(({name, user}) => {
            it(`renders the Checkout component with ${name}`, () => {
                renderWithTestData(spots[0], user);

                const checkoutComponent = screen.getByTestId('checkout-main');
                expect(checkoutComponent).toBeInTheDocument();

                expect(screen.getByTestId('checkout-form')).toBeInTheDocument();
                expect(screen.getByLabelText('First Name')).toBeInTheDocument();
                expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
                expect(screen.getByLabelText('Email')).toBeInTheDocument();
                expect(screen.getByLabelText('Phone')).toBeInTheDocument();

                const purchaseButton = screen.getByText(
                    `Purchase for ${USDollar.format(spots[0].price / 100)}`
                );

                const searchButton = screen.getByRole('button', {
                    name: '< Back to Search',
                });

                expect(purchaseButton).toBeInTheDocument();
                expect(searchButton).toBeInTheDocument();

                expect(screen.queryByText('First name is required')).toBeNull();
                expect(screen.queryByText('Last name is required')).toBeNull();
                expect(
                    screen.queryByText('Email address is required')
                ).toBeNull();
                expect(
                    screen.queryByText('Phone number is required')
                ).toBeNull();
            });
        });
    });

    describe('Form Submission', () => {
        it('handles form submission for a blank user', () => {
            const {container} = renderWithTestData(spots[0], blankUser);

            const purchaseButton = screen.getByText(
                `Purchase for ${USDollar.format(spots[0].price / 100)}`
            );
            fireEvent.click(purchaseButton);

            expect(
                screen.getByText('First name is required')
            ).toBeInTheDocument();
            expect(
                screen.getByText('Last name is required')
            ).toBeInTheDocument();
            expect(
                screen.getByText('Email address is required')
            ).toBeInTheDocument();
            expect(
                screen.getByText('Phone number is required')
            ).toBeInTheDocument();

            expect(container.querySelector('.Checkout')).toBeInTheDocument();

            expect(sendReservationSpy).not.toHaveBeenCalled();
        });

        it('handles form submission for an invalid user', () => {
            const {container} = renderWithTestData(spots[0], invalidUser);

            const purchaseButton = screen.getByText(
                `Purchase for ${USDollar.format(spots[0].price / 100)}`
            );
            fireEvent.click(purchaseButton);

            expect(
                screen.getByText('Please enter a valid first name')
            ).toBeInTheDocument();
            expect(
                screen.getByText('Please enter a valid last name')
            ).toBeInTheDocument();
            expect(
                screen.getByText('Please enter a valid email address')
            ).toBeInTheDocument();
            expect(
                screen.getByText('Please enter a valid phone number')
            ).toBeInTheDocument();

            expect(container.querySelector('.Checkout')).toBeInTheDocument();

            expect(sendReservationSpy).not.toHaveBeenCalled();
        });

        it('handles form submission for a valid user', async () => {
            const {container} = renderWithTestData(spots[0], validUser);

            const purchaseButton = screen.getByText(
                `Purchase for ${USDollar.format(spots[0].price / 100)}`
            );
            fireEvent.click(purchaseButton);

            expect(sendReservationSpy).toHaveBeenCalledTimes(1);
        });
    });
});
