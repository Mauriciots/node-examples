const express = require('express');
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://mauricio-ciccc:fxAfIP2jXfQ74CaN@jobifycluster.s1zyv.mongodb.net/week_assignments?retryWrites=true&w=majority";

const server = express();
server.use(express.json());

server.get('/', (_req, res) => {
    res.json({ hello: 'world' });
});

server.get('/students', async (_, res) => {
    const projection = { id: 1, name: 1, email: 1, class_id: 1, _id: 0 };
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db();

        const students = await db
            .collection('students')
            .find()
            .project(projection)
            .sort({ class_id: 1 })
            .toArray();

        await client.close();
        res.json(students);
    } catch(err) {
        await client.close();
        res.status(500).send(err);
    }
});

server.post('/students', (req, res) => {
    res.json(req.body);
});

server.listen(3030, () => console.log('Server listening on port 3030'));