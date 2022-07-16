import express from 'express'
import {getAllContacts, addNewContact, updateContact, deleteContact} from "../controllers/contactControllers.js";
const router = express.Router()

router.route('/getAllContacts').get(getAllContacts)
router.route('/addNewContact').post(addNewContact)
router.route('/deleteContact/:id').delete(deleteContact)
router.route('/updateContact/:id').put(updateContact)

export default router