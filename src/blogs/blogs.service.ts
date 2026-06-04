import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
    private readonly userService: UsersService,
  ) {}

  async create(dto: CreateBlogDto, userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const blog = await this.blogRepo.save({
      ...dto,
      author: user,
    });

    const { author, ...blogData } = blog;
    return {
      ...blogData,
    };
  }
}
