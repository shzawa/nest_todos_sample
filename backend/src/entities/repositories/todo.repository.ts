import { EntityRepository, Repository } from 'typeorm';
import { Todo } from '../todo.entity';
import { CreateTodoDto } from '../../todos/dto/create-todo.dto';
import { User } from '../user.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(
    { title, category }: CreateTodoDto,
    user: User,
  ): Promise<Todo> {
    const todo = new Todo();
    todo.title = title;
    todo.category = category;
    todo.userId = user.id;
    await todo.save();

    delete todo.user;
    return todo;
  }

  async getOwnTodo(id: number, user: User): Promise<Todo> {
    const todo = await this.findOne({ id });
    if (!todo) {
      throw new NotFoundException('そのタスクは存在しません。');
    }
    if (todo.userId !== user.id) {
      throw new UnauthorizedException(
        '投稿者本人以外はタスクを更新できません。',
      );
    }
    return todo;
  }
}
