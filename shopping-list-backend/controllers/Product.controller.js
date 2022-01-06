const Product = require("../models/Product.model");

module.exports.list = async (req, res, next) => {
    const products = await Product.find().exec();
    res.send(products)
}

module.exports.create = async (req, res, next) => {
    await Product.create(req.body)
    res.send({ status: "OK"});
}

module.exports.delete = async (req, res, next) => {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.send({ status: "OK"});
}