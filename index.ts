import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import sendWebHook from './webhookParser';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
app.use(cors())
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
    return res.status(400).json('Server Ready');
});
// webhook
app.post("/webhook", async (req, res) => {
    const { body } = req;
    try {
        console.log(body);
        sendWebHook(body, 'https://hooks.slack.com/services/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')
    } catch (e) {
        console.log(e);
        return res.status(400).json();
    }
    return res.status(200).json();
});
app.listen(port, () => {
    console.log(`Listening for API Calls on port: ${port}`);
});