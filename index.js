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
    id: "",
    name: "Mark Garfias",
    bio: "Not related to Giovani Garfias"
  }
];

server.listen(4000, () => {
  console.log("Paying attention on port 4000");
});

server.use(express.json());

//GET
server.get("/", (req, res) => {
  res.send("Welcome to the user api!");
});

//FIXME: Work on better logic *WIP*
server.get("/api/users", (req, res) => {
  if (res.status() === res.status(200)) {
    res.status(200).json(users);
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database"
    });
  }
});

//TODO: => get with :id
server.get("/api/users/:id", (req, res) => {
  res.send("Specific User");
});

//post request - path - req, res
server.post("/api/users", (req, res) => {
  //if and else statement
  // if the request has a name && bio then post a "freshUser"
  if (req.body.name && req.body.bio) {
    const freshUser = {
      id: shortid.generate(),
      name: req.body.name,
      bio: req.body.bio
    };

    //now push freshUsers information gathered into users: [].
    users.push(freshUser);

    //if successful res with a 201 code. Plus add what was added [freshUser]
    res.status(201).json(freshUser);

    //if this fails because name or bio are missing return a 400.
  } else {
    if (!req.body.name || !req.body.bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });

      //if everything goes wrong then produce a 500 code error!
    } else {
      res.status(500).json({ errorNotification: "Couldn't save the user..." });
    }
  }
});

//TODO: post with :id
server.post("/api/users/:id", (req, res) => {
  res.send("Add User with an id");
});

//TODO: => delete with :id
server.delete("/api/users/:id", (req, res) => {
  res.send("User Deleted");
});

//TODO: => updated with :id
server.put("/api/users/:id", (req, res) => {
  res.send("User Updated");
});
