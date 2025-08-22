import { Router } from 'express';
import { createInvoice, generatePdf } from '../controllers/invoiceController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, createInvoice);
router.post('/generate-pdf', generatePdf);

export default router;
