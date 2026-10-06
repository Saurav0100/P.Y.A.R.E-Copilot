# Battery Anomaly Procedure

Procedure ID: PWR-03

Subsystem: Power

Priority: MEDIUM

## Purpose

This procedure provides diagnostic steps when battery level or
power reserve decreases abnormally.

## Trigger Conditions

Start this procedure when:

- Battery level decreases rapidly.
- Battery voltage decreases.
- Power reserve becomes low.
- Power degradation warning is reported.

## Diagnostic Steps

1. Check current battery percentage.
2. Check battery voltage.
3. Review recent power consumption.
4. Check whether non-essential systems are consuming excessive power.
5. Review recent power logs.
6. Compare the current pattern with historical battery incidents.

## Recommended Response

If abnormal battery discharge is confirmed:

1. Notify the mission operator.
2. Reduce non-essential power consumption if authorized.
3. Adjust battery management settings if authorized.
4. Continue monitoring battery level and voltage.

## Safety

Do not disable mission-critical systems without operator authorization.

Do not modify battery management settings without authorization.

## Expected Recovery

Battery discharge rate should return toward normal operating behavior
after unnecessary power consumption has been reduced.

## Evidence Required

Before taking corrective action, review:

- Battery telemetry
- Voltage telemetry
- Power consumption telemetry
- Power logs
- Historical incidents