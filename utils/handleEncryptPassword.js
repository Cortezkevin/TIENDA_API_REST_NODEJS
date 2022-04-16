const bcryptjs = require("bcryptjs");

/**
 * Funcion para encriptar el password
 * @param {*} passwordPlain password plano
 * @returns password encriptado
 */
const encrypt = async (passwordPlain) => {
    //hash => password encriptado
    const hash = await bcryptjs.hash(passwordPlain, 8)// hash(el password, dificultad de encriptado)
    return hash;
}

/**
 * Funcion para comparar password plano con password encriptado
 * @param {*} passwordPlain password plano
 * @param {*} passwordHash password encriptado
 * @returns boolean
 */
const compare = async (passwordPlain, passwordHash) => {
    const result = await bcryptjs.compare(passwordPlain, passwordHash);
    return result;
} 

module.exports = { encrypt, compare };