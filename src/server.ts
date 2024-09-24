import express, { Request, Response } from 'express';
import { Producer } from 'sqs-producer';
import { SQSClient } from '@aws-sdk/client-sqs';
import dotenv from "dotenv";
dotenv.config();

const producer = Producer.create({
    queueUrl: 'https://sqs.eu-north-1.amazonaws.com/124355649508/CreatePostsMQ',
    region: 'eu-north-1',
    sqs: new SQSClient({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESSKEY_ID ?? "",
        secretAccessKey: process.env.AWS_ACCESSKEY_SECRET ?? ""
      }
    })
});
  
  // send messages to the queue
// await producer.send(['msg1', 'msg2']);

const app: any = express();
const bodyparser = require('body-parser')
app.use(bodyparser.json())

const PORT: number = 5000;

const generateId = () => {
    return `msg-${Date.now()}`;
};

app.get('/api/v1/posts/create', async (req: Request, res: Response) => {
    let date: Date = new Date();  
    const response = {
        origin: "You got the response from the create-server",
        data: req.body.data,
        time: date
    };

    await producer.send({
        id: generateId(),
        body: JSON.stringify(response)
    });
    res.send(response);
});

app.get("/health" , (req:Request,res:Response)=>{
  res.send(
    {
      data:"I am from Create Server",
      message:"Health checks are successful"
    }
)
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
