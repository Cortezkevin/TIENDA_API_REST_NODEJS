const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Funcion para crear y firmar el token
 */
const tokenSign = async (user) => {
    const sing = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
    return sing;
}

/**
 * Funcion para verificar el token
 */
const verifyToken = async (token) => {
    try {
        return jwt.verify(token, JWT_SECRET); //veerifica si el token enviado tiene la firma
    } catch (error) {
        return null;
    }
}

module.exports = { tokenSign, verifyToken};