import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from 'src/common/guard/JwtAuthGuard';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('api/blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateBlogDto, @Req() req: any) {
    return this.blogService.create(dto, req.user.id);
  }
}
