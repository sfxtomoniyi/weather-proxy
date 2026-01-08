# Weather Proxy Service

A NestJS-based proxy application that fetches weather data from an external provider (Weatherstack) and implements caching to optimize performance and reduce external API calls.

## Features

- **Proxy Endpoint**: Fetches weather data for a specific city.
- **Caching**: Stores weather data in a local cache to serve subsequent requests faster.
- **Error Handling**: Gracefully handles external API failures (503) and invalid city queries (404).
- **Source Tracking**: Indicates whether data came from the `api` or the `cache`.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v16 or higher recommended)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weather-proxy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

This application requires environment variables to function correctly.

1. Create a `.env` file in the root directory of the project.
2. Add the following variables:

```env
# The base URL for the external weather API (e.g., Weatherstack)
BASE_URL=http://api.weatherstack.com/current

# Your personal API Access Key for the weather provider
API_KEY=your_api_key_here
```

> **Note**: You can obtain an API key by signing up at Weatherstack.

## Running the Application

To run the application in development mode (with hot-reload):

```bash
npm run start:dev
```

The server will start on `http://localhost:3000` (default NestJS port).

## API Usage

### Get Weather Data

- **Endpoint**: `GET /weather/:city`
- **Example**: `GET http://localhost:3000/weather/London`
- **Response**:
  ```json
  {
    "city": "London",
    "temperature": 15,
    "condition": "Partly cloudy",
    "source": "api",
    "cachedAt": "2026-01-08T12:00:00.000Z"
  }
  ```
  *Subsequent requests within the cache TTL will return `"source": "cache"`.*