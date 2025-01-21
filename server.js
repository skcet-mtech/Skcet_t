const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// App setup
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
const mongoURI = 'mongodb+srv://1822snsctcse:<db_password>@skcet.1csd6.mongodb.net/?retryWrites=true&w=majority&appName=skcet';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error(err));

// Schema and Model
const DataSchema = new mongoose.Schema({ name: String });
const Data = mongoose.model('Data', DataSchema);

// Routes
app.get('/data', async (req, res) => {
	const data = await Data.find();
	res.json(data);
});

app.post('/data', async (req, res) => {
	const newData = new Data(req.body);
	await newData.save();
	res.json(newData);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	