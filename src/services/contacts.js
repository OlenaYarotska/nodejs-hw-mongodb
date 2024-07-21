import { ContactsCollection } from "../db/models/contact.js";

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};

export const getContactsById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findByIdAndDelete(contactId);
    return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
    const result = await ContactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        { new: true, includeResultMetadata: true, ...options, },
    );
    if (!result || !result.value) return null;
    return {
        contact: result.value,
        isNew: Boolean(result?.lastErrorObject?.upserted),
    };
};
