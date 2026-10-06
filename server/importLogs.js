const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");

require("dotenv").config();


// ===============================
// LOG SCHEMA
// ===============================

const logSchema = new mongoose.Schema({
    log_id: String,
    timestamp: String,
    subsystem: String,
    severity: String,
    event: String,
    description: String
});

const MissionLog = mongoose.model("MissionLog", logSchema);


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log("MongoDB connected successfully");

        const results = [];

        fs.createReadStream("../data/logs/mission_logs.csv")

            .pipe(csv())

            .on("data", (data) => {

                results.push({
                    log_id: data.log_id,
                    timestamp: data.timestamp,
                    subsystem: data.subsystem,
                    severity: data.severity,
                    event: data.event,
                    description: data.description
                });

            })

            .on("end", async () => {

                try {

                    await MissionLog.deleteMany({});

                    await MissionLog.insertMany(results);

                    console.log(
                        `${results.length} mission log records imported successfully!`
                    );

                    mongoose.connection.close();

                } catch (error) {

                    console.log(
                        "Import failed:",
                        error.message
                    );

                }

            })

            .on("error", (error) => {

                console.log(
                    "CSV reading error:",
                    error.message
                );

            });

    })

    .catch((error) => {

        console.log(
            "MongoDB connection failed:",
            error.message
        );

    });