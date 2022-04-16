const models = {
    usersModel: require("./nosql/users"),
    productsModel: require("./nosql/products"),
    categoriesModel: require("./nosql/categories"),
    suppliersModel: require("./nosql/suppliers"),
    ordersModel: require("./nosql/orders"),
    paymentsModel: require("./nosql/payments"),
    ordersDetailsModel: require("./nosql/orderDetails")
};

module.exports = models;