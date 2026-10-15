import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto.js';
import { UpdateProblemDto } from './dto/update-problem.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProblemsService {
  constructor(private readonly prisma: PrismaService) {}


  create(createProblemDto: CreateProblemDto) {
    return 'This action adds a new problem';
  }

  findAll() {
    return this.prisma.problems.findMany();
    // return `This action returns all problems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} problem`;
  }

  update(id: number, updateProblemDto: UpdateProblemDto) {
    return `This action updates a #${id} problem`;
  }

  remove(id: number) {
    return `This action removes a #${id} problem`;
  }
}
