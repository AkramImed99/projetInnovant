const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projet_innovant"
});


/* Signup route */
router.post('/register', async function (req, res, next) {
    try {
        let { firstName, lastName, email, password } = req.body;

        const hashed_password = md5(password.toString())

        const checkUserEmail = `Select email FROM users WHERE email = ?`;
        con.query(checkUserEmail, [email], (err, result, fields) => {
            if (!result.length) {
                const sql = `Insert Into users (first_name, last_name, email, password) VALUES ( ?, ?, ?, ? )`;
                con.query(
                    sql, [firstName, lastName, email, hashed_password],
                    (err, result, fields) => {
                        if (err) {
                            res.send({ status: 0, data: err });
                        } else {
                            let token = jwt.sign({ data: result }, 'secret')
                            res.send({ status: 1, data: result, token: token });
                        }

                    })
            }
        });
    } catch (error) {
        res.send({ status: 0, error: error });
    }
});

/* Login route */
router.post('/login', async function (req, res, next) {
    try {
        console.log('here');
        let { email, password } = req.body;

        const hashed_password = md5(password.toString())
        const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
        con.query(
            sql, [email, hashed_password],
            function (err, result, fields) {
                if (err) {
                    res.send({ status: 0, data: err });
                } else {
                    let token = jwt.sign({ data: result }, 'secret')
                    res.send({ status: 1, data: result, token: token });
                }

            })
    } catch (error) {
        res.send({ status: 0, error: error });
    }
});

/* Get users route */
router.get('/users', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)

        connection.query('SELECT * from users', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log('The data from user table are: \n', rows)
        })
    })
})



module.exports = router;