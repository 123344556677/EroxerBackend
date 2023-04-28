import express from 'express'
import { createAd, getAdsById, getAllAds } from '../Controllers/adController.js';
import { register, login, updateUser, getUsersById, updatePassword } from "../Controllers/authControllers.js";
import {createPost, getAllPosts } from "../Controllers/postController.js";
const router = express.Router();
//auth
router.post('/reg', register);
router.post('/log', login);
router.put('/updateUser', updateUser);
router.post('/userById', getUsersById)
router.put('/updatePassword',updatePassword, )
//post
router.post('/createPost', createPost);
router.get('/getAllPost', getAllPosts);
//ad
router.post('/createAd', createAd);
router.get('/getAllAd', getAllAds);
router.get('/getAdById/:id', getAdsById);

export default router;