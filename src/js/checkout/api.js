import Axios from 'axios';
import {v4} from 'uuid';

const headers = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

const sendUser = (id, user) => {
    let method = Axios.post;
    let url = '/users';
    if (!id) {
        const string = v4();
        sessionStorage.setItem('sessionId', string);
        id = string;
    } else {
        method = Axios.put;
        url += `/${id}`;
    }
    const payload = JSON.stringify({
        ...user,
        id,
    });
    try {
        method(url, payload, headers);
    } catch (e) {
        console.error(e);
    }
};
const sendReservation = async (spot, user) => {
    let method = Axios.post;
    let url = '/reservations';
    const payload = JSON.stringify({
        spot,
        user,
    });
    try {
        const res = await method(url, payload, headers);
        return res.status;
    } catch (e) {
        console.error(e);
        return res;
    }
};

export {sendUser, sendReservation};
