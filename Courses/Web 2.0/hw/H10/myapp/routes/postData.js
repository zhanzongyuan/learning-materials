var express=require('express');
var signUpController=require('./signUpController');
var signInController=require('./signInController');
var router=express.Router();

router.post('/checkExist', signUpController.userExist);

router.post('/signUp', signUpController.saveAccount);
router.post('/signIn', signInController.checkPassword);

module.exports=router;
