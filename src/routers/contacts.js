import { Router } from 'express';
import { getContactsController, getContactsByIdController, createContactsController, deleteContactsController, patchContactsController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewars/validateBody.js';
import { createContactsSchema, updateContactsSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewars/isValidId.js';


const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactsByIdController));
router.post('/contacts', validateBody(createContactsSchema), ctrlWrapper(createContactsController));
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactsController));
router.patch('/contacts/:contactId', isValidId, validateBody(updateContactsSchema), ctrlWrapper(patchContactsController));




export default router;
