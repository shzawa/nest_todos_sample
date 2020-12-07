import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../entities/repositories/user.repository';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private readonly jwtSecret: JwtService,
  ) {}

  async createUser(signUpUserDto: SignUpUserDto): Promise<void> {
    await this.userRepository.createUser(signUpUserDto);
  }

  async signIn(signInUserDto: SignInUserDto): Promise<string> {
    const email = await this.userRepository.validatePassword(signInUserDto);

    const payload: JwtPayload = {
      email,
    };
    return await this.jwtSecret.signAsync(payload);
  }
}
