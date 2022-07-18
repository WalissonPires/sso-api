import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function authenticate (req: Request, res: Response, next: NextFunction): Promise<void> {

    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        res.status(401).send({ message: 'Token is missing' });
        return;
    }

    const publicKey = await getSSOPublicKey();

    try {
        const payload = jwt.verify(token, publicKey);

        (req as RequestWithUser).user = {
            id: payload.sub as string
        };
    }
    catch(error) {
        res.status(401).send({ message: 'Token invalid' });
        return;
    }

    next();
}

export type UserInfo = { id: string };
export interface RequestWithUser extends Request {
    user?: UserInfo;
}



let publicKey: string | null = null;
const SSOApiPublickKeyEndpoint = 'http://localhost:3000/token/publicKey';

async function getSSOPublicKey(): Promise<string> {

    if (publicKey)
        return publicKey;

    const response = await axios.get(SSOApiPublickKeyEndpoint);
    publicKey = (response.data as SSOPublicKeyResponse)?.publicKey;

    if (!publicKey)
        throw new Error('Fail get SSO public key');

    return publicKey;
}

type SSOPublicKeyResponse = { publicKey: string };