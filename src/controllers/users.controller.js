

const seeUser = async (req, res) => {
    res.send("usuario");
    console.log("root");
}; //Esto no tiene sentido sin session

module.exports = seeUser;
