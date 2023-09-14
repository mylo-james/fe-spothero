import {screen, within} from '@testing-library/react';
import SpotDetails from './SpotDetails';
import {spots} from '../../../../back-end/db.json';
import {createBrowserHistory} from 'history/cjs/history';
import renderWithProviders from '../../store/testUtils';
import {USDollar} from '../../../utils';

describe('it should render information for each spot', () => {
    test.each(spots)(`Index %#`, spot => {
        renderWithProviders(<SpotDetails />, {spot: {selected: spot}});

        const modal = screen.getByRole('modal');
        const h3 = within(modal).getByRole('heading', {level: 3});
        const h4 = within(modal).getByRole('heading', {level: 4});
        const title = within(modal).getByText(spot.title);
        const description = within(modal).getByTestId('spotDescription');
        const button = within(modal).getByRole('button');

        expect(h3).toHaveTextContent('Spot Details');
        expect(h4).toHaveTextContent(spot.title);
        expect(title).toHaveTextContent(spot.title);
        expect(description).toHaveTextContent(spot.description, {
            normalizeWhitespace: false,
        });
        expect(button).toHaveTextContent(
            `${USDollar.format(spot.price / 100)} | Book It!`
        );
    });
});

describe('navigation', () => {
    test('it should navigate to checkout when the modal button is clicked', () => {
        const history = createBrowserHistory();

        renderWithProviders(<SpotDetails />);
        const modal = screen.getByRole('modal');
        const button = within(modal).getByRole('button');
        button.click();
        expect(window.location.pathname).toBe('/checkout');
    });
});
