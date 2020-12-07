import { define } from 'typeorm-seeding';
import { User } from '../../entities/user.entity';
import * as Faker from 'faker/locale/ja';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.password = 'hogehoge';

  return user;
});
