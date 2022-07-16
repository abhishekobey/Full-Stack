import asyncHandler from 'express-async-handler'
import Contact from "../models/Contact.js";

const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({})
    res.json(contacts)
})

const addNewContact = asyncHandler(async (req, res) => {
    const { name, mobile_no, image } = req.body

    const contactExists = await Contact.findOne({ mobile_no })

    if(contactExists) {
        res.status(400)
        throw new Error('Contact already exists')
    }

    const newContact = await Contact.create({
        name,
        mobile_no,
        image
    })

    if(newContact) {
        res.status(201).json({
            _id: newContact._id,
            name: newContact.name,
            mobile_no: newContact.mobile_no,
            image: newContact.image
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


const deleteContact = asyncHandler(async (req, res) => {
    const deleteContact = await Contact.findById(req.params.id)

    if (deleteContact) {
        await deleteContact.remove()
        res.json({ message: 'Contact removed' })
    } else {
        res.status(404)
        throw new Error('Contact not found')
    }
})

const updateContact = asyncHandler(async (req, res) => {
    const updateContact = await Contact.findById(req.params.id)

    if(updateContact) {
        updateContact.name = req.body.name || updateContact.name
        updateContact.mobile_no = req.body.mobile_no || updateContact.mobile_no

        const updatedContact = await updateContact.save()

        res.json({
            _id: updatedContact._id,
            name: updatedContact.name,
            mobile_no: updatedContact.mobile_no,
            image: updatedContact.image
        })

    } else {
        res.status(404)
        throw new Error('Contact not found')
    }
})

export { getAllContacts, deleteContact, updateContact, addNewContact }