const mongoose = require("mongoose");
const fs = require("fs");

require("dotenv").config();


// ===============================
// INCIDENT SCHEMA
// ===============================

const incidentSchema = new mongoose.Schema({
    incident_id: String,
    date: String,
    subsystem: String,
    severity: String,
    symptoms: [String],
    root_cause: String,
    resolution: [String],
    operator_action: String,
    status: String
});

const Incident = mongoose.model("Incident", incidentSchema);


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose.connect(process.env.MONGO_URI)

    .then(async () => {

        console.log("MongoDB connected successfully");

        try {

            const data = fs.readFileSync(
                "../data/incidents/incidents.json",
                "utf8"
            );

            const incidents = JSON.parse(data);

            await Incident.deleteMany({});

            await Incident.insertMany(incidents);

            console.log(
                `${incidents.length} incident records imported successfully!`
            );

            mongoose.connection.close();

        } catch (error) {

            console.log(
                "Import failed:",
                error.message
            );

            mongoose.connection.close();

        }

    })

    .catch((error) => {

        console.log(
            "MongoDB connection failed:",
            error.message
        );

    });