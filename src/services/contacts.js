import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";


export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder =  SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
    userId
}) => {

    const limit = perPage;
    const skip = (page - 1) * perPage;

    let contactsQuery = ContactsCollection.find({userId});

    if (filter.contactType) {
        contactsQuery = contactsQuery.where('contactType').equals(filter.contactType);
    }
    if (filter.isFavourite !== undefined && filter.isFavourite !== null) {
        contactsQuery = contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    const contactsCount = await ContactsCollection.find({userId}).merge(contactsQuery).countDocuments();

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

export const getContactsById = async (contactId, userId) => {
    const contact = await ContactsCollection.findOne({ _id: contactId, userId });
    return contact;
};

export const createContact = async (payload) => {
    const contact =  ContactsCollection.create({ ...payload, userId: payload.userId });
    return contact;
};

export const deleteContact = async (contactId, userId) => {
    const contact = await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
    return contact;
};

export const updateContact = async (contactId, userId, payload, options = { upsert: true}) => {
    const result = await ContactsCollection.findOneAndUpdate(
        { _id: contactId, userId },
        payload,
        { new: true, includeResultMetadata: true, ...options },
    );
    if (!result || !result.value) return null;
    return {
        contact: result.value,
        isNew: Boolean(result?.lastErrorObject?.upserted),
    };
};

