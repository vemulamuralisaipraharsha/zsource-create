import express, { Request, Response } from 'express'
const app: any = express();
const bodyparser = require('body-parser')
app.use(bodyparser.json())
const PORT: number = 5000;

app.get('/api/v1/posts/create', (req: Request, res: Response) => {
    let date: Date = new Date();  
    res.send({
        origin:"You got the response from the create-server",
        data:req.body.data,
        time:date
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
