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

1. Haber clonado el repositorio:
   ```bash
   cd isc-system-core
   ```

2. Ensure that the necessary dependencies are installed:
   ```bash
   npm install
   ```

3. Run the corresponding script from the scripts/ folder:
   ```bash
   node scripts/nombre-del-script.js
   ```

### 2. Build and run the Docker container

To build and run the Docker container, follow these steps:

1. Make sure Docker is installed.

2. To build the container image, run the following command in the root directory of the repository:
   ```bash
   docker build -t isc-system-core .
   ```

3. Once the image is built, you can run the container with the following command:
   ```bash
   docker run -d -p 3000:3000 isc-system-core
   ```