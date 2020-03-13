//my require dependencies =>
const express = require("express");
const shortid = require("shortid");

// using express to handle my server =>
const server = express();

//what port and message to display when server is up and running =>
server.listen(4000, () => {
  console.log("Paying attention on port 4000");
});

//server will be using json. IMPORTANT
server.use(express.json());

//have an array that has dummy data and will be used to hold all new request data =>
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

//GET: Working => Welcome message when users go too root.
server.get("/", (req, res) => {
  res.send("Welcome to the user api!");
});

//GET: 100% working how I wanted to.
server.get("/api/users", (req, res) => {
  if (users) {
    res.status(200).json(users);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

//GET w/id: Working 100%
//FIXED: fixed by using const { id } = req.params;
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const idFound = users.find(filterUsers => filterUsers.id === id);
  if (idFound) {
    res.status(200).json(idFound);
  } else {
    res.status(404).json({
      success: false,
      errorMessage: "The user with the specified ID does not exist."
    });
  }
});

//POST: Working 100%
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
    res
      .status(201)
      .send(
        `Verified: You have added a new user ${req.body.name} ` +
          "to the database."
      );

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

//DELETE: WORKING 100%
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const userDeleted = users.find(userDel => userDel.id === id);
  if (userDeleted) {
    users = users.filter(user => user.id !== id);
    res
      .status(200)
      .send(
        "Veified: User has been deleted. " + "Please check your GET request"
      );
  } else if (!userDeleted) {
    res.status(404).json({
      success: false,
      errorMessage: "The user with the specified ID does not exist."
    });
  } else {
    res.status(500).json({
      success: false,
      errorMessage: "The user could not be removed"
    });
  }
});

//PUT: WORKING 100%
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  let index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = updates;
    res.status(200).json(users[index]);
  } else if (!updates.name || !updates.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (updates.id !== id) {
    res
      .status(404)
      .json({ errorMessage: "The user with the specified ID does not exist." });
  }
});
