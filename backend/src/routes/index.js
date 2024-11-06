const {Router} = require('express');

const router = Router();
const postRoutes = require('./post.routes.js');

router.use(postRoutes);

module.exports = router;