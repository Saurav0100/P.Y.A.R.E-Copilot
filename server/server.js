const express = require("express");

const app = express();

const PORT = 5000;

// ==========================================
// CORS
// ==========================================
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5174");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Handle browser preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ==========================================
// JSON BODY PARSER
// ==========================================
app.use(express.json());

// ==========================================
// HOME API
// ==========================================
app.get("/", (req, res) => {
  res.json({
    message: "P.Y.A.R.E. Backend is running 🚀",
  });
});

// ==========================================
// TELEMETRY API
// ==========================================
app.get("/api/telemetry", (req, res) => {
  res.json({
    satellite: "ORBIT-X1",
    subsystem: "Communication",

    telemetry: [
      {
        time: "14:30",
        voltage: 21.4,
        temperature: 34,
        status: "Normal",
      },
      {
        time: "14:31",
        voltage: 20.8,
        temperature: 38,
        status: "Normal",
      },
      {
        time: "14:32",
        voltage: 16.8,
        temperature: 47,
        status: "Degraded",
      },
      {
        time: "14:33",
        voltage: 15.9,
        temperature: 51,
        status: "Failed",
      },
    ],
  });
});

// ==========================================
// INCIDENTS API
// ==========================================
app.get("/api/incidents", (req, res) => {
  res.json({
    incidents: [
      {
        id: "INC-001",
        satellite: "ORBIT-X1",
        subsystem: "Communication",
        title: "Communication subsystem failure",
        severity: "HIGH",
        status: "Active",
        detectedAt: "14:32:01",

        description:
          "Communication subsystem experienced abnormal voltage and temperature conditions.",
      },
    ],
  });
});

// ==========================================
// P.Y.A.R.E. ANALYSIS API
// ==========================================
app.post("/api/analyze", (req, res) => {
  res.json({
    incidentId: "INC-001",

    satellite: "ORBIT-X1",

    subsystem: "Communication",

    conclusion: "Communication power instability",

    confidence: 87,

    severity: "HIGH",

    reasoning:
      "Telemetry shows a significant voltage drop from 21.4V to 15.9V while temperature increased from 34°C to 51°C. The communication subsystem then transitioned from normal to degraded and finally failed.",

    evidence: [
      {
        source: "Telemetry #2841",
        finding: "Voltage dropped from 21.4V to 15.9V.",
      },

      {
        source: "Mission Log #182",
        finding:
          "Communication subsystem reported abnormal voltage.",
      },

      {
        source: "Historical Incident M-21",
        finding:
          "Similar voltage and temperature pattern was previously observed.",
      },

      {
        source: "Procedure COM-07",
        finding:
          "Procedure recommends checking communication power supply and transmitter temperature.",
      },
    ],

    recommendations: [
      "Check communication power supply.",
      "Check transmitter temperature.",
      "Check antenna status.",
    ],

    timeline: [
      {
        time: "14:32:01",
        event: "Incident detected",
      },

      {
        time: "14:32:05",
        event: "Telemetry retrieved",
      },

      {
        time: "14:32:08",
        event: "Previous incident matched",
      },

      {
        time: "14:32:10",
        event: "AI analysis generated",
      },

      {
        time: "14:32:11",
        event: "Recommendations generated",
      },
    ],
  });
});

// ==========================================
// START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(
    `P.Y.A.R.E. Backend running on http://localhost:${PORT}`
  );
});