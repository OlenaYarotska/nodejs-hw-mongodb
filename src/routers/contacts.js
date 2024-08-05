import { Router } from 'express';
import { getContactsController, getContactsByIdController, createContactsController, deleteContactsController, patchContactsController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewars/validateBody.js';
import { createContactsSchema, updateContactsSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewars/isValidId.js';
import { authenticate } from '../middlewars/authenticate.js';


const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));
router.post('/', validateBody(createContactsSchema), ctrlWrapper(createContactsController));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactsController));
router.patch('/:contactId', isValidId, validateBody(updateContactsSchema), ctrlWrapper(patchContactsController));




export default router;


// import { Router } from 'express';
// import { getContactsController, getContactsByIdController, createContactsController, deleteContactsController, patchContactsController } from '../controllers/contacts.js';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { validateBody } from '../middlewars/validateBody.js';
// import { createContactsSchema, updateContactsSchema } from '../validation/contacts.js';
// import { isValidId } from '../middlewars/isValidId.js';
// import { authenticate } from '../middlewars/authenticate.js';


// const router = Router();

// router.use(authenticate);
// router.get('/', ctrlWrapper(getContactsController));
// router.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));
// router.post('/', validateBody(createContactsSchema), ctrlWrapper(createContactsController));
// router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactsController));
// router.patch('/:contactId', isValidId, validateBody(updateContactsSchema), ctrlWrapper(patchContactsController));


// export default router;
