const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const swaggerService = require("./libs/swagger");
const mongoose = require('mongoose');
const schedule = require('node-schedule');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log(process.env.DATABASE_URL);
    console.log("Connection failed");
  });

app.listen(port, () => {
  console.log(`Server is running on host: 192.168.1.65, port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const routes = require("./routes");

app.use("/api", routes);
app.use(
  "/api-docs",
  swaggerService.serveSwaggerUI,
  swaggerService.setupSwaggerUI
);


const ApprovalModel = mongoose.model('Approval'); // Replace 'Approval' with your actual model name

async function updateApprovalStatus() {
  try {
    const currentDate = new Date();
    const approvals = await ApprovalModel.find({ isApproved: false, deadlineApprove: { $lte: currentDate } });
    console.log("There are " + approvals.length + " approvals")
    for (const approval of approvals) {
      let allApproved = true;

      for (const approver of approval.history) {
        if (approver.log.length === 0 || approver.log[approver.log.length - 1].status !== 'Approved') {
          allApproved = false;
          break;
        }
      }

      if (allApproved) {
        approval.isApproved = true;
      } else {
        approval.isApproved = false;
      }

      await approval.save();
    }

    console.log("Running approval status update...done");
  } catch (error) {
    console.error('Error while updating approval status:', error);
  }
}

const job = schedule.scheduleJob('*/5 * * * * *', async () => {
  console.log('Running approval status update...');
  await updateApprovalStatus();
});

