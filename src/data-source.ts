import { DataSource } from "typeorm";
import { Article } from "./article/entities/article.entity";

export default new DataSource({
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_FZPdcjiDIt13@ep-lively-feather-bdb7pefx-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: true,
  synchronize: false,
  entities: [Article],
  logging: true,
  migrations: ['src/migrations/**.ts']
});
