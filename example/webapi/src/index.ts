import express from 'express';
import cors from 'cors';
import { authenticate, UserInfo } from './security';

const app = express();

app.use(cors({
    origin: (requestOrigin, callback) => callback(null, true) // allow any origin
}));

app.get('/', (req, res) => {
    res.send({ message: 'This public endpoint. Try GET /protected' });
});

app.get('/protected', authenticate, (req, res) => {

    const userId = (req.user as UserInfo)?.id;
    res.send({ message: 'This protected endpoint. UserId: ' + userId });
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`App listining in port ${port}`));
