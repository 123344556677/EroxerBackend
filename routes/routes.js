import express from 'express'
import { AdCounterIncrement, createAd, getAdsById, getAllAds } from '../Controllers/adController.js';
import { register, login, updateUser, getUsersById, updatePassword, googleReg, initiateVerification, getAllUsers, googleLogin, verifyCode } from "../Controllers/authControllers.js";
import { getAllChatsById, makeCall, sendAlert, sendMessage } from '../Controllers/chatController.js';
import { ApplyForCreator } from '../Controllers/creatorController.js';
import { addToList, deleteListDataById, getAllListById } from '../Controllers/listController.js';
import {createPost, getAllPosts } from "../Controllers/postController.js";
import { changeRequestStatus, getAllAcceptedUsers, getRequestById, getRequestBySenderId, sendRequest } from '../Controllers/requestController.js';
const router = express.Router();
//auth
router.post('/reg', register);
router.post('/log', login);
router.put('/updateUser', updateUser);
router.post('/userById', getUsersById)
router.put('/updatePassword',updatePassword, )
router.post('/googleReg', googleReg)
router.post('/googleLogin', googleLogin)
router.post('/sendCode', initiateVerification)
router.post('/verifyCode', verifyCode)
router.get('/getAllUsers', getAllUsers)

//post
router.post('/createPost', createPost);
router.get('/getAllPost', getAllPosts);
//ad
router.post('/createAd', createAd);
router.get('/getAllAd', getAllAds);
router.get('/getAdById/:id', getAdsById);
router.put('/counterIncrement', AdCounterIncrement);

//chat
router.post('/sendMessage', sendMessage);
router.post('/getAllChatsById', getAllChatsById);
router.post('/newCall', makeCall );
router.post('/sendAlert', sendAlert );

// request
router.post('/makeRequest', sendRequest);
router.post('/getRequestById', getRequestById);
router.put('/changeRequestStatus', changeRequestStatus);
router.post('/getAllAcceptedUsers', getAllAcceptedUsers);
router.post('/getRequestBySenderId', getRequestBySenderId);

//list
router.post('/addToList', addToList);
router.post('/getListById', getAllListById);
router.post('/deleteListDataById', deleteListDataById);

//creator
router.post('/applyForCreator', ApplyForCreator);





export default router;