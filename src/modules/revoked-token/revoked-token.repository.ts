import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';
import { Model } from 'mongoose';
import { RevokedToken } from '../../types/revoked-token';

@Injectable()
export class RevokedTokenRepository {
  constructor(
    @InjectModel('RevokedToken') private revokedTokenModel: Model<RevokedToken>,
  ) {}

  async create(revokedToken: RevokedToken): Promise<RevokedToken> {
    const revokedTokenCreated = new this.revokedTokenModel(revokedToken);
    return revokedTokenCreated.save();
  }

  async findOne(filter: FilterQuery<RevokedToken>): Promise<RevokedToken> {
    return await this.revokedTokenModel.findOne(filter);
  }
}
