const express=require('express');
const router=express.Router();

const postApi=require("../../../controllers/api/v1/post_api");
 
router.get('/', postApi.index);
router.delete('/:id', postApi.destroy);
//app comment ki id le rahe the oh ok got it now user ke pass chalte hai ok
module.exports=router;