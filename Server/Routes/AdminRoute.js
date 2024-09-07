import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  //console.log("yaha to aa gya");
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})


const upload = multer();

router.post('/add_employee',upload.none(), (req, res) => {
    const sql = `INSERT INTO employee 
    (Emp_Id,name,email, salary,position, department_id) 
    VALUES (?,?,?, ?, ?, ?)`;

    if (!req.body.Emp_Id || !req.body.name || !req.body.email || !req.body.position || !req.body.salary || !req.body.category_id) {
        return res.json({ Status: false, Error: "each field is required" });
    }

    if(req.body.salary<0){
        return res.json({ Status: false, Error: "Salary can`t be negative"});
    }

    const values = [
        req.body.Emp_Id,
        req.body.name,
        req.body.email, // Use hashed password
        req.body.salary,
        req.body.position,
        req.body.category_id
    ];
    
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Query Error:", err); // Log the query error
            return res.json({ Status: false, Error: err.message || "Query Error" });
        }
        return res.json({ Status: true, message: "Employee added successfully!" });
    });

});

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:Emp_Id', (req, res) => {
    const Emp_Id = req.params.Emp_Id;
    const sql = "SELECT * FROM employee WHERE Emp_Id = ?";
    con.query(sql,[Emp_Id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:Emp_Id', (req, res) => {
    const Emp_Id = req.params.Emp_Id;
    const sql = `UPDATE employee 
        set Emp_Id=?, name = ?, email = ?, salary = ?, position = ?, department_id = ? 
        Where Emp_Id = ?`
    if(req.body.salary<0){
        return res.json({ Status: false, Error: "Salary can`t be negative"});
    }
    const values = [
        req.params.Emp_Id,
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.position,
        req.body.category_id
    ]
    con.query(sql,[...values, Emp_Id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where Emp_Id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(Emp_Id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter };