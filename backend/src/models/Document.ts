import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
    userId: string;
    title: string;
    originalText: string;
    originalLanguage: string;
    uploadedAt: Date;
}

const DocumentSchema: Schema = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    originalText: { type: String, required: true },
    originalLanguage: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IDocument>('Document', DocumentSchema);