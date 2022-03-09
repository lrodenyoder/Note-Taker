// MIDDLEWARE HERE
const router = require("express").Router();
const noteRoutes = require("../apiRoutes/db");

router.use(noteRoutes);

module.exports = router;