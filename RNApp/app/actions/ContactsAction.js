import { CONTACT_PRESSED } from './types';

export const contactPressed = (contact) => {
    return {
        type: CONTACT_PRESSED,
        payload: contact,
    };
};
