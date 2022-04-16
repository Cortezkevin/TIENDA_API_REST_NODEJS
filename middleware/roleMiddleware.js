const { handleHttpError } = require("../utils/handleError");
/**
 * Middleware para otorgar permisos
 * @param {*} roles Array con los roles permitidos
 * @returns 
 */
const checkRole = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        const rolesByUser = user.role;
        //funcion para validar que el usuario que intenta usar el recurso tenga los permisos del arreglo roles
        const checkValidRole = roles.some((roleSingle) => rolesByUser.includes(roleSingle));

        if(!checkValidRole){
            handleHttpError(res, "USER_NOT_PERMISSIONS",401);
            return;
        }

        console.log("DATA MIDDLEWARE ROLES", req.body);
        next();
    } catch (error) {
        handleHttpError(res, "ERROR_ROLE_NOT_AUTHORIZED", 401);
    }
};

module.exports = checkRole;