const express=require('express')
const router=express.Router();
const {AllList,NewList,ShowList,UpdateList,DeleteList,ShowUpdateList}=require('../controlers/List')
const {listValidate}=require('../middlewares/ListValidate');
const {islogin}=require('../middlewares/isLogin');
const {islistAuthor}=require('../middlewares/IsListAuthor');
const multer  = require('multer')
const {storage}=require("../cloudJs")
const upload = multer({storage})



router.route("/").get(AllList)

router.route("/new")
.post(islogin,upload.single('img'),listValidate,NewList)

router.route("/:id")
.get(islogin,ShowList)
.put(islogin,islistAuthor,upload.single('img'),listValidate,UpdateList)
.delete(islogin,islistAuthor,DeleteList)

router.route("/:id/edit")
.get(islogin,islistAuthor,ShowUpdateList)


module.exports=router;