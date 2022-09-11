import express from 'express';
import { sanitizer } from '../middlewares/sanitizer.js';
import { sessionVerifier } from '../middlewares/sessionVerifier.js';
import transactionValidation from '../middlewares/transactionValidation.js';
import { insertTransaction, sendUserTransactions } from '../controllers/transactions.js';

const router = express.Router();

router.get('/transactions', sanitizer, sessionVerifier, sendUserTransactions);
router.post('/transactions', sanitizer, sessionVerifier, transactionValidation, insertTransaction);

export default router;