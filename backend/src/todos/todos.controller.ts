import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from 'src/entities/todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('todos')
@Controller('todos')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'タスク作成完了',
    type: Todo,
  })
  async createTodo(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return await this.todosService.createTodo(createTodoDto, user);
  }

  @Get()
  @ApiOkResponse({
    description: 'タスク一覧取得完了',
    type: [Todo],
  })
  async getTodos() {
    const todos = await this.todosService.getTodos();
    return todos.map(t => {
      delete t.user.password;
      return t;
    });
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'タスク単体取得完了',
    type: Todo,
  })
  @ApiNotFoundResponse({
    description: '指定のタスクが存在しない',
  })
  async getTodo(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todosService.getTodo(id);
    delete todo.user.password;
    return todo;
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'タスク更新完了',
    type: Todo,
  })
  @ApiNotFoundResponse({
    description: '指定のタスクが存在しない',
  })
  @ApiUnauthorizedResponse({
    description: '投稿者本人以外による操作',
  })
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return await this.todosService.updateTodo(id, updateTodoDto, user);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'タスク削除完了',
  })
  @ApiNotFoundResponse({
    description: '指定のタスクが存在しない',
  })
  @ApiUnauthorizedResponse({
    description: '投稿者本人以外による操作',
  })
  async deleteTodo(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    await this.todosService.deleteTodo(id, user);
  }
}
