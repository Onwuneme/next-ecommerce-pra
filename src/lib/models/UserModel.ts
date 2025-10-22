import { model, models, Schema } from 'mongoose';

// Define the User schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const UserModel = models?.User || model('User', userSchema);

export default UserModel