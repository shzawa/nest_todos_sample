import { define } from 'typeorm-seeding';
import { Todo, CATEGORY } from '../../entities/todo.entity';
import * as Faker from 'faker/locale/ja';

interface Context {
  id: number;
  userMax: number;
}

define(Todo, (faker: typeof Faker, context: Context) => {
  const { id, userMax } = context;
  const userId = Math.floor(Math.random() * userMax) + 1;

  const categories: CATEGORY[] = Object.keys(CATEGORY).map(k => CATEGORY[k]);
  const category = categories[id % categories.length];

  const todo = new Todo();
  todo.title = `${faker.lorem.word()}${id}`;
  todo.category = category;
  todo.userId = userId;

  return todo;
});
