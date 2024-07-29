import createHttpError from 'http-errors';
import {createContact,deleteContact,getAllContacts, getContactsById, updateContact} from "../services/contacts.js";
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
    });

     res.status(200).json({
      status: 200,
      data: contacts,
      message: "Successfully found contacts!",
     });
};

export const getContactsByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const contact = await getContactsById(contactId);
    if (!contact) {
        throw createHttpError(404, 'Contact not found!');
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
    } catch (error) {
        next(error);
    };
};

export const createContactsController = async (req, res, next) => {
        const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    });
};
export const deleteContactsController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.status(204).send();
};

export const patchContactsController = async (req, res, next) => {
    const { contactId } = req.params;

    const result = await updateContact(contactId, req.body);

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.contact,

    });
};
