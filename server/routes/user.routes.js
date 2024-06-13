const { Router } = require("express");
const router = Router();
const authController=require("../controllers/auth.controller.js");
const userController=require("../controllers/user.controller.js");
const verifyJWT = require("../middleware/auth.middleware.js");

router.get("/", (req, res) => {
  res.redirect("/user/login");
});

router.post("/login", authController.login);
router.post('/register', authController.register);
router.post('/logout',verifyJWT,authController.logout);

router.post('/createPlaylist',verifyJWT,userController.createPlaylist);
router.post('/addToPlaylist',verifyJWT,userController.addToPlaylist);
router.get('/getPlaylist',verifyJWT,userController.getPlaylist);
router.get('/getLists',verifyJWT,userController.getLists);

module.exports = router;
