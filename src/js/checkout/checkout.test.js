import {cleanup, fireEvent, render, screen, within} from '@testing-library/react';
import Checkout from './Checkout';
import {USDollar} from '../../utils';
import {spots} from '../../../back-end/db.json';
import renderWithProviders from '../store/testUtils';

afterEach(cleanup);

describe('it should render the checkout form for each spot', () => {
    test.each(spots)(`Index %#`, spot => {
        renderWithProviders(<Checkout />, {spot: {selected: spot}});
        const nav = screen.getByRole('navigation');
        const h1 = screen.getByRole('heading');
        const img = screen.getByRole('img');
        const distance = screen.getByText(spot.distance);
        const br = screen.getByTestId('break');
        const form = screen.getByTestId('checkout form');

        expect(nav).toHaveTextContent('Back to Search');
        expect(h1).toHaveTextContent(spot.title);
        expect(img).toHaveAttribute('src', spot.image);
        expect(distance).toHaveTextContent(spot.distance);
        expect(br).toBeVisible();
        expect(form).toBeVisible();

        const inputLabels = [
            'First Name',
            'Last Name',
            'Email',
            'Phone Number',
        ];

        inputLabels.forEach(label => {
            const input = within(form).getByLabelText(label);
            expect(input).toBeVisible();
        });

        const submit = within(form).getByRole('button');

        expect(submit).toHaveTextContent(
            `Purchase for ${USDollar.format(spot.price / 100)}`
        );
    });
});



describe('First Name input', () => {
    const setup = () => {
        const utils = renderWithProviders(<Checkout />, {
            spot: {selected: spots[0]},
        });
        const input = screen.getByLabelText('First Name');
        return {
            input,
            ...utils,
        };
    };
    test('it should have class "focus" when it is focused',() => {
        const {input} = setup();
        input.focus();
        expect(input).toHaveClass('focus');
    });
});

describe("Submit", ()=> {
    const submit = () => {
        const form = screen.getByTestId('checkout form');
        const submit = within(form).getByRole('button');
        submit.click();
    }
})