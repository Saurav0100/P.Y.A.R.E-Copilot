import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");

  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const [telemetry, setTelemetry] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  const API_URL = "http://localhost:5000";

  // ==========================================
  // NAVIGATION
  // ==========================================

  const navigate = (targetPage) => {
    setPage(targetPage);

    if (targetPage !== "pyare") {
      setAnalysisComplete(false);
      setAnalysisRunning(false);
      setAnalysisStep(0);
    }
  };

  // ==========================================
  // GET TELEMETRY FROM BACKEND
  // ==========================================

  useEffect(() => {
    fetch(`${API_URL}/api/telemetry`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Telemetry request failed");
        }

        return response.json();
      })
      .then((data) => {
        setTelemetry(data);
      })
      .catch((error) => {
        console.error("Failed to fetch telemetry:", error);
      });
  }, []);

  // ==========================================
  // RUN P.Y.A.R.E. ANALYSIS
  // ==========================================

  const runAnalysis = async () => {
    setAnalysisRunning(true);
    setAnalysisComplete(false);
    setAnalysisStep(1);
    setAnalysisData(null);

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Analysis request failed");
      }

      setAnalysisStep(2);

      const data = await response.json();

      setAnalysisData(data);

      setAnalysisStep(3);

      setTimeout(() => {
        setAnalysisStep(4);

        setTimeout(() => {
          setAnalysisRunning(false);
          setAnalysisComplete(true);
        }, 500);
      }, 500);
    } catch (error) {
      console.error("P.Y.A.R.E. analysis failed:", error);
      setAnalysisRunning(false);
    }
  };

  // ==========================================
  // CURRENT TELEMETRY VALUES
  // ==========================================

  const latestTelemetry =
    telemetry?.telemetry?.[telemetry.telemetry.length - 1];

  const currentVoltage = latestTelemetry?.voltage;
  const currentTemperature = latestTelemetry?.temperature;

  return (
    <div className="app">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo">
            P
          </div>

          <div>
            <h2>P.Y.A.R.E.</h2>
            <span>Mission Copilot</span>
          </div>
        </div>

        <nav className="navigation">

          <button
            className={`nav-item ${
              page === "dashboard" ? "active" : ""
            }`}
            onClick={() => navigate("dashboard")}
          >
            <span className="nav-icon">◈</span>
            Dashboard
          </button>

          <button
            className={`nav-item ${
              page === "telemetry" ? "active" : ""
            }`}
            onClick={() => navigate("telemetry")}
          >
            <span className="nav-icon">◉</span>
            Telemetry
          </button>

          <button
            className={`nav-item ${
              page === "incidents" ? "active" : ""
            }`}
            onClick={() => navigate("incidents")}
          >
            <span className="nav-icon">⚠</span>
            Incidents
          </button>

          <button
            className={`nav-item ${
              page === "pyare" ? "active" : ""
            }`}
            onClick={() => navigate("pyare")}
          >
            <span className="nav-icon">✦</span>
            P.Y.A.R.E. AI
          </button>

        </nav>

        <div className="mission-box">
          <span>MISSION</span>
          <strong>ORBIT-X1</strong>
          <small>Earth Observation Satellite</small>
        </div>

      </aside>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="main-content">

        <header className="top-header">

          <div>
            <span className="eyebrow">
              MISSION CONTROL
            </span>

            <div className="mission-name">
              ORBIT-X1
            </div>
          </div>

          <div className="system-status">
            <span className="status-dot"></span>
            SYSTEM ONLINE
          </div>

        </header>


        {/* =========================
            DASHBOARD
        ========================= */}

        {page === "dashboard" && (

          <section>

            <div className="page-heading">

              <span className="eyebrow">
                EARTH OBSERVATION MISSION
              </span>

              <h1>
                ORBIT-X1 Dashboard
              </h1>

            </div>


            <div className="status-grid">

              <div className="status-card">

                <div className="card-top">
                  <span>Battery</span>
                  <span>▰</span>
                </div>

                <strong>82%</strong>

                <small>
                  Nominal
                </small>

              </div>


              <div className="status-card">

                <div className="card-top">
                  <span>Temperature</span>
                  <span>°C</span>
                </div>

                <strong>
                  {currentTemperature !== undefined
                    ? `${currentTemperature}°C`
                    : "Loading..."}
                </strong>

                <small>
                  Current telemetry
                </small>

              </div>


              <div className="status-card warning">

                <div className="card-top">
                  <span>Communication</span>
                  <span>◉</span>
                </div>

                <strong>
                  DEGRADED
                </strong>

                <small>
                  Signal instability detected
                </small>

              </div>


              <div className="status-card">

                <div className="card-top">
                  <span>Satellite</span>
                  <span>●</span>
                </div>

                <strong>
                  ACTIVE
                </strong>

                <small>
                  Orbit stable
                </small>

              </div>

            </div>


            <div className="incident-banner">

              <div className="incident-symbol">
                ⚠
              </div>

              <div className="incident-content">

                <span className="incident-label">
                  ACTIVE INCIDENT • HIGH SEVERITY
                </span>

                <h2>
                  Communication Failure
                </h2>

                <p>
                  Communication subsystem is reporting
                  abnormal voltage and degraded signal
                  strength.
                </p>

              </div>

              <button
                className="primary-button"
                onClick={() => navigate("pyare")}
              >
                Investigate
              </button>

            </div>


            <div className="dashboard-grid">

              <div className="panel">

                <div className="panel-header">

                  <h2>
                    Telemetry Overview
                  </h2>

                  <span className="live">
                    LIVE
                  </span>

                </div>


                <div className="telemetry-row">
                  <span>Voltage</span>

                  <strong>
                    {currentVoltage !== undefined
                      ? `${currentVoltage} V`
                      : "Loading..."}
                  </strong>
                </div>

                <div className="telemetry-row">
                  <span>Signal Strength</span>
                  <strong>-82 dBm</strong>
                </div>

                <div className="telemetry-row">
                  <span>Power Draw</span>
                  <strong>74 W</strong>
                </div>

                <div className="telemetry-row">
                  <span>Orbit Altitude</span>
                  <strong>542 km</strong>
                </div>

              </div>


              <div className="panel pyare-card">

                <div className="pyare-symbol">
                  ✦
                </div>

                <span className="eyebrow">
                  AI MISSION COPILOT
                </span>

                <h2>
                  P.Y.A.R.E.
                </h2>

                <p>
                  Evidence-grounded mission analysis
                  is ready.
                </p>

                <button
                  className="primary-button"
                  onClick={() => navigate("pyare")}
                >
                  Ask P.Y.A.R.E. →
                </button>

              </div>

            </div>

          </section>

        )}


        {/* =========================
            TELEMETRY PAGE
        ========================= */}

        {page === "telemetry" && (

          <section>

            <div className="page-heading">

              <span className="eyebrow">
                SPACECRAFT DATA
              </span>

              <h1>
                Telemetry
              </h1>

              <p>
                Live ORBIT-X1 spacecraft telemetry.
              </p>

            </div>


            <div className="telemetry-page-grid">

              <div className="panel">

                <div className="panel-header">

                  <h2>
                    Power System
                  </h2>

                  <span className="live">
                    LIVE
                  </span>

                </div>

                <div className="big-value">

                  {currentVoltage !== undefined
                    ? `${currentVoltage} V`
                    : "Loading..."}

                </div>

                <div className="fake-chart">

                  <div className="chart-line">

                    {telemetry?.telemetry
                      ? telemetry.telemetry
                          .map((item) => item.voltage)
                          .join(" → ") + " V"
                      : "Loading..."}

                  </div>

                </div>

                <p className="muted">
                  Communication bus voltage has
                  dropped significantly.
                </p>

              </div>


              <div className="panel">

                <div className="panel-header">

                  <h2>
                    Thermal
                  </h2>

                  <span className="warning-text">
                    ELEVATED
                  </span>

                </div>

                <div className="big-value">

                  {currentTemperature !== undefined
                    ? `${currentTemperature}°C`
                    : "Loading..."}

                </div>

                <div className="thermal-bar">
                  <div></div>
                </div>

                <p className="muted">
                  Communication subsystem temperature.
                </p>

              </div>


              <div className="panel">

                <div className="panel-header">

                  <h2>
                    Communication
                  </h2>

                  <span className="warning-text">
                    DEGRADED
                  </span>

                </div>

                <div className="big-value">
                  -82 dBm
                </div>

                <p className="muted">
                  Current signal strength.
                </p>

              </div>


              <div className="panel">

                <div className="panel-header">

                  <h2>
                    Orbit
                  </h2>

                  <span className="live">
                    STABLE
                  </span>

                </div>

                <div className="big-value">
                  542 km
                </div>

                <p className="muted">
                  Current orbital altitude.
                </p>

              </div>

            </div>

          </section>

        )}


        {/* =========================
            INCIDENTS PAGE
        ========================= */}

        {page === "incidents" && (

          <section>

            <div className="page-heading">

              <span className="eyebrow">
                MISSION EVENTS
              </span>

              <h1>
                Incidents
              </h1>

              <p>
                Detected anomalies and historical
                spacecraft events.
              </p>

            </div>


            <div className="incident-list">

              <div className="incident-card high">

                <div className="incident-card-icon">
                  ⚠
                </div>

                <div>

                  <span className="incident-label">
                    HIGH SEVERITY • ACTIVE
                  </span>

                  <h2>
                    Communication Failure
                  </h2>

                  <p>
                    Abnormal voltage and degraded
                    signal strength detected.
                  </p>

                  <small>
                    Detected: 14:32:01
                  </small>

                </div>

                <button
                  className="secondary-button"
                  onClick={() => navigate("pyare")}
                >
                  Investigate
                </button>

              </div>


              <div className="incident-card">

                <div className="incident-card-icon">
                  ◉
                </div>

                <div>

                  <span className="incident-label normal">
                    MEDIUM SEVERITY • RESOLVED
                  </span>

                  <h2>
                    Battery Degradation
                  </h2>

                  <p>
                    Temporary battery efficiency
                    reduction.
                  </p>

                  <small>
                    Incident: M-18
                  </small>

                </div>

              </div>


              <div className="incident-card">

                <div className="incident-card-icon">
                  ◉
                </div>

                <div>

                  <span className="incident-label normal">
                    LOW SEVERITY • RESOLVED
                  </span>

                  <h2>
                    Thermal Variation
                  </h2>

                  <p>
                    Minor temperature fluctuation
                    during orbital transition.
                  </p>

                  <small>
                    Incident: M-16
                  </small>

                </div>

              </div>

            </div>

          </section>

        )}


        {/* =========================
            P.Y.A.R.E. PAGE
        ========================= */}

        {page === "pyare" && (

          <section>

            <div className="page-heading">

              <span className="eyebrow">
                EVIDENCE-GROUNDED AI
              </span>

              <h1>
                P.Y.A.R.E. Mission Analysis
              </h1>

              <p>
                Personal Yielding Artificial Reasoning Entity
              </p>

            </div>


            <div className="panel investigation-panel">

              <div className="pyare-header">

                <div className="pyare-symbol large">
                  ✦
                </div>

                <div>

                  <span className="eyebrow">
                    CURRENT INVESTIGATION
                  </span>

                  <h2>
                    Why did communication fail?
                  </h2>

                </div>

              </div>


              <p className="analysis-description">
                P.Y.A.R.E. analyzes spacecraft telemetry,
                mission logs, historical incidents, and
                operational procedures to identify the
                most likely cause.
              </p>


              <div className="analysis-grid">

                <div className="evidence-card">

                  <span>
                    TELEMETRY
                  </span>

                  <strong>
                    {currentVoltage !== undefined
                      ? `${currentVoltage} V`
                      : "Loading..."}
                  </strong>

                  <small>
                    Communication bus voltage
                  </small>

                </div>


                <div className="evidence-card">

                  <span>
                    SIGNAL
                  </span>

                  <strong>
                    -82 dBm
                  </strong>

                  <small>
                    Current signal strength
                  </small>

                </div>


                <div className="evidence-card">

                  <span>
                    TEMPERATURE
                  </span>

                  <strong>
                    {currentTemperature !== undefined
                      ? `${currentTemperature}°C`
                      : "Loading..."}
                  </strong>

                  <small>
                    Communication subsystem
                  </small>

                </div>

              </div>


              {analysisRunning && (

                <div className="analysis-progress">

                  <div className="progress-title">

                    <span className="eyebrow">
                      P.Y.A.R.E. INVESTIGATION
                    </span>

                    <strong>
                      Analyzing Mission Data...
                    </strong>

                  </div>


                  <div className="progress-step">

                    <span>
                      {analysisStep >= 1 ? "✓" : "○"}
                    </span>

                    <div>
                      <strong>
                        Retrieving spacecraft telemetry
                      </strong>

                      <small>
                        Telemetry #2841
                      </small>
                    </div>

                  </div>


                  <div className="progress-step">

                    <span>
                      {analysisStep >= 2 ? "✓" : "○"}
                    </span>

                    <div>
                      <strong>
                        Checking mission logs
                      </strong>

                      <small>
                        Communication Log #182
                      </small>
                    </div>

                  </div>


                  <div className="progress-step">

                    <span>
                      {analysisStep >= 3 ? "✓" : "○"}
                    </span>

                    <div>
                      <strong>
                        Searching historical incidents
                      </strong>

                      <small>
                        Incident Archive M-21
                      </small>
                    </div>

                  </div>


                  <div className="progress-step">

                    <span>
                      {analysisStep >= 4 ? "✓" : "○"}
                    </span>

                    <div>
                      <strong>
                        Correlating evidence
                      </strong>

                      <small>
                        Telemetry + Logs + History
                      </small>
                    </div>

                  </div>

                </div>

              )}


              {!analysisComplete && (

                <button
                  className="primary-button analysis-button"
                  onClick={runAnalysis}
                  disabled={analysisRunning}
                >
                  {analysisRunning
                    ? "Analyzing Mission Data..."
                    : "Run P.Y.A.R.E. Analysis →"}
                </button>

              )}


              {analysisComplete && analysisData && (

                <div className="analysis-result">

                  <div className="result-header">

                    <div>

                      <span className="incident-label">
                        ANALYSIS COMPLETE
                      </span>

                      <h2>
                        Probable Root Cause
                      </h2>

                    </div>

                    <div className="confidence">

                      <span>
                        CONFIDENCE
                      </span>

                      <strong>
                        {analysisData.confidence}%
                      </strong>

                    </div>

                  </div>


                  <div className="root-cause">

                    <h3>
                      {analysisData.conclusion}
                    </h3>

                    <p>
                      {analysisData.reasoning}
                    </p>

                  </div>


                  <div className="reasoning-bridge">

                    <span className="reasoning-line"></span>

                    <div>

                      <span className="eyebrow">
                        WHY THIS CONCLUSION?
                      </span>

                      <p>
                        Multiple independent signals
                        point toward the same
                        communication power instability.
                      </p>

                    </div>

                    <span className="reasoning-line"></span>

                  </div>


                  <div className="evidence-section">

                    <h3>
                      Evidence Chain
                    </h3>

                    {analysisData.evidence?.map((item, index) => (

                      <div
                        className="evidence-item"
                        key={index}
                      >

                        <div className="evidence-number">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div>

                          <strong>
                            {item.source}
                          </strong>

                          <span className="evidence-strength high">
                            EVIDENCE
                          </span>

                          <p>
                            {item.finding}
                          </p>

                          <small>
                            Source: {item.source}
                          </small>

                        </div>

                      </div>

                    ))}

                  </div>


                  <div className="recommendations">

                    <h3>
                      Recommended Actions
                    </h3>

                    {analysisData.recommendations?.map(
                      (recommendation, index) => (

                        <div
                          className="recommendation"
                          key={index}
                        >

                          <span>
                            {index + 1}
                          </span>

                          <div className="recommendation-content">

                            <strong>
                              MISSION ACTION
                            </strong>

                            <p>
                              {recommendation}
                            </p>

                            <small>
                              Priority:{" "}
                              {index < 2
                                ? "HIGH"
                                : "MEDIUM"}
                            </small>

                          </div>

                        </div>

                      )
                    )}

                  </div>


                  <div className="timeline">

                    <h3>
                      Analysis Timeline
                    </h3>

                    {analysisData.timeline?.map(
                      (item, index) => (

                        <div key={index}>

                          <span>
                            {item.time}
                          </span>

                          {item.event}

                        </div>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default App;