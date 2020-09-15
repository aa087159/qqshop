var express = require('express');
var router = express.Router();
require('dotenv').config();
const assert = require('assert');
const dbName = 'doggies';
const DB_URL = process.env.MONGODB_URI;
const dbCollection = 'messages';
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(DB_URL, { useUnifiedTopology: true });

router.post('/', (req, res, next) => {
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

module.exports = router;
