import { useState } from "react";
import "./App.css";
import PyareChat from "./components/PyareChat";

function App() {
  const [page, setPage] = useState("dashboard");
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const runAnalysis = () => {
    setAnalysisRunning(true);
    setAnalysisComplete(false);
    setAnalysisStep(1);

    setTimeout(() => {
      setAnalysisStep(2);
    }, 700);

    setTimeout(() => {
      setAnalysisStep(3);
    }, 1400);

    setTimeout(() => {
      setAnalysisStep(4);
    }, 2100);

    setTimeout(() => {
      setAnalysisRunning(false);
      setAnalysisComplete(true);
    }, 2800);
  };

  const navigate = (targetPage) => {
    setPage(targetPage);

    if (targetPage !== "pyare") {
      setAnalysisComplete(false);
      setAnalysisRunning(false);
      setAnalysisStep(0);
    }
  };

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

          {/* DASHBOARD */}
          <button
            className={`nav-item ${
              page === "dashboard" ? "active" : ""
            }`}
            onClick={() => navigate("dashboard")}
          >
            <span className="nav-icon">◈</span>
            Dashboard
          </button>

          {/* TELEMETRY */}
          <button
            className={`nav-item ${
              page === "telemetry" ? "active" : ""
            }`}
            onClick={() => navigate("telemetry")}
          >
            <span className="nav-icon">◉</span>
            Telemetry
          </button>

          {/* INCIDENTS */}
          <button
            className={`nav-item ${
              page === "incidents" ? "active" : ""
            }`}
            onClick={() => navigate("incidents")}
          >
            <span className="nav-icon">⚠</span>
            Incidents
          </button>

          {/* P.Y.A.R.E. AI */}
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

        {/* HEADER */}

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


            {/* STATUS CARDS */}

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
                  43°C
                </strong>

                <small>
                  Normal range
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


            {/* ACTIVE INCIDENT */}

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


            {/* LOWER DASHBOARD */}

            <div className="dashboard-grid">

              {/* TELEMETRY OVERVIEW */}

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
                  <strong>15.9 V</strong>
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


              {/* P.Y.A.R.E. CARD */}

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

              {/* POWER */}

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
                  15.9 V
                </div>

                <div className="fake-chart">

                  <div className="chart-line">
                    21.4 → 20.8 → 16.8 → 15.9 V
                  </div>

                </div>

                <p className="muted">
                  Communication bus voltage has
                  dropped significantly.
                </p>

              </div>


              {/* THERMAL */}

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
                  51°C
                </div>

                <div className="thermal-bar">
                  <div></div>
                </div>

                <p className="muted">
                  Communication subsystem temperature.
                </p>

              </div>


              {/* COMMUNICATION */}

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


              {/* ORBIT */}

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

              {/* ACTIVE INCIDENT */}

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


              {/* BATTERY */}

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


              {/* THERMAL */}

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

            <PyareChat />
            
            <div className="panel investigation-panel">

              {/* INVESTIGATION HEADER */}

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


              {/* EVIDENCE INPUT */}

              <div className="analysis-grid">

                <div className="evidence-card">

                  <span>
                    TELEMETRY
                  </span>

                  <strong>
                    15.9 V
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
                    51°C
                  </strong>

                  <small>
                    Communication subsystem
                  </small>

                </div>

              </div>


              {/* ANALYSIS PROGRESS */}

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


              {/* ANALYSIS BUTTON */}

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


              {/* ANALYSIS RESULT */}

              {analysisComplete && (

                <div className="analysis-result">

                  {/* RESULT HEADER */}

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
                        87%
                      </strong>

                    </div>

                  </div>


                  {/* ROOT CAUSE */}

                  <div className="root-cause">

                    <h3>
                      Communication power instability
                    </h3>

                    <p>
                      P.Y.A.R.E. detected a strong
                      correlation between falling
                      communication bus voltage,
                      rising subsystem temperature,
                      and degraded signal strength
                      immediately before the
                      communication failure.
                    </p>

                  </div>


                  {/* REASONING BRIDGE */}

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


                  {/* EVIDENCE CHAIN */}

                  <div className="evidence-section">

                    <h3>
                      Evidence Chain
                    </h3>


                    {/* EVIDENCE 01 */}

                    <div className="evidence-item">

                      <div className="evidence-number">
                        01
                      </div>

                      <div>

                        <strong>
                          Voltage instability detected
                        </strong>

                        <span className="evidence-strength high">
                          HIGH
                        </span>

                        <p>
                          Bus voltage dropped from
                          21.4 V to 15.9 V.
                        </p>

                        <small>
                          Source: Telemetry #2841
                        </small>

                      </div>

                    </div>


                    {/* EVIDENCE 02 */}

                    <div className="evidence-item">

                      <div className="evidence-number">
                        02
                      </div>

                      <div>

                        <strong>
                          Temperature increased
                        </strong>

                        <span className="evidence-strength high">
                          HIGH
                        </span>

                        <p>
                          Communication subsystem
                          temperature increased from
                          34°C to 51°C.
                        </p>

                        <small>
                          Source: Telemetry #2842
                        </small>

                      </div>

                    </div>


                    {/* EVIDENCE 03 */}

                    <div className="evidence-item">

                      <div className="evidence-number">
                        03
                      </div>

                      <div>

                        <strong>
                          Signal degradation followed
                        </strong>

                        <span className="evidence-strength medium">
                          MEDIUM
                        </span>

                        <p>
                          Signal strength degraded to
                          -82 dBm before communication
                          failure.
                        </p>

                        <small>
                          Source: Communication Log #182
                        </small>

                      </div>

                    </div>


                    {/* EVIDENCE 04 */}

                    <div className="evidence-item">

                      <div className="evidence-number">
                        04
                      </div>

                      <div>

                        <strong>
                          Historical incident match
                        </strong>

                        <span className="evidence-strength high">
                          HIGH
                        </span>

                        <p>
                          Similar voltage and thermal
                          behavior was observed during
                          previous incident M-21.
                        </p>

                        <small>
                          Source: Incident Archive M-21
                        </small>

                      </div>

                    </div>

                  </div>


                  {/* RECOMMENDATIONS */}

                  <div className="recommendations">

                    <h3>
                      Recommended Actions
                    </h3>


                    {/* RECOMMENDATION 01 */}

                    <div className="recommendation">

                      <span>
                        1
                      </span>

                      <div className="recommendation-content">

                        <strong>
                          POWER SYSTEM
                        </strong>

                        <p>
                          Inspect communication subsystem
                          power supply.
                        </p>

                        <small>
                          Priority: HIGH
                        </small>

                      </div>

                    </div>


                    {/* RECOMMENDATION 02 */}

                    <div className="recommendation">

                      <span>
                        2
                      </span>

                      <div className="recommendation-content">

                        <strong>
                          THERMAL SYSTEM
                        </strong>

                        <p>
                          Verify transmitter thermal condition.
                        </p>

                        <small>
                          Priority: HIGH
                        </small>

                      </div>

                    </div>


                    {/* RECOMMENDATION 03 */}

                    <div className="recommendation">

                      <span>
                        3
                      </span>

                      <div className="recommendation-content">

                        <strong>
                          COMMUNICATION SYSTEM
                        </strong>

                        <p>
                          Check antenna and communication
                          subsystem status.
                        </p>

                        <small className="priority-medium">
                          Priority: MEDIUM
                        </small>

                      </div>

                    </div>

                  </div>


                  {/* TIMELINE */}

                  <div className="timeline">

                    <h3>
                      Analysis Timeline
                    </h3>


                    <div>
                      <span>14:32:01</span>
                      Incident detected
                    </div>

                    <div>
                      <span>14:32:05</span>
                      Telemetry retrieved
                    </div>

                    <div>
                      <span>14:32:08</span>
                      Historical incident matched
                    </div>

                    <div>
                      <span>14:32:10</span>
                      Root cause analysis generated
                    </div>

                    <div>
                      <span>14:32:11</span>
                      Recommendations generated
                    </div>

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