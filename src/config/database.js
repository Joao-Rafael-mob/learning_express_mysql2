import "dotenv/config";
import { Sequelize } from 'sequelize';

export function  connectDB() {
  const sequelize = new Sequelize(`mysql://${process.env.USER}:${process.env.PASSWORD}@localhost:3306/${process.env.DATABASE}`)
  return sequelize;
}

(async () => {
  const sequelize = connectDB(); 
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

