const { productsModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

/**
 * Funcion para obtener todos los items
 * @param {*} req 
 * @param {*} res 
 */
 const getAllItems = async (req, res) => {
    try {    
        const user = req.user;
        const data = await productsModel.findAllData({});        
        //data.set("categoryId", undefined, {strict: false});
        res.send({data, user});
    } catch (error) {
        console.log("ERROR ------------------- ",error);
        handleHttpError(res, "ERROR_GET_ITEMS");
    }
};

/**
 * Funcion para obtener un item
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await productsModel.findById(id);
        const user = req.user;
        res.send({data, user});
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEM");
    }
};

/**
 * Funcion para crear un nuevo item
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        //req = matchedData(req);
        const { body } = req;
        const data = await productsModel.create(body);
        const user = req.user;
        res.send({data, user});
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_ITEM");
    }
};

/**
 * Funcion para actualizar un item
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req);
        const data = await productsModel.findOneAndUpdate(id, body);
        const user = body.user;
        res.send({data, user});
    } catch (error) {
        handleHttpError(req,"ERROR_UPDATE_ITEM");
    }
};

/**
 * Funcion para eliminar un item
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req);
        const data = await productsModel.delete({_id: id});
        const user = req.user;
        res.send({data, user});
    } catch (error) {
        handleHttpError(req,"ERROR_DELETE_ITEM");
    }
};

module.exports = { getAllItems, getItem, createItem, updateItem, deleteItem };