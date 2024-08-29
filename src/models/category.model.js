import { Schema, model} from 'mongoose';


const categorySchema = new Schema({
    name:{
            type:'String',
            trim: true,
            required:[true,'Please enter a name'],
    },
    description:{
        type: 'String',
        trim: true,
        default:'No description'
    }
    ,
    ownerId:{
         type: Schema.Types.ObjectId,
         required:[true,'Please enter a owner'] ,
         ref: 'User' },
},{timestamps:true});
export const Category = model('Category', categorySchema);