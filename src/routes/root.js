const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const con = require("../conn/conn");

router.post("/registarAdmin", function (req, res, next) {
    const { usuario, nombre, contrasena, cpassword } = req.body;
    const role = "admin";

    if (cpassword == contrasena) {
        let sql = "select * from Administrador where usuario = ?;";

        con.query(sql, [usuario], function (err, result, fields) {
            if (err) throw err;

            if (result.length > 0) {
                req.session.flag = 1;
                res.redirect("/");
            } else {
                const hashpassword = bcrypt.hashSync(password, 10);
                let sql =
                    "insert into Administrador(usuario,nombre,contrasena,role) values(?,?,?,?);";

                con.query(
                    sql,
                    [usuario, nombre, hashpassword, role],
                    function (err, result, fields) {
                        if (err) throw err;
                        req.session.flag = 2;
                        res.redirect("/");
                    }
                );
            }
        });
    } else {
        req.session.flag = 3;
        res.redirect("/root");
    }
});

module.exports = router;
