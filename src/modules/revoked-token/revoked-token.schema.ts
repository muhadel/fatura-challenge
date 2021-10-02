import * as mongoose from 'mongoose';

export const RevokedTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true, index: true },
    expireIn: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const RevokedTokenModel = mongoose.model('revoked-token', RevokedTokenSchema);
