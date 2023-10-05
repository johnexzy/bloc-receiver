import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import sendWebHook from './webhookParser';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8090;
app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json('Server Ready');
});

// webhook
app.post("/webhook", async (req, res) => {
    const { body } = req;
    try {
        console.log(body);
        sendWebHook(body, process.env.SLACKHOOK as string)
    } catch (e) {
        console.log(e);
        return res.status(400).json();
    }
    return res.status(200).json();
});
app.listen(port, () => {
    console.log(`Listening for API Calls on port: ${port}`);
});