const express = require("express");
const { matchedData } = require("express-validator");
const { usersModel } = require("../models");
const { tokenSign, verifyToken} = require("../utils/handleJWT");
const { encrypt, compare } = require("../utils/handleEncryptPassword");
const { handleHttpError } = require("../utils/handleError");

/**
 * Funcion para registrar un Nuevo Usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerUser = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = { ...req, password};
        const dataUser = await usersModel.create(body);
        dataUser.set("password", undefined, {strict: false});
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser        
        }
        res.send({data});
    } catch (error) {        
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
}

/**
 * Funcion para Logear Usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginUser = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({email: req.email});
    
        if(!user){
            handleHttpError(req, "USER_NOT_EXIST", 404);
            return
        };
    
        const hashPassword = user.get("password");
        const check = compare(req.password, hashPassword);
    
        if(!check){
            handleHttpError(res, "PASSWORD_INVALID", 401);
            return
        };
    
        user.set("password", undefined, {strict: false});
        
        const data = {
            token: await tokenSign(user),
            user
        }
    
        res.send({data});
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
}

module.exports = { registerUser, loginUser };