const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000; // Set your desired port number here

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb+srv://adishreekbsc22:adiais@cluster0.bxclcpa.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const legSchema = new mongoose.Schema({
  city1: String,
  city2: String,
  cost: Number
});

const Leg = mongoose.model('Leg', legSchema);

const routeSchema = new mongoose.Schema({
  legs: [legSchema]
});

const Route = mongoose.model('Route', routeSchema);

app.post('/route', (req, res) => {
  const numLegs = req.body.numLegs;
  const legs = [];

  for (let i = 0; i < numLegs; i++) {
    const city1 = req.body[`city1_${i}`];
    const city2 = req.body[`city2_${i}`];
    const cost = parseInt(req.body[`cost_${i}`]);
    const leg = new Leg({ city1, city2, cost });
    legs.push(leg);
  }

  const route = new Route({ legs });

  route.save()
    .then((savedRoute) => {
      res.json(savedRoute);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to save route' });
    });
});

mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

mongoose.connection.on('connected', () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});
