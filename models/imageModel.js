import mongoose from 'mongoose';
const imageSchema = mongoose.Schema({

    imgCollection: {
        type: Array
    }
})
const Image = mongoose.model('Image',imageSchema);
export default Image;