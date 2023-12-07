const express = require("express");
const con = require("./config");
const cors = require("cors");
const upload = require("./upload");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 3000;;
const jwtKey = "buy-pakistan";

app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));

// app.post('/register', (req, res) => {
//     const userData = req.body;

//     con.query('INSERT INTO users (username,email, password) VALUES (?,?,?)', [userData.username,userData.email, userData.password], (err, result) => {
//       if (err) {
//         console.error('Error registering user: ' + err);
//         res.status(500).json({ result: 'Something went wrong' });
//       } else {
//         const userId = result.insertId;
//         const user = { id: userId, email: userData.email };

//         const token = jwt.sign({ user }, jwtKey, { expiresIn: '24h' });
//         res.json({ user, auth: token });
//       }
//     });
//   });

function shouldRegisterAsAdmin(userData) {
  const userEmail = userData.email;

  if (userEmail.endsWith("@admin.com")) {
    return true;
  } else {
    return false;
  }
}

app.post("/register", (req, res) => {
  const userData = req.body;

  const isAdmin = shouldRegisterAsAdmin(userData);

  const sqlQuery =
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";

  con.query(
    sqlQuery,
    [
      userData.username,
      userData.email,
      userData.password,
      isAdmin ? "admin" : "user",
    ],
    (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({ error: "Registration failed" });
      }

      const userId = result.insertId;
      const user = {
        id: userId,
        email: userData.email,
        role: isAdmin ? "admin" : "user",
      };

      const token = jwt.sign({ user }, jwtKey, { expiresIn: "24h" });
      res.json({ user, auth: token });
    }
  );
});

// User Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required fields' });
  }

  con.query(
    "SELECT username FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("Error logging in: " + err);
        res.status(500).json({ result: "Something went wrong" });
      } else if (results.length === 1) {
        const user = results[0];

        const token = jwt.sign({ user }, jwtKey, { expiresIn: "2h" });
        res.json({ user, auth: token });
      } else {
        res.status(404).json({ result: "Not Found" });
      }
    }
  );
});

app.get("/", (req, res) => {
  con.query("select * from products order by id desc", (error, result) => {
    if (error) {
      res.send("error in connection");
    } else {
      //console.log(result);
      res.send(result);
    }
  });
});

app.post("/", upload.single("image"), (req, res) => {
  const data = req.body;
  const uploadedFile = req.file;

  if (uploadedFile) {
    data.img = uploadedFile.filename;
  }

  con.query("INSERT INTO products SET ?", data, (error, result, fields) => {
    if (error) {
      res.status(500).json({ error: "Error inserting data" });
    } else {
      res.json(result);
    }
  });
});

app.put("/update/:id", upload.single("img"), (req, res) => {
  const id = req.params.id;
  const productname = req.body.productname;
  const category = req.body.category;
  const brand = req.body.brand;

  let img = req.file ? req.file.filename : null;

  const data = [productname, brand, category, img, id];

  con.query(
    "UPDATE products SET productname = ?, brand = ?, category = ?, img = IFNULL(?, img) WHERE Id = ?",
    data,
    (error, result, fields) => {
      if (error) {
        res.status(500).json({ error: "Error updating data" });
      } else {
        res.json(result);
      }
    }
  );
});

app.delete("/:id", (req, res) => {
  con.query(
    "DELETE FROM products WHERE Id= ?",
    req.params.id,
    (error, result) => {
      if (error) error;
      res.send(result);
    }
  );
});

app.get("/product/:id", (req, res) => {
  const productId = req.params.id;

  con.query(
    "SELECT * FROM products WHERE Id = ?",
    [productId],
    (error, results) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .send({ error: "An error occurred while fetching the product." });
      } else {
        if (results.length > 0) {
          res.send(results[0]);
        } else {
          res
            .status(404)
            .send({ message: "No product found with the specified ID" });
        }
      }
    }
  );
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];

    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        res.status(401).send({ result: "Please provide a valid token" });
      } else {
        // Check the user's role from the decoded token
        const userRole = decoded.user.role;
        if (userRole === "admin") {
          // User is an admin, allow access
          next();
        } else {
          res
            .status(403)
            .send({ result: "Access denied. Insufficient privileges." });
        }
      }
    });
  } else {
    res.status(403).send({ result: "Send header" });
  }
}

app.get("/search/:key", (req, res) => {
  var name = req.params.key;

  const query = `
      SELECT * FROM products
      WHERE productname  LIKE '%${name}%' OR category  LIKE '%${name}%' OR brand  LIKE '%${name}%';  
    `;

  con.query(query, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Error in connection" });
    } else {
      res.send(result);
    }
  });
});

//------------------------------------------NOFIFICATION---------------------------------------------

app.get("/get-notification", (req, res) => {
  con.query("select * from notification", (error, result) => {
    if (error) {
      res.send("error in connection");
    } else {
      //console.log(result);
      res.send(result);
    }
  });
});

app.post("/post-notification", upload.single("image"), (req, res) => {
  const data = req.body;
  const uploadedFile = req.file;

  if (uploadedFile) {
    data.img = uploadedFile.filename;
  }

  con.query("INSERT INTO notification SET ?", data, (error, result, fields) => {
    if (error) {
      res.status(500).json({ error: "Error inserting data" });
      console.log(error);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.put("/update-notification/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const productname = req.body.productname;
  const category = req.body.category;
  const description = req.body.description;
  const brand = req.body.brand;

  let img = req.file ? req.file.filename : null;

  const data = [productname, brand, category, description, img, id];

  con.query(
    "UPDATE notification SET productname = ?, brand = ?, category = ?,description, img = IFNULL(?, img) WHERE Id = ?",
    data,
    (error, result, fields) => {
      if (error) {
        res.status(500).json({ error: "Error updating data" });
      } else {
        res.json(result);
      }
    }
  );
});

app.get("/get-notification/:id", (req, res) => {
  const productId = req.params.id;

  con.query(
    "SELECT * FROM notification WHERE Id = ?",
    [productId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({
          error: "An error occurred while fetching the feedback data.",
        });
      } else {
        if (results.length > 0) {
          res.send(results[0]);
        } else {
          res
            .status(404)
            .send({ message: "No feedback found with the specified ID" });
        }
      }
    }
  );
});

app.delete("/delete-notification/:id", (req, res) => {
  con.query(
    "DELETE FROM notification WHERE Id= ?",
    req.params.id,
    (error, result) => {
      if (error) error;
      res.send(result);
    }
  );
});

//------------------------------------------Feedback---------------------------------------------

app.get("/get-feedback", (req, res) => {
  con.query("select * from feedback", (error, result) => {
    if (error) {
      res.send("error in connection");
    } else {
      //console.log(result);
      res.send(result);
    }
  });
});

app.post("/post-feedback", (req, res) => {
  const data = req.body;

  con.query("INSERT INTO feedback SET ?", data, (error, result, fields) => {
    if (error) {
      res.status(500).json({ error: "Error inserting data" });
      console.log(error);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.delete("/delete-feedback/:id", (req, res) => {
  con.query(
    "DELETE FROM feedback WHERE Id= ?",
    req.params.id,
    (error, result) => {
      if (error) error;
      res.send(result);
    }
  );
});

app.get("/get-feedback/:id", (req, res) => {
  const productId = req.params.id;

  con.query(
    "SELECT * FROM feedback WHERE Id = ?",
    [productId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({
          error: "An error occurred while fetching the feedback data.",
        });
      } else {
        if (results.length > 0) {
          res.send(results[0]);
        } else {
          res
            .status(404)
            .send({ message: "No feedback found with the specified ID" });
        }
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;