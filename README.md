# Log Management System

This system is designed to efficiently handle and query vast volumes of log data. It provides an HTTP-based log ingestion system and a query interface for full-text search and filtering based on various log attributes.

## Features

- **Log Ingestor**:
  - Ingest logs in a standardized format over HTTP (default port: 3000).
  - Scalable system capable of handling high log volumes efficiently.
  - Mitigates bottlenecks using optimized I/O operations and database indexing.
  - Search and filter logs based on various attributes.
  - Regex-based search for following fields:
    - `message`
    - `resourceId`
    - `traceId`
    - `spanId`
    - `commit`
  - Range based search on timestamp fields using:
    - `timstampFrom` starting timestamp
    - `timestampTo` ending timestamp

## Requirements

- Node.js: Ensure Node.js is installed in your environment.
- MongoDB: Set up MongoDB as the database for storing log data.
- Swagger UI: Used for API documentation.

## Installation

### Local Setup
1. Clone this repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file and add following keys to it:
    - `DATABASE`: MongoDB connection string.
    - `PASSWORD`: Password for MongoDB authentication.
    - `PORT`: Port number for the HTTP server (default: 3000)
4. Run the application using `npm start`.

### Using Docker
1. Clone this repository.
2. Create a `.env` file and add following keys to it:
    - `DATABASE`: MongoDB connection string.
    - `PASSWORD`: Password for MongoDB authentication.
    - `PORT`: Port number for the HTTP server (default: 3000)
3. Run the application using `docker-compose up --build app`.
4. Edit the `docker-compose.yml` file to customize different parameters.

## Usage

### Log Ingestion

Use the provided HTTP endpoint to ingest logs into the system.

### Querying Logs

Access the query interface to perform searches and filters based on various log attributes.

## API Documentation

- Swagger UI: Open `http://localhost:3000/docs` to view the API documentation.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any improvements or additional features.
