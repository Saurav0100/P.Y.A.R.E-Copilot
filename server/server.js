const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.json());


// ===============================
// SCHEMAS
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

const logSchema = new mongoose.Schema({
    log_id: String,
    timestamp: String,
    subsystem: String,
    severity: String,
    event: String,
    description: String
});

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

const procedureSchema = new mongoose.Schema({
    filename: String,
    content: String
});


// ===============================
// MODELS
// ===============================

const Telemetry = mongoose.model("Telemetry", telemetrySchema);
const MissionLog = mongoose.model("MissionLog", logSchema);
const Incident = mongoose.model("Incident", incidentSchema);
const Procedure = mongoose.model("Procedure", procedureSchema);


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {

    res.send("P.Y.A.R.E. server is running!");

});


// ===============================
// TELEMETRY API
// ===============================

app.get("/api/telemetry", async (req, res) => {

    try {

        const filter = {};

        // Communication status filter
        if (req.query.communication_status) {
            filter.communication_status =
                req.query.communication_status.toUpperCase();
        }

        // Navigation status filter
        if (req.query.navigation_status) {
            filter.navigation_status =
                req.query.navigation_status.toUpperCase();
        }

        // Payload status filter
        if (req.query.payload_status) {
            filter.payload_status =
                req.query.payload_status.toUpperCase();
        }

        const telemetry = await Telemetry.find(filter);

        res.json({
            count: telemetry.length,
            filters: filter,
            data: telemetry
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// ===============================
// LOGS API
// ===============================

app.get("/api/logs", async (req, res) => {

    try {

        const filter = {};

        // Severity filter
        if (req.query.severity) {
            filter.severity =
                req.query.severity.toUpperCase();
        }

        // Subsystem filter
        if (req.query.subsystem) {
            filter.subsystem =
                req.query.subsystem.toUpperCase();
        }

        const logs = await MissionLog.find(filter);

        res.json({
            count: logs.length,
            filters: filter,
            data: logs
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// ===============================
// INCIDENTS API
// ===============================

app.get("/api/incidents", async (req, res) => {

    try {

        const filter = {};

        // Subsystem filter
        if (req.query.subsystem) {
            filter.subsystem =
                req.query.subsystem;
        }

        // Severity filter
        if (req.query.severity) {
            filter.severity =
                req.query.severity.toUpperCase();
        }

        const incidents = await Incident.find(filter);

        res.json({
            count: incidents.length,
            filters: filter,
            data: incidents
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// ===============================
// PROCEDURES API
// ===============================

app.get("/api/procedures", async (req, res) => {

    try {

        const procedures = await Procedure.find();

        res.json({
            count: procedures.length,
            data: procedures
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// ===============================
// P.Y.A.R.E. ASK API
// ===============================

app.get("/api/ask", async (req, res) => {

    const originalQuestion = req.query.question || "";
    const question = originalQuestion.toLowerCase();

    if (!question) {

        return res.status(400).json({
            error: "Please provide a question"
        });

    }

    try {

        const answer = {

            question: originalQuestion,

            message: "",

            evidence: {

                telemetry: [],

                logs: [],

                incidents: [],

                procedures: []

            }

        };


        // ===============================
        // COMMUNICATION FAILURE
        // ===============================

        if (
            question.includes("communication") &&
            (
                question.includes("fail") ||
                question.includes("failure")
            )
        ) {

            const telemetry = await Telemetry.find({

                communication_status: {
                    $in: ["DEGRADED", "FAILED"]
                }

            });

            const logs = await MissionLog.find({

                subsystem: "COMMUNICATION"

            });

            const incidents = await Incident.find({

                subsystem: "Communication"

            });

            const procedures = await Procedure.find({

                filename: "communication_failure.md"

            });


            answer.message =
                "The communication subsystem experienced degradation followed by failure. Telemetry shows decreasing signal strength, decreasing voltage, and increasing temperature.";


            answer.evidence.telemetry =
                telemetry;

            answer.evidence.logs =
                logs;

            answer.evidence.incidents =
                incidents;

            answer.evidence.procedures =
                procedures;

        }


        // ===============================
        // BATTERY / POWER
        // ===============================

        else if (
            question.includes("battery") ||
            question.includes("power")
        ) {

            const telemetry = await Telemetry.find();

            const logs = await MissionLog.find({

                subsystem: "POWER"

            });

            const incidents = await Incident.find({

                subsystem: "Power"

            });

            const procedures = await Procedure.find({

                filename: "battery_anomaly.md"

            });


            answer.message =
                "The spacecraft is experiencing a power-system anomaly. Battery level and voltage are decreasing, while mission logs indicate declining power reserve.";


            answer.evidence.telemetry =
                telemetry;

            answer.evidence.logs =
                logs;

            answer.evidence.incidents =
                incidents;

            answer.evidence.procedures =
                procedures;

        }


        // ===============================
        // UNKNOWN QUESTION
        // ===============================

        else {

            answer.message =
                "Insufficient evidence in the available mission data to answer this question.";

        }


        res.json(answer);

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


// ===============================
// MISSION DATA SEARCH API
// ===============================

app.get("/api/search", async (req, res) => {

    const query = (req.query.q || "").toLowerCase();

    if (!query) {

        return res.status(400).json({

            error: "Please provide a search query"

        });

    }

    try {

        const logs =
            await MissionLog.find();

        const incidents =
            await Incident.find();

        const procedures =
            await Procedure.find();


        const matchingLogs =
            logs.filter((log) =>

                JSON.stringify(log)
                    .toLowerCase()
                    .includes(query)

            );


        const matchingIncidents =
            incidents.filter((incident) =>

                JSON.stringify(incident)
                    .toLowerCase()
                    .includes(query)

            );


        const matchingProcedures =
            procedures.filter((procedure) =>

                JSON.stringify(procedure)
                    .toLowerCase()
                    .includes(query)

            );


        res.json({

            query: query,

            results: {

                logs: matchingLogs,

                incidents: matchingIncidents,

                procedures: matchingProcedures

            }

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );

        app.listen(3000, () => {

            console.log(
                "Server running on http://localhost:3000"
            );

        });

    })

    .catch((error) => {

        console.log(
            "MongoDB connection failed:",
            error.message
        );

    });