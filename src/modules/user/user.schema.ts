import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwt.config';
import { config } from '../../config/app.config';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    roles: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    ],
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = bcrypt.hashSync(
      this['password'],
      bcrypt.genSaltSync(config.salt),
    );
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, name: this['name'], username: this['username'] },
    jwtConfig.secret,
    jwtConfig.signOptions,
  );
};

UserSchema.methods.validatePassword = function (password): Boolean {
  return bcrypt.compareSync(password, this['password']);
};

export const UserModel = mongoose.model('user', UserSchema);
