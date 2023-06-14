import express from 'express'
import { AdCounterIncrement, createAd, getAdsById, getAllAds } from '../Controllers/adController.js';
import { register, login, updateUser, getUsersById, updatePassword, googleReg, initiateVerification, getAllUsers, googleLogin, verifyCode, deleteAccount, changeOnlineStatus, updateVerifyStatus, updateliveStreamStatus, updateThumbPic, updateUserCover, updateUserProfile } from "../Controllers/authControllers.js";
import { changeAllCallStatus, changeCallStatus, getAllChatsById, getCallById, getLastMessage, makeCall, sendAlert, sendMessage, updateReadStatus } from '../Controllers/chatController.js';
import { ApplyForCreator, getAllCreatorRequest, updateCreatorRequestStatus } from '../Controllers/creatorController.js';
import { addToList, deleteListDataById, getAllListById } from '../Controllers/listController.js';
import { CreatePoll } from '../Controllers/pollController.js';
import {createPost, getAllPosts, pollCounterIncrement } from "../Controllers/postController.js";
import { changeRequestStatus, getAllAcceptedUsers, getRequestById, getRequestBySenderId, sendRequest } from '../Controllers/requestController.js';
import { createPayment, getAllPayment } from '../Controllers/paymentController.js';
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
router.post('/deleteAccount',deleteAccount)
router.put('/updateOnlienStatus',changeOnlineStatus)
router.post('/updateVerifyStatus', updateVerifyStatus)
router.put('/updateLiveStreamStatus', updateliveStreamStatus)
router.put('/updateThumbPic', updateThumbPic)
router.put('/updateUserCover', updateUserCover);
router.put('/updateUserProfile', updateUserProfile);


//post
router.post('/createPost', createPost);
router.get('/getAllPost', getAllPosts);
router.post('/pollCounterIncrement',pollCounterIncrement)
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
router.post('/lastMessage', getLastMessage );
router.post('/updateLastRead', updateReadStatus);
router.put('/changeCallStatus', changeCallStatus);
router.put('/changeAllCallStatus', changeAllCallStatus);
router.post('/getCallById', getCallById);

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
router.get('/getAllCreatorsRequest', getAllCreatorRequest);
router.put('/updateVideoStatus', updateCreatorRequestStatus);

//poll
router.post('/createPoll', CreatePoll);
//payment
router.post('/createPayment', createPayment);
router.get('/getAllPayment', getAllPayment);






export default router;