const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");
const { usersModel } = require("../models");

const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            handleHttpError(res, "NOT_TOKEN", 401);
            return
        }

        const token = req.headers.authorization.split(" ").pop();
        const dataToken = await verifyToken(token);

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA",401);
            return
        }

        const user = await usersModel.findOne({_id: dataToken._id});
        req.user = user;

        console.log("DATA MIDDLEWARE SESSION", req.body);

        next();
    } catch (error) {
        handleHttpError(res, "ERROR_NOT_SESSION",401);
    }
};

module.exports = authMiddleware;