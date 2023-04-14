# Connect4 MinMax AI
This project is a Connect4 game with an AI that uses the MinMax algorithm to play.
## Authors
- Tobias Bonifay
- Igor Melnyk
- Mathieu Schalkwijk

## How to run the graphical interface

### Run server in docker

1. Verify that you have Docker installed on your machine.
2. Clone this repository.
3. Build the Docker image by running the following command in your terminal:
```bash
docker build -t connect4-minmax .
```
4. Once the build is complete, start the Docker container with the following command:
```bash
docker run -p 3000:3000 connect4-minmax
```
5. Open your browser and go to http://localhost:3000
6. Enjoy the game!

The server will be running in the background. To stop it, run the following command:
```bash
docker stop $(docker ps -q)
```

### Run server locally
1. Verify that you have Node.js installed on your machine.
2. Clone this repository.
3. Install the dependencies by running the following command in your terminal:
```bash
npm install express
```
4. Start the server by running the following command in your terminal:
```bash
node src/api.js
```
5. Open your browser and go to http://localhost:3000
6. Enjoy the game!

The server will be running in the background. To stop it, press `Ctrl + C` in your terminal.