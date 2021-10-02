import * as mongoose from 'mongoose';
import { EResource, EAction } from '../../types/role';
export const RoleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    resource: { type: String, enum: EResource, required: true },
    actions: [{ type: String, enum: EAction, required: true }],
  },
  { timestamps: true },
);

export const RoleModel = mongoose.model('role', RoleSchema);
