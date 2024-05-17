const express = require('express');
//const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "funhour",
})

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'funhour',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

function queryDatabase(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, [values], (err, results) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  });
}


app.post('/signup', async (req, res) => {
  try {
    db.connect()
    const sql = "INSERT INTO login(name,surname,email,username,password, memberstatus) VALUES (?)";
    const values = [
      req.body.name,
      req.body.surname,
      req.body.email,
      req.body.username,
      req.body.password,
      req.body.memberstatus
    ];
    const results = await queryDatabase(sql, values);

    console.log('Inserting values:', values);
    res.json("Success");
  } catch (error) {
    console.error('Database error:', error);
    res.json({ fail: true });
  }
});

app.post('/createworkshop', async (req, res) => {
  try {
    db.connect()
    const sql = "INSERT INTO workshops(name,time,quota,location,date,description,organizer) VALUES (?)";
    const values = [
      req.body.name,
      req.body.time,
      req.body.quota,
      req.body.location,
      req.body.date,
      req.body.description,
      req.body.organizer
    ];
    const results = await queryDatabase(sql, values);
    console.log('Inserting values:', values);
    res.json("Success");
  } catch (error) {
    console.error('Database error:', error);
    res.json({ fail: true });
  }
});



app.get('/workshopdetails', async (req, res) => {
  try {
    const sql = 'SELECT * FROM workshops';
    //res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.json({ fail: true });
  }
});







app.post('/editprofile', (req, res) => {
  db.connect()
  const sql = "UPDATE login SET name=?,surname=?,username=?,password=? WHERE email=?";
  const values = [
    req.body.name,
    req.body.surname,
    req.body.username,
    req.body.password,
    req.body.email
  ];
  db.query(sql, values, (err, data) => {
    console.log('Inserting values: ', values);
    if (err) {
      console.error(err);
      return res.json("Error updating profile");
    }
    return res.json({ success: true });
  })
}
)


app.post('/editworkshop', (req, res) => {
  db.connect()
  const sql = "UPDATE workshops SET name=?,date=?,time=?,location=?,quota=?,description=?, organizer=? WHERE name=?";
  const values = [
    req.body.name,
    req.body.date,
    req.body.time,
    req.body.location,
    req.body.quota,
    req.body.description,
    req.body.organizer
  ];
  db.query(sql, values, (err, data) => {
    console.log('Inserting values: ', values);
    if (err) {
      console.error(err);
      return res.json("Error updating workshop");
    }
    return res.json({ success: true });
  })
}
)





app.get('/showworkshops', (req, res) => {
  const sql = "SELECT * FROM workshops";

  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ fail: true });
    } else {
      return res.json(data);
    }
  });
});






app.get('/organizedworkshops', (req, res) => {
  const username = req.query.username;
  const sql = "SELECT * FROM workshops WHERE organizer =  (SELECT username FROM login WHERE username = ?)";

  db.query(sql, [username], (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ fail: true });
    } else {
      return res.json(data);
    }
  });
});





app.get('/showaddress', (req, res) => {
  db.connect()
  const email = req.query.email;

  const sql = "SELECT address, city, country FROM address where email=(select email from login where email=?)";


  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ fail: true });
    } else {
      return res.json(data);
    }
  });
});

app.get('/showcards', (req, res) => {
  db.connect()
  const email = req.query.email;

  const sql = "SELECT name_surname, cardnumber, date FROM cards where email=(select email from login where email=?)";


  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ fail: true });
    } else {
      return res.json(data);
    }
  });
});

app.post('/login', (req, res) => {
  db.connect()
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?  ";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {

      const username = data[0].username;
      const name = data[0].name;
      const surname = data[0].surname;
      const memberstatus = data[0].memberstatus;
      const id = data[0].id;
      const password = data[0].password;

      return res.json({ success: true, username, name, surname, memberstatus, id, password })
        ;
    } else {
      db.end()

      return res.json("Fail");
    }
  })
}
)

app.post('/addtocart', (req, res) => {
  const sql = "INSERT INTO cartitem(id,name,quantity,price) VALUES (?)";
  const values = [
    req.body.id,
    req.body.name,
    req.body.quantity,
    req.body.price

  ]
  db.query(sql, [values], (err, data) => {


    if (err) {
      return res.json({ fail: true });
    } else {
      console.log('Inserting values: ', values);
      return res.json("Succes");
    }

  })
}
)
app.get('/showcartitems', (req, res) => {
  const id = req.query.id;
  const sql = "SELECT * FROM cartitem where id =(select id from login where id=?)";
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.json({ fail: true });
    } else {
      return res.json(data);
    }
  });
});

