import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { RevokedToken } from '../types/revoked-token';

@Injectable()
export class RevokeTokensSeeder implements Seeder {
  constructor(
    @InjectModel('RevokedToken')
    private readonly revokeToken: Model<RevokedToken>,
  ) {}

  async seed(): Promise<any> {}

  async drop(): Promise<any> {
    console.log('droping revoked tokens...');
    return this.revokeToken.deleteMany({});
  }
}
