const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

//=============zoos data table==================//
const dataConfig = require("./knexfile");
const dataBase = knex(dataConfig.development);
//=============zoos data table==================//

//==================bears data table================//
const dataConfig2 = require("./knexfile2");
const dataBase2 = knex(dataConfig2.development);
//==================bears data table================//

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/", (req, res) => {
  res.send("API Is Running....");
});

//-------------------------MVP-----------------------------------//
server.get("/api/zoos", (req, res) => {
  dataBase("zoos")
    .then(names => {
      res.status(200).json(names);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Names cannot be retrieved" });
    });
});

server.get("/api/zoos/:id", (req, res) => {
  const id = req.params.id;
  dataBase("zoos")
    .select("name")
    .where({ id: id })
    .then(names => {
      res.status(200).json(names);
    })
    .catch(err => {
      console.log("Error: ", err);
      res
        .status(500)
        .json({ Error: "Names with specified id's cannot be retrieved" });
    });
});

server.post("/api/zoos", (req, res) => {
  const zoos = req.body;

  dataBase
    .insert(zoos)
    .into("zoos")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Pass a name." });
    });
});

server.put("/api/zoos/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  dataBase("zoos")
    .where({ id }) // .where('id', '=', id)
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;

  dataBase("zoos")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
//-------------------------MVP----------------------------------//

//------------------------Stretch------------------------------//
server.get("/api/bears", (req, res) => {
  dataBase2("bears")
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Bears  cannot be retrieved" });
    });
});

server.get("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  dataBase2("bears")
    .select("name")
    .where({ id })
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      console.log("Error: ", err);
      res
        .status(500)
        .json({ Error: "Bear Name with specified id cannot be retrieved" });
    });
});

server.post("/api/bears", (req, res) => {
  const bears = req.body;

  dataBase2
    .insert(bears)
    .into("bears")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Pass a bear name." });
    });
});

server.put("/api/bears/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  dataBase2("bears")
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/api/bears/:id", (req, res) => {
  const { id } = req.params;

  dataBase2("bears")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
//------------------------Stretch------------------------------//

server.listen(3300, () =>
  console.log(`\n=== Web API Listening on http://localhost:3300 ===\n`)
);

// const port = 3300;
// server.listen(port, function() {
//   console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
// });
