# P.Y.A.R.E. Mission Intelligence System
## API Documentation

Base URL:

http://localhost:3000


## 1. Telemetry API

Endpoint:

GET /api/telemetry

Purpose:
Returns spacecraft telemetry data stored in MongoDB.

Example:

http://localhost:3000/api/telemetry

Returns:
- Battery
- Voltage
- Temperature
- Power consumption
- Signal strength
- Communication status
- Navigation status
- Payload status


## 2. Mission Logs API

Endpoint:

GET /api/logs

Purpose:
Returns mission logs stored in MongoDB.

Example:

http://localhost:3000/api/logs

Returns:
- Log ID
- Timestamp
- Subsystem
- Severity
- Event
- Description


## 3. Historical Incidents API

Endpoint:

GET /api/incidents

Purpose:
Returns previous spacecraft incidents stored in MongoDB.

Example:

http://localhost:3000/api/incidents

Returns:
- Incident ID
- Date
- Subsystem
- Severity
- Symptoms
- Root cause
- Resolution
- Operator action
- Status


## 4. Procedures API

Endpoint:

GET /api/procedures

Purpose:
Returns spacecraft troubleshooting procedures.

Example:

http://localhost:3000/api/procedures

Returns:
- Procedure filename
- Procedure content
- Diagnostic steps
- Recommended response
- Safety instructions
- Evidence requirements


## 5. Mission Search API

Endpoint:

GET /api/search?q=communication

Purpose:
Searches mission logs, historical incidents and procedures.

Example:

http://localhost:3000/api/search?q=communication

Returns:
- Matching logs
- Matching incidents
- Matching procedures


## 6. P.Y.A.R.E. Ask API

Endpoint:

GET /api/ask?question=Why%20did%20communication%20fail

Purpose:
Accepts a mission-related question and returns an answer with supporting evidence.

Example:

http://localhost:3000/api/ask?question=Why%20did%20communication%20fail

Returns:
- Question
- Answer
- Evidence


## Data Flow

Mission Data
     ↓
MongoDB
     ↓
Express.js APIs
     ↓
AI / RAG System
     ↓
P.Y.A.R.E. Mission Intelligence


## Backend Responsibilities

- Manage mission data
- Store data in MongoDB
- Provide REST APIs
- Search mission data
- Provide evidence to AI/RAG system
- Maintain structured mission records