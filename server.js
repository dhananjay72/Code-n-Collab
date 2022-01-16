const path = require("path");
const socketio = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const io = socketio(server);
 
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


// Heroku hosting :
if ( process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}



 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
 
  

app.post("/new", (req, res) => {
  if (req.body === undefined || req.body.roomName === undefined) {
    console.log("No name or body");
    return res.sendStatus(400);
  }

  const { roomName } = req.body;

  if (rooms[roomName] !== undefined) {
    return res.sendStatus(201);
  }

  rooms[roomName] = {
    count: 0,
    participants: {},
  };

  return res.sendStatus(201);
});

app.get("/exists/:roomName", (req, res) => {
  const { roomName } = req.params;
  if (rooms[roomName] === undefined) {
    return res.sendStatus(404);
  } else {
    return res.sendStatus(200);
  }
});

io.on("connection", (socket) => {
  const roomName = socket.handshake.query.roomName;
  const displayName = socket.handshake.query.displayName;
  if (roomName === undefined || rooms[roomName] === undefined) {
    console.error("Room name not specified or DNE");
    socket.disconnect();
    return;
  }

  socket.join(roomName, () => {
    const list = rooms[roomName].participants;
    list[socket.id] = {
      displayName: displayName,
      color: "red",
      cursorPos: {
        line: 0,
        ch: 0,
      },
    };

    rooms[roomName].count++;

    io.to(roomName).emit("list change", list);
  });

  console.log(`User connecting to room '${roomName}'`);

 

  socket.on("cursor change", (data) => {
    socket.to(roomName).broadcast.emit("cursor change", data);
  });

  socket.on("disconnect", () => {
    const list = rooms[roomName].participants;
    delete list[socket.id];

    socket.to(roomName).emit("list change", list);

    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log("Server is running :)");
});
