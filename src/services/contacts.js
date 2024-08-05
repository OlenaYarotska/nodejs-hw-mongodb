import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER }  from "../constants/index.js";


export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder =  SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
}) => {

    const limit = perPage;
    const skip = (page - 1) * perPage;

    let contactsQuery = ContactsCollection.find();

    if (filter.contactType) {
        contactsQuery = contactsQuery.where('contactType').equals(filter.contactType);
    }
    if (filter.isFavourite !== undefined && filter.isFavourite !== null) {
        contactsQuery = contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();

    const contacts = await contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec();

    const paginationData = calculatePaginationData(contactsCount, page, perPage);

    return {
        data: contacts,
        ...paginationData
    };
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

