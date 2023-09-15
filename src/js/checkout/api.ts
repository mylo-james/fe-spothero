import Axios from 'axios';
import {v4 as uuidv4} from 'uuid';

/**
 * Define the structure of user data.
 */
interface User {
    activity?: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    sessionId: string;
    id: string;
}

/**
 * Define the structure of spot data.
 */
interface Spot {
    id: number;
    title: string;
    price: number;
    description: string;
    distance: string;
    image: string;
}

/**
 * Axios instance for making requests to the server.
 */
const axiosInstance = Axios.create({
    baseURL: 'http://localhost:8001',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

/**
 * Generates a unique session ID and stores it in sessionStorage.
 *
 * @returns {string} The generated session ID.
 */
const generateSessionId = (): string => {
    const sessionId = uuidv4();

    sessionStorage.setItem('sessionId', sessionId);

    return sessionId;
};

/**
 * Sends user data to the server, either creating a new user or updating an existing one.
 *
 * @param {string} sessionId - The session ID for the user, if available.
 * @param {User} user - The user data to send.
 * @returns {Promise<number>} The HTTP status code of the response.
 */
const sendUser = async (sessionId: string, user: User): Promise<number> => {
    try {
        // Get the session ID from sessionStorage or generate one if it doesn't exist
        const method = sessionId ? 'put' : 'post';
        const id = sessionId || generateSessionId();
        // Determine the method based on whether the resource already exists
        const url = method === 'put' ? `/users/${sessionId}` : '/users';

        user.id = sessionId || id;
        delete user.activity;

        const response = await axiosInstance.request({
            url,
            method,
            data: JSON.stringify(user),
        });

        return response.status;
    } catch (error) {
        throw error;
    }
};

/**
 * Sends reservation data to the server.
 *
 * @param {Spot} spot - The reservation spot data.
 * @param {User} user - The user data associated with the reservation.
 * @returns {Promise<number>} The HTTP status code of the response.
 */
const sendReservation = async (spot: Spot, user: User): Promise<number> => {
    try {
        const url = '/reservations';
        const payload = {
            spot: spot.id,
            user: user.id,
        };

        const response = await axiosInstance.post(url, payload);

        return response.status;
    } catch (error) {
        throw error;
    }
};

export {sendUser, sendReservation, generateSessionId};
