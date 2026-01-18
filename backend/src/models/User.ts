import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  nativeLanguage: string;
  learningLanguages: string[];
  currentLevel: {
    [language: string]: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  };
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nativeLanguage: { type: String, required: true },
  learningLanguages: [{ type: String }],
  currentLevel: { type: Map, of: String, default: new Map() },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);