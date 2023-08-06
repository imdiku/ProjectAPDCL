const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000; // You can change this port as needed

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://hazarikaarman13:makeMytrip13@project1.zswyprl.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define a schema for the data to be saved
const submissionSchema = new mongoose.Schema({
  circle: String,
  division: String,
  subdivision: String,
  month_of_year: String,
  year: Number,
  injection: Number,
  unit_billed: Number,
  total_IRCA_collection: Number,
  demand_IRCA: Number,
  no_of_consumers: Number,
  no_of_bill_served: Number,
  subDivisionbilling_efficiency_perMonth: Number,
  subdivision_monthlyPConsumerBilling: Number,
  subDivisionAverageRevenueRealisationMonthly: Number,
  subDivisionCollectionEfficiencyMonthly: Number,
  ATandC_LossesincludingIRCA: Number
});

const SubmissionModel = mongoose.model('Submission', submissionSchema);

// Handle form data submission
app.post('/create', (req, res) => {
  const formData = req.body;

  const newSubmission = new SubmissionModel(formData);

  newSubmission
    .save()
    .then(() => res.json('Form data saved successfully'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Route to handle search based on the selected options
app.get('/view', async (req, res) => {
  const { circle, year, month } = req.query;

  try {
    // Initialize the filter based on circle
    let filter = { circle };

    // If both year and month are provided, filter by year and month
    if (year && month) {
      filter.year = year;
      filter.month_of_year = month;
    }

    // Find documents based on the filter
    const data = await SubmissionModel.find(filter).exec();

    // Filter the data based on the view option (monthly or yearly)
    const filteredData = data.map((item) => ({
      circle: item.circle,
      division: item.division,
      subdivision: item.subdivision,
      year: item.year,
      month_of_year: item.month_of_year,
      unit_billed: item.unit_billed,
      injection: item.injection,
      total_IRCA_collection: item.total_IRCA_collection,
      demand_IRCA: item.demand_IRCA,
      no_of_consumers: item.no_of_consumers,
      no_of_bill_served: item.no_of_bill_served,
      subDivisionbilling_efficiency_perMonth: item.subDivisionbilling_efficiency_perMonth,
      subdivision_monthlyPConsumerBilling: item.subdivision_monthlyPConsumerBilling,
      subDivisionAverageRevenueRealisationMonthly: item.subDivisionAverageRevenueRealisationMonthly,
      subDivisionCollectionEfficiencyMonthly: item.subDivisionCollectionEfficiencyMonthly,
      ATandC_LossesincludingIRCA: item.ATandC_LossesincludingIRCA,


      // Add other properties as needed
    }));

    res.json(filteredData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while retrieving data from the database.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});