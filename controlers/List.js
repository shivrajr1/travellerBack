const wrapasync=require('../utils/wrapasync');
const List=require('../modules/lists');
const ExpressError=require("../utils/ExpressError");
const {cloudinary}=require("../cloudJs");



module.exports.AllList=wrapasync(async(req,res)=>{
    let allLists=await List.find({});
    res.status(200).json({allLists,'user':req.user});
  })

module.exports.NewList=wrapasync(async(req,res,next)=>{
    if(!req.file){
      next(new ExpressError(403,'image required'))
    }else{
      const newUser=new List(req.body)
      newUser.img.filename=req.file.filename;
      newUser.img.url=req.file.path;
      await newUser.save();
      res.status(200).send("success");
    }
      
})

module.exports.ShowList=wrapasync(async(req,res)=>{
        let {id}=req.params;
        let list=await List.findById(id).populate('reviews').populate('owner');
        res.status(200).json(list);
})

module.exports.UpdateList=wrapasync(async(req,res,next)=>{
    if(!req.file){
      next(new ExpressError(403,'image required'))
    }else{
      let {id}=req.params;
      let updatedList=await List.findByIdAndUpdate(id,{...req.body});
      cloudinary.uploader.destroy(updatedList.img.filename)
      updatedList.img.filename=req.file.filename;
      updatedList.img.url=req.file.path;
      await updatedList.save();
      res.status(200).send("success");
    }
      
})

module.exports.DeleteList=wrapasync(async(req,res)=>{
        let list=await List.findByIdAndDelete(req.params.id);
        cloudinary.uploader.destroy(list.img.filename);
        res.status(200).send("deleted");
  })

  module.exports.ShowUpdateList=wrapasync(async(req,res)=>{
          let {id}=req.params;
          let list=await List.findById(id);
          res.status(200).json(list);
  })