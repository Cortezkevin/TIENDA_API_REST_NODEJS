const handleHttpError = (res, message = "Algo sucedio", status = 403) => {
    res.status(status);
    res.send({error: message});
}

module.exports = {handleHttpError};