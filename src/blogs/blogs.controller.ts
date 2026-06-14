import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from 'src/common/guard/JwtAuthGuard';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('api/blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createBlog(@Body() dto: CreateBlogDto, @Req() req: any) {
    return this.blogService.createBlog(dto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getBlogs(@Query() query: PaginationDto) {
    return this.blogService.getBlogs(query);
  }
}
