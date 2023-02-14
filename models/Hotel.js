import mongoose from 'mongoose';
const {Schema} = mongoose;

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        min: 0,
        max: 5,
    },
    rooms: {
        type: [String],
        required: true
    },
    cheapestPrice: {
        type: Number,

    },
    featured: {
        type: Boolean,
        default: false,
    },
})

export default mongoose.model("Hotel", HotelSchema)