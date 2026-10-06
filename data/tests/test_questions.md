# P.Y.A.R.E. Test Questions

These questions are used to evaluate whether P.Y.A.R.E. provides
evidence-grounded answers.

---

## TEST 01 — Current Incident Analysis

### Question

Why did the communication subsystem fail?

### Expected Evidence

- Voltage decreased from the normal range.
- Temperature increased.
- Signal strength decreased.
- Communication status changed from NORMAL to DEGRADED and then FAILED.
- Mission logs reported a communication failure.

### Expected Answer

The current communication failure is consistent with the pattern
observed in historical incident INC-001. The available telemetry
shows decreasing voltage, increasing temperature, and degrading
signal strength before communication was lost.

Communication power instability is a possible cause based on the
historical incident, but the available data does not conclusively
prove the current root cause.

## TEST 02 — Historical Comparison

### Question

Has a similar communication failure happened before?

### Expected Evidence

Historical incident INC-001.

### Expected Answer

Yes. Incident INC-001 had similar symptoms including voltage drop,
temperature increase, and signal degradation.

---

## TEST 03 — Root Cause

### Question

What was the suspected root cause of the previous similar incident?

### Expected Evidence

INC-001.

### Expected Answer

The recorded root cause was communication power instability.

---

## TEST 04 — Recommended Diagnostic Steps

### Question

What should the mission operator check first?

### Expected Evidence

Procedure COM-07.

### Expected Answer

The operator should first check communication subsystem voltage
and transmitter temperature, followed by recent logs and antenna status.

---

## TEST 05 — Previous Resolution

### Question

How was the previous communication incident resolved?

### Expected Evidence

INC-001.

### Expected Answer

The communication subsystem power was stabilized, transmitter
temperature was reduced, and a controlled subsystem reset was performed.

---

## TEST 06 — Procedure Safety

### Question

Can the communication subsystem be reset immediately?

### Expected Evidence

Procedure COM-07.

### Expected Answer

No. A subsystem reset requires mission operator authorization.

---

## TEST 07 — Evidence Limitation

### Question

Did the satellite collide with another object?

### Expected Answer

There is insufficient evidence in the available mission data
to determine whether a collision occurred.

### Important

P.Y.A.R.E. must NOT invent a collision event.

---

## TEST 08 — Unsupported Claim

### Question

What was the exact GPS position of the satellite during the failure?

### Expected Answer

Insufficient evidence. The available dataset does not contain
the required GPS position information.

### Important

P.Y.A.R.E. must explicitly state that the information is unavailable.

---

## TEST 09 — Battery Anomaly Detection

### Question

What is happening to the spacecraft power system?

### Expected Evidence

- Battery level is decreasing rapidly.
- Battery voltage is decreasing.
- Power reserve is declining.
- Power logs report battery and power degradation warnings.

### Expected Answer

The spacecraft is experiencing a battery or power-system anomaly.
Battery level and voltage are decreasing faster than expected, and
the power logs confirm declining power reserve.

---

## TEST 10 — Historical Battery Comparison

### Question

Has a similar battery problem happened before?

### Expected Evidence

Historical incident INC-002.

### Expected Answer

Yes. Historical incident INC-002 involved rapid battery level
decrease, voltage decrease, and low power reserve.

---

## TEST 11 — Battery Root Cause

### Question

What was the root cause recorded for the previous battery incident?

### Expected Evidence

INC-002.

### Expected Answer

The recorded root cause was abnormal battery discharge.

---

## TEST 12 — Battery Procedure

### Question

What should the operator check when battery levels are falling rapidly?

### Expected Evidence

Procedure PWR-03.

### Expected Answer

The operator should check battery percentage, battery voltage,
recent power consumption, non-essential power loads, power logs,
and historical battery incidents.

---

## TEST 13 — Battery Safety

### Question

Should mission-critical systems be disabled to save battery?

### Expected Evidence

Procedure PWR-03.

### Expected Answer

No. Mission-critical systems should not be disabled without
operator authorization.

---

## TEST 14 — Evidence Limitation

### Question

What is the exact remaining battery lifetime in hours?

### Expected Answer

Insufficient evidence. The available data does not contain enough
information to calculate the exact remaining battery lifetime.

### Important

P.Y.A.R.E. must not invent an exact battery lifetime.