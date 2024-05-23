
import mongoose,{ Schema } from 'mongoose';
import Password from '../util/Password';
import { ROLES } from '../config/ENUM';


interface UserAttributes {
  email_verified?:boolean;
  role:string;
  full_name: string;
  email: string;
  password: string;
}

export interface UserCreationAttributes extends Omit<UserAttributes, "email_verified"|"token"> {}


const userSchema = new Schema<UserAttributes>({
  full_name: { type: String, required: true },
 
  password: { type: String, required: true },
  email_verified: { type: Boolean, required: true,default:false },
  email: { type: String, required: true,unique:true },
  role:{type:String,
    enum:ROLES,
    values:[ROLES.USER,ROLES.ADMIN],
    default:ROLES.USER, 
    required:true},
  // token: { type: String, required: false },
 
  
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
userSchema.pre('save',async function (next) {
  if(!this.isModified("password")){
    next()
  }
  const hash = await Password.toHash(this.password)
  this.password = hash
});
export const User  = mongoose.model<UserAttributes>('User', userSchema);
 