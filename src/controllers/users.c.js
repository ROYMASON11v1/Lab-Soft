import pool from '../database/db.js'



export const userLogIn = async (req, res) => {
    const {email, password } = req.body;

    const sql = "select * from cliente where correo = ?";

    const [ result ] = await pool.query(sql, [email]);

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Employee not found'
    })

    res.json( rows );

    // con.query(sql, [email], function (err, result, fields) {
    //     if (err) throw err;

    //     if ( result.length && bcrypt.compareSync(password, result[0].contrasena)) {
    //         req.session.role = result[0].role;
    //         req.session.usuario = result[0].nombre;
    //         res.redirect("/libreria");
    //     } else {
    //         req.session.flag = 4;
    //         res.redirect("/");
    //     }
    // });
};

export const userLogOut = async (req, res) => {
    console.log("logout")
};

export const userRegister = async (req, res) => {
    console.log("logout")
};

export const userLibreria = async (req, res) => {
    console.log("logout")
};


export const seeUser = async (req, res) => {
    res.send("usuario");
    console.log("root");
}; //Esto no tiene sentido sin session