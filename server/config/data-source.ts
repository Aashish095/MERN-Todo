import { DataSource } from "typeorm";
import { User } from "../entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Rajak095@",
  database: "test_db",
  synchronize: false,
  logging: true,
  entities: [User],
});

export const entityManager = AppDataSource.manager;

const Connections = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("DB Connected");
    })
    .catch((e: any) => {
      console.log("ERROR:" + e);
    });
};

export default Connections;
