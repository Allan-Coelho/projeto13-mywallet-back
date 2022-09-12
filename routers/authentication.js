import express from 'express';
import { sanitizer } from '../middlewares/sanitizer.js';
import { signin, signup } from '../controllers/authentication.js';
import { userValidation } from '../middlewares/userValidation.js'

const router = express.Router();

router.post('/authentication', sanitizer, signin);
router.post('/authentication', sanitizer, userValidation, signup);

export default router;