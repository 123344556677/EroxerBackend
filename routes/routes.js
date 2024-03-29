import express from 'express'
import { AdCounterIncrement, createAd, filteredAds, getAdsById, getAllAds } from '../Controllers/adController.js';
import { register, login, updateUser, getUsersById, updatePassword, googleReg, initiateVerification, getAllUsers, googleLogin, verifyCode, deleteAccount, changeOnlineStatus, updateVerifyStatus, updateliveStreamStatus, updateThumbPic, updateUserCover, updateUserProfile, redirectToDashboard, FacebookReg} from "../Controllers/authControllers.js";
import { changeAllCallStatus, changeCallStatus, getAllChatsById, getCallById, getLastMessage, makeCall, sendAlert, sendMessage, updatePicStatus, updateReadStatus } from '../Controllers/chatController.js';
import { ApplyForCreator, getAllCreatorRequest, updateCreatorRequestStatus } from '../Controllers/creatorController.js';
import { addToList, deleteListDataById, getAllListById } from '../Controllers/listController.js';
import { CreatePoll } from '../Controllers/pollController.js';
import {createPost, getAllPosts, getPaginatedPosts, getPostsById, pollCounterIncrement, updatePost } from "../Controllers/postController.js";
import { changeRequestStatus, getAllAcceptedUsers, getAllSubscriptions, getRequestById, getSubscriptionByRecieverId, sendRequest, updateNotiStatus } from '../Controllers/requestController.js';
import { CreatePaymentRequest, createPayment, getAllPayment, getAllPaymentRequest, getAllTip, sendLiveTip, sendTip, updatePaymentRequestStatus, updateTipNotiStatus } from '../Controllers/paymentController.js';
import { createContact, getContactById } from '../Controllers/contactController.js';
import { Notification } from '../Controllers/firebaseController.js';
const router = express.Router();
//auth
router.post('/reg', register);
router.post('/log', login);
router.put('/updateUser', updateUser);
router.post('/userById', getUsersById)
router.put('/updatePassword',updatePassword, )
router.post('/googleReg', googleReg)
router.post('/facebookReg', FacebookReg)
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
router.post('/dashboardUrl', redirectToDashboard);



//post
router.post('/createPost', createPost);
router.post('/getAllPost', getAllPosts);
router.post('/getPaginatedPost', getPaginatedPosts);
router.post('/getPostsByUserId', getPostsById);
router.post('/pollCounterIncrement',pollCounterIncrement)
router.put('/updatePost',updatePost)
//ad
router.post('/createAd', createAd);
router.get('/getAllAd', getAllAds);
router.get('/getAdById/:id', getAdsById);
router.put('/counterIncrement', AdCounterIncrement);
router.post('/filteredAds', filteredAds);
router.post('/getFilteredAds',filteredAds);

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
router.put('/changePicStatus', updatePicStatus);

// request
router.post('/makeRequest', sendRequest);
router.post('/getRequestById', getRequestById);
router.put('/changeRequestStatus', changeRequestStatus);
router.post('/getAllAcceptedUsers', getAllAcceptedUsers);
router.post('/getRequestBySenderId', getSubscriptionByRecieverId);
router.post('/getAllSubscriptions', getAllSubscriptions);
router.put('/updateNotiStatus', updateNotiStatus);

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
router.get('/getAllTip', getAllTip);
router.post('/sendTip', sendTip);
router.post('/createPaymentRequest', CreatePaymentRequest);
router.get('/getAllPaymentRequest', getAllPaymentRequest);
router.put('/changePaymentRequestStatus', updatePaymentRequestStatus);
router.post('/liveTip', sendLiveTip);
router.put('/updateTipNotiStatus', updateTipNotiStatus);

//contact
router.post('/createContact', createContact);
router.post('/getContactById', getContactById);

//notifications
router.post('/sendNotificaion', Notification);





export default router;