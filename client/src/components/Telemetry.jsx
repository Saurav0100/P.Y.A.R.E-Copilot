import {
  Activity,
  Battery,
  Thermometer,
  Radio,
  Zap,
  Navigation,
  ArrowUpRight,
} from "lucide-react";

function Telemetry() {
  const telemetryData = [
    {
      label: "Battery Voltage",
      value: "15.9 V",
      status: "CRITICAL",
      icon: Battery,
    },
    {
      label: "Temperature",
      value: "51 °C",
      status: "WARNING",
      icon: Thermometer,
    },
    {
      label: "Signal Strength",
      value: "-82 dBm",
      status: "DEGRADED",
      icon: Radio,
    },
    {
      label: "Power Draw",
      value: "74 W",
      status: "HIGH",
      icon: Zap,
    },
    {
      label: "Orbit Altitude",
      value: "542 km",
      status: "NOMINAL",
      icon: Navigation,
    },
    {
      label: "System Activity",
      value: "98.4%",
      status: "NOMINAL",
      icon: Activity,
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <div className="eyebrow">MISSION TELEMETRY</div>
          <h1>Telemetry Monitor</h1>
          <p>
            Real-time spacecraft telemetry for{" "}
            <strong>ORBIT-X1</strong>
          </p>
        </div>

        <div className="live-indicator">
          <span></span>
          LIVE DATA
        </div>
      </div>

      <div className="telemetry-grid">
        {telemetryData.map((item) => {
          const Icon = item.icon;

          return (
            <div className="telemetry-card" key={item.label}>
              <div className="telemetry-card-top">
                <div className="telemetry-icon">
                  <Icon size={22} />
                </div>

                <span
                  className={`telemetry-status ${item.status.toLowerCase()}`}
                >
                  {item.status}
                </span>
              </div>

              <p>{item.label}</p>

              <h2>{item.value}</h2>

              <div className="telemetry-trend">
                <ArrowUpRight size={15} />
                Last updated just now
              </div>
            </div>
          );
        })}
      </div>

      <div className="chart-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">POWER SUBSYSTEM</div>
            <h2>Battery Voltage History</h2>
          </div>

          <span className="chart-time">LAST 10 MINUTES</span>
        </div>

        <div className="fake-chart">
          <div className="chart-line">
            <span style={{ height: "82%" }}></span>
            <span style={{ height: "76%" }}></span>
            <span style={{ height: "70%" }}></span>
            <span style={{ height: "64%" }}></span>
            <span style={{ height: "57%" }}></span>
            <span style={{ height: "48%" }}></span>
            <span style={{ height: "39%" }}></span>
            <span style={{ height: "30%" }}></span>
            <span style={{ height: "22%" }}></span>
          </div>

          <div className="chart-labels">
            <span>14:24</span>
            <span>14:26</span>
            <span>14:28</span>
            <span>14:30</span>
            <span>14:32</span>
            <span>14:34</span>
          </div>
        </div>
      </div>

      <div className="telemetry-alert">
        <div className="alert-icon">
          <Activity size={22} />
        </div>

        <div>
          <strong>Telemetry anomaly detected</strong>
          <p>
            Battery voltage dropped from 21.4 V to 15.9 V while
            communication signal degraded.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Telemetry;