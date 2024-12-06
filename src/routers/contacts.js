import { Router } from 'express';
import { getContactsController, getContactsByIdController, createContactsController, deleteContactsController, patchContactsController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';


const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));
router.post('/contacts', ctrlWrapper(createContactsController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactsController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactsController));


export default router;
