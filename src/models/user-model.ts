import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.set('timestamps', true);

userSchema.pre('save', async function (next) {
  const SALT_ROUNDS = 10;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

const User = model<IUser>('User', userSchema);
export default User;
