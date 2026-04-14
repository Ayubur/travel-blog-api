import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create(data: Partial<User>) {
    return await this.repo.save(data);
  }

  async findByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  async findById(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<User>) {
    return await this.repo.update(id, data);
  }
}
