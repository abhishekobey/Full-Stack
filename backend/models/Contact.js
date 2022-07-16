import mongoose from 'mongoose'

const contactSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        mobile_no: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String
        }
    }, {
        timestamps: true
    }
)

const Contact = mongoose.model('Contact', contactSchema)

export default Contact