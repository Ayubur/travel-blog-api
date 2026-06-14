import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UsersService } from 'src/users/users.service';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
    private readonly userService: UsersService,
  ) {}

  async createBlog(dto: CreateBlogDto, userId: number) {
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

  async getBlogs(query: PaginationDto) {
    const { page, limit } = query;

    const [blogs, total] = await this.blogRepo.findAndCount({
      relations: {
        author: true,
      },
      order: {
        createdAt: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
        images: blog.images,
        createdAt: blog.createdAt,
        author: {
          id: blog.author.id,
          name: blog.author.name,
          email: blog.author.email,
        },
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
