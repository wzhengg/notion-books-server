import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  email: string;
  password: string;
}

interface IUserMethods {
  isValidPassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.set('timestamps', true);

userSchema.pre('save', async function (next) {
  const SALT_ROUNDS = 10;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser, UserModel>('User', userSchema);
export default User;
