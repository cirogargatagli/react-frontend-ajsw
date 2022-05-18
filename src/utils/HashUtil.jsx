import { sha256 } from 'js-sha256';

export const hash256 = (value) => {
    return sha256(value);
}