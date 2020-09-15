require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const cors = require('cors');
const DB_URL = process.env.MONGODB_URI;
const dbName = 'doggies';
const dbCollection = 'messages';
const client = new MongoClient(DB_URL, { useUnifiedTopology: true });

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors());

app.use(express.json());

// app.get('/', (req, res) => {
// 	client.connect((err) => {
// 		res.json({
// 			message: 'doggies!',
// 		});
// 	});
// });

app.post('/api/postMessages', (req, res) => {
	client.connect((error) => {
		if (error) throw error;
		const db = client.db(dbName);

		const postsCollection = db.collection(dbCollection);
		postsCollection.find().toArray(async (err, result) => {
			postsCollection.insertOne(
				{
					name: req.body.name,
					email: req.body.email,
					message: req.body.message,
					postedAt: new Date(),
				},
				(err, result) => {
					assert.strictEqual(err, null);
					assert.strictEqual(1, result.result.n);
					assert.strictEqual(1, result.ops.length);
					res.json({ message: 'message posted' });
				}
			);
		});
	});
});

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('./client/build'));
}

app.listen(port, () => {
	console.log(`${process.env.PORT || 'http://localhost:3000'} `);
});