app.delete('/deletecartitem', (req, res) => {
  const itemid = req.query.itemid;

  const sql = 'DELETE FROM cartitem WHERE itemid = ?';
  db.query(sql, [itemid], (err, result) => {
    if (err) {
      console.error('Error removing cart item:', err);
      return res.json({ success: false, message: 'Error removing cart item' });
    }


    console.log('Cart item removed successfully');
    return res.json({ success: true });
  });
});




app.post('/searchbooks', (req, res) => {
  const sql = "SELECT * FROM books WHERE name = ?";
  const name = req.body.name;

  db.query(sql, [name], (err, data) => {
    if (err) {
      console.error(err);
      return res.json("Error searching books");
    }

    return res.json(data);
  });
});
app.delete('/deletebook', (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({ error: 'Book name is required' });
  }

  const sql = "DELETE FROM books WHERE name = ?";
  db.query(sql, [name], (err, result) => {
    if (err) {
      console.error('Error deleting book:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  });
});


app.put('/updatequantity', (req, res) => {
  const itemid = req.query.itemid;
  const newQuantity = req.query.quantity;

  const sql = "UPDATE cartitem SET quantity = ? WHERE itemid = ?";


  db.query(sql, [newQuantity, itemid], (err, result) => {
    if (err) {
      console.error('Error updating quantity in the database:', err);
      return res.json({ success: false, error: 'Failed to update quantity' });
    }

    return res.json({ success: true });
  });
});

app.put('/editquantity', (req, res) => {
  const name = req.query.name;
  const newQuantity = req.query.quantity;
  if (!name || !newQuantity) {
    return res.status(400).json({ error: 'Book name and new quantity are required' });
  }

  const sql = 'UPDATE books SET quantity = ? WHERE name = ?';
  db.query(sql, [newQuantity, name], (err, result) => {
    if (err) {
      console.error('Error updating quantity:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Quantity updated successfully' });
  });
});



app.post('/adminlogin', (req, res) => {
  db.connect()
  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?  ";

  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      const username = data[0].username;


      return res.json({ success: true, username })
        ;
    } else {
      return res.json("Fail");
    }
  })
}
)
app.get('/workshops', (req, res) => {
  const sql = "SELECT * FROM workshops ";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ fail: true });
    } else {
      return res.json(data);
    }
  });
});


// app.post('/addbook',upload.single('image'),(req,res)=> {

//   const sql ="INSERT INTO books(name,author,price,category,quantity) VALUES (?)";
//   const values = [
//       req.body.name,
//       req.body.author,
//       req.body.price,
//       req.body.category,
//       req.body.quantity,



//   ]
//   db.query(sql, [values], (err,data)=> {


//     if(err){
//       return res.json({fail: true});
//     }  else {
//       console.log('Inserting values: ', values);
//       return res.json("Success");
//     }

//   })
// }
//)
app.post('/addaddress', (req, res) => {
  const sql = "INSERT INTO address(address, city, country, email) VALUES (?)";
  const values = [
    req.body.address,
    req.body.city,
    req.body.country,
    req.body.email
  ];

  db.query(sql, [values], (err, data) => {
    if (err !== null) {
      return res.json({ fail: true });
    } else {
      console.log('Inserting values:', values);
      return res.json({ success: true });
    }
  });
});

app.post('/addcard', (req, res) => {
  const sql = "INSERT INTO cards(name_surname, cardnumber, date, email) VALUES (?)";
  const values = [
    req.body.name_surname,
    req.body.cardnumber,
    req.body.date,
    req.body.email
  ];

  db.query(sql, [values], (err, data) => {
    if (err !== null) {
      return res.json({ fail: true });
    } else {
      console.log('Inserting values:', values);
      return res.json({ success: true });
    }
  });
});
// app.post('/upload',upload.single('image'),(req,res)=> {
//  const image=req.file.filename;
//  const name=req.params.name;
//   const sql ="UPDATE books SET image = ? WHERE name = ?";

//   db.query(sql, [image,name], (err,result)=> {


//     if(err){
//       return res.json({fail: true});
//     }  else {

//       return res.json("Success");
//     }

//   })
// }
// )


app.listen(8081, () => {
  console.log('Server is running on port 8081');
})


