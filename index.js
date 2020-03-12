const express = require("express");
const shortid = require("shortid");

//created a server object.
const server = express();

//array to keep all info
let users = [
  {
    id: shortid.generate(),
    name: "Giovani Garfias",
    bio: "Web Developer"
  },
  {
    id: shortid.generate(),
    name: "Mark Garfias",
    bio: "Not related to Giovani Garfias"
  }
];

server.listen(4000, () => {
  console.log("Paying attention on port 4000");
});

server.use(express.json());

//GET for init db
server.get("/", (req, res) => {
  res.send("Welcome to the user api!");
});

server.get("/users", (req, res) => {
  res.status(200).json(users);
});

//post request
server.post("/users", (req, res) => {
  const userInfo = req.body;
  userInfo.id = shortid.generate();
  users.push(userInfo);

  //returns a status
  res.status(201).json(userInfo);
});
