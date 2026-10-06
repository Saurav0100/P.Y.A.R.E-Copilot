const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");

require("dotenv").config();


// ===============================
// TELEMETRY SCHEMA
// ===============================

const telemetrySchema = new mongoose.Schema({
    id: String,
    timestamp: String,
    battery: Number,
    voltage: Number,
    temperature: Number,
    power_consumption: Number,
    signal_strength: Number,
    communication_status: String,
    navigation_status: String,
    payload_status: String
});

const Telemetry = mongoose.model("Telemetry", telemetrySchema);


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log("MongoDB connected successfully");

        const results = [];

        fs.createReadStream("../data/telemetry/telemetry.csv")

            .pipe(csv())

            .on("data", (data) => {

                results.push({
                    id: data.id,
                    timestamp: data.timestamp,
                    battery: Number(data.battery),
                    voltage: Number(data.voltage),
                    temperature: Number(data.temperature),
                    power_consumption: Number(data.power_consumption),
                    signal_strength: Number(data.signal_strength),
                    communication_status: data.communication_status,
                    navigation_status: data.navigation_status,
                    payload_status: data.payload_status
                });

            })

            .on("end", async () => {

                try {

                    await Telemetry.deleteMany({});

                    await Telemetry.insertMany(results);

                    console.log(
                        `${results.length} telemetry records imported successfully!`
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