
const alphabetStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Returns a random string of length 16
 */
export default function randomTokenID(): string {
    const len = 16;
    let str = "";
    for(let i = 0; i < len; i++) {
        str += alphabetStr[Math.floor(Math.random() * alphabetStr.length)];
    }

    return str;
}