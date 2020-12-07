import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../../entities/repositories/user.repository';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { User } from '../../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ email }: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({
      relations: ['todos'],
      where: [{ email }],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
