import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import pino from 'pino-http';
import { env } from './utils/env.js';
import { getAllContacts, getContactsById } from './services/contacts.js';


dotenv.config();


 export function setupServer() {
    const app = express();
    const PORT = Number(env('PORT') || 3000);

    app.get('/', (req, res) => {
        res.send('Server is running!');
    });

   app.get('/contacts', async (req, res) => {
     const contacts = await getAllContacts();

     res.status(200).json({
      status: 200,
      data: contacts,
      message: "Successfully found contacts!",
     });
   });

   app.get('/contacts/:contactId', async (req, res, next) => {
     const { contactId } = req.params;
     const contact = await getContactsById(contactId);
     if (!contact) {
       res.status(404).json({
         message: 'Contact not found!',
       });
       return;
     }
     res.status(200).json({
       status: 200,
       message: `Successfully found contact with id ${contactId}!`,
       data: contact,
     });
    });

     app.use(cors());
     app.use(express.json());
     app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

    app.use('*', (req, res, next) => {
  res.status(404).json({
  message: 'Not found',
});
});


    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
}


// import express from 'express';
// import cors from 'cors';
// import dotenv from "dotenv";
// import pino from 'pino-http';
// import { env } from './utils/env.js';
// import { getAllContacts, getContactsById } from './services/contacts.js';

// dotenv.config();

// export function setupServer() {
//     const app = express();
//     const PORT = Number(env('PORT') || 3000);

//     console.log(`Starting server on port ${PORT}`);

//     app.get('/', (req, res) => {
//         res.send('Server is running!');
//     });

//     app.get('/contacts', async (req, res) => {
//         const contacts = await getAllContacts();
//         res.status(200).json({
//             status: 200,
//             data: contacts,
//             message: "Successfully found contacts!",
//         });
//     });

//     app.get('/contacts/:contactId', async (req, res, next) => {
//         const { contactId } = req.params;
//         const contact = await getContactsById(contactId);
//         if (!contact) {
//             res.status(404).json({
//                 message: 'Contact not found!',
//             });
//             return;
//         }
//         res.status(200).json({
//             status: 200,
//             message: `Successfully found contact with id ${contactId}!`,
//             data: contact,
//         });
//     });

//     app.use(cors());
//     app.use(express.json());
//     app.use(
//         pino({
//             transport: {
//                 target: 'pino-pretty',
//             },
//         }),
//     );

//     app.use('*', (req, res, next) => {
//         res.status(404).json({
//             message: 'Not found',
//         });
//     });

//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }
