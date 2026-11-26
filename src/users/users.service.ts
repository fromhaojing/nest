import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from "typeorm";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {

  @InjectEntityManager()
  private manager: EntityManager

  @InjectRepository(Users)
  private repository: Repository<Users>

  create(createUserDto: CreateUserDto) {
    this.repository.save(createUserDto)
  }
}
