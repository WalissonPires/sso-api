import axios from 'axios';
import jwt from 'jsonwebtoken';

export async function authenticate (req, res, next) {

    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {

        res.status(401).send({ message: 'Token is missing' });
    }

    const publicKey = await getSSOPublicKey();

    let payload = null;
    try {
        payload = jwt.verify(token, publicKey);
    }
    catch(error) {

        console.log(error);

        res.status(401).send({ message: 'Token invalid' });
        return;
    }

    req.user = {
        id: payload.sub
    };

    next();
}


let publicKey = null;

async function getSSOPublicKey() {

    if (publicKey)
        return publicKey;

    const response = await axios.get('http://localhost:3000/token/publicKey');
    publicKey = response.data?.publicKey;

    if (!publicKey)
        throw new Error('Fail get SSO public key');

    return publicKey;
}