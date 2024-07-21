import { Schema, model } from 'mongoose';

const contactsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    isFavorite: {
        type: Boolean,
        default: false,
        required: false,
    },
    contactType: {
        type: String,
        enum: ['work', 'home', 'personal'],
        required: true,
        default: 'personal',
    },
},
    {
        timestamps: true,
    },
);


export const ContactsCollection =  model('contacts', contactsSchema);