const router = require("express").Router();
const ProductController = require("../controllers/Product.controller");

router.get("/", async (req, res, next) => {
    res.send( {hola: "Mundo"} )
});


router.get("/shopping-list", ProductController.list);

router.post("/shopping-list", ProductController.create);

router.delete("/shopping-list/:id", ProductController.delete);

module.exports = router;