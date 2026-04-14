import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterDto) {
    const hashPassword = await bcrypt.hash(payload.password, 10);
    const user = await this.userService.create({
      name: payload.name,
      email: payload.email,
      password: hashPassword,
    });
    console.log({ user });
    return await this.generateTokens({
      id: user.id,
      email: user.email,
    });
  }

  async login(payload: LoginDto) {
    const user = await this.userService.findByEmail(payload.email);
    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    return await this.generateTokens({
      id: user.id,
      email: user.email,
    });
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken) throw new UnauthorizedException();

    console.log({ refreshToken });
    const match = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!match) throw new UnauthorizedException();

    return this.generateTokens(user);
  }

  async generateTokens(tokenData: { id: number; email: string }) {
    const payload = { sub: tokenData };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_SECRET || 'ACCESS_SECRET',
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_SECRET || 'REFRESH_SECRET',
      expiresIn: '7d',
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userService.update(tokenData.id, {
      refreshToken: hashedRefreshToken,
    });

    return { accessToken, refreshToken };
  }

  async logout(userId: number) {
    await this.userService.update(userId, { refreshToken: null });
  }
}
