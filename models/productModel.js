import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock:{
          type:Number,
          required:true,
          default:0,
        },
        brand: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
        },
        image:{
            type:String,
        }
    },
    {
        timestamps: true,
    }
);


const Product = mongoose.model('Product', productSchema);

export default Product