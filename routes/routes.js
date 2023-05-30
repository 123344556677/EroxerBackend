import express from 'express'
import { AdCounterIncrement, createAd, getAdsById, getAllAds } from '../Controllers/adController.js';
import { register, login, updateUser, getUsersById, updatePassword, googleReg, initiateVerification, getAllUsers, googleLogin, verifyCode, deleteAccount, changeOnlineStatus, updateVerifyStatus } from "../Controllers/authControllers.js";
import { getAllChatsById, getLastMessage, makeCall, sendAlert, sendMessage, updateReadStatus } from '../Controllers/chatController.js';
import { ApplyForCreator } from '../Controllers/creatorController.js';
import { addToList, deleteListDataById, getAllListById } from '../Controllers/listController.js';
import { CreatePoll } from '../Controllers/pollController.js';
import {createPost, getAllPosts, pollCounterIncrement } from "../Controllers/postController.js";
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
router.delete('/deleteAccount',deleteAccount)
router.put('/updateOnlienStatus',changeOnlineStatus)
router.post('/updateVerifyStatus', updateVerifyStatus)


//post
router.post('/createPost', createPost);
router.get('/getAllPost', getAllPosts);
router.post('/pollCounterIncrement',pollCounterIncrement)
//ad
router.post('/createAd', createAd);
router.get('/getAllAd', getAllAds);
router.get('/getAdById/:id', getAdsById);
router.post('/counterIncrement', AdCounterIncrement);

//chat
router.post('/sendMessage', sendMessage);
router.post('/getAllChatsById', getAllChatsById);
router.post('/newCall', makeCall );
router.post('/sendAlert', sendAlert );
router.post('/lastMessage', getLastMessage );
router.post('/updateLastRead', updateReadStatus);

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

//poll
router.post('/createPoll', CreatePoll);






export default router;