import express from 'express'
import { createAd, getAdsById, getAllAds } from '../Controllers/adController.js';
import { register, login, updateUser, getUsersById, updatePassword, googleReg, sendMobileCode, initiateVerification, getAllUsers, googleLogin } from "../Controllers/authControllers.js";
import { getAllChatsById, makeCall, sendMessage } from '../Controllers/chatController.js';
import {createPost, getAllPosts } from "../Controllers/postController.js";
import { getRequestById, sendRequest } from '../Controllers/requestController.js';
const router = express.Router();
//auth
router.post('/reg', register);
router.post('/log', login);
router.put('/updateUser', updateUser);
router.post('/userById', getUsersById)
router.put('/updatePassword',updatePassword, )
router.post('/googleReg', googleReg)
router.post('/googleLogin', googleLogin)
router.post('/mobileCode', initiateVerification)
router.get('/getAllUsers', getAllUsers)

//post
router.post('/createPost', createPost);
router.get('/getAllPost', getAllPosts);
//ad
router.post('/createAd', createAd);
router.get('/getAllAd', getAllAds);
router.get('/getAdById/:id', getAdsById);

//chat
router.post('/sendMessage', sendMessage);
router.post('/getAllChatsById', getAllChatsById);
router.post('/newCall', makeCall );

// request
router.post('/makeRequest', sendRequest);
router.post('/getRequestById', getRequestById);



export default router;