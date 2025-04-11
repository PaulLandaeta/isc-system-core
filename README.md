# ISC System Core

## Description

This repository contains the core of the ISC system, which includes automation scripts and a Dockerfile to facilitate the deployment of the development environment.

## Prerequisites

Before starting, make sure you have the following installed on your machine:

- **Node.js 20.x.x**: You can download it from the [Node.js Official Website](https://nodejs.org/).
- **PostgreSQL 13+**: You can install PostgreSQL from the [PostgreSQL Official Website](https://www.postgresql.org/).
- **Docker Desktop**: You can download it from the [Docker Official Website](https://www.docker.com/products/docker-desktop/).

## Environment Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PaulLandaeta/isc-system-core.git
   cd isc-system-core
   ```
2. **Install dependencies:**:
   
   ```sh
    npm install
   ```
## Instructions

### 1. Run the script

To run the project's scripts, follow these steps:

Make sure you have cloned the repository:

1. Having cloned the repository:
   ```bash
   cd isc-system-core
   ```
2. Make sure to give the permissions
   ```bash
   chmod +x start-dev.sh
   ```

3. Run the development environment script:
   ```bash
   ./start-dev.sh
   ```

### 2. Build and run the Docker container

To build and run the Docker container, follow these steps:

1. Make sure Docker is installed.

2. Launch Docker containers:
   ```bash
   docker-compose up -d
   ```

3. Build the Docker image:
   ```bash
   docker build -t isc-system-core .
   ```

4. Run the Docker container:
   ```bash
   docker run -d -p 5000:5000 isc-system-core
   ```
