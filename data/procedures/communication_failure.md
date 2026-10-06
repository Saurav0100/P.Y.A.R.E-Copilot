# Communication Failure Procedure

Procedure ID: COM-07

Subsystem: Communication

Priority: HIGH

## Purpose

This procedure provides diagnostic steps when the spacecraft communication subsystem enters a FAILED state.

## Trigger Conditions

Start this procedure when one or more of the following conditions occur:

- Communication status becomes FAILED.
- Signal strength decreases significantly.
- Communication subsystem voltage falls below the normal operating range.
- Transmitter temperature rises above the normal operating range.

## Diagnostic Steps

1. Check communication subsystem voltage.
2. Check transmitter temperature.
3. Check recent communication logs.
4. Verify antenna status.
5. Compare current telemetry with historical communication incidents.
6. Determine whether power instability is present.

## Recommended Response

If communication power instability is confirmed:

1. Notify the mission operator.
2. Verify that the subsystem is in a safe state.
3. Stabilize the communication subsystem power if authorized.
4. Reduce transmitter thermal load if required.
5. Perform a controlled communication subsystem reset only with operator authorization.
6. Verify that the communication link has been restored.

## Safety

Do not perform a subsystem reset without operator authorization.

Do not issue unverified commands to the spacecraft.

## Expected Recovery

Communication status should return to NORMAL after the underlying issue has been resolved.

## Evidence Required

Before taking corrective action, review:

- Recent telemetry
- Communication logs
- Historical incidents
- Current subsystem status