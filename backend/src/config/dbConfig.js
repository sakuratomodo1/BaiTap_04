const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Destructuring đúng tên biến từ .env
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT } = process.env;

// LƯU Ý: Đã bỏ "!DB_PASSWORD" khỏi điều kiện if dưới đây
// để cho phép user root không có mật khẩu vẫn chạy được.
if (!DB_NAME || !DB_USER || !DB_HOST || !DB_DIALECT) {
  console.error("Database connection variables are not fully defined in .env");
  process.exit(1);
}

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD, // Nếu biến này rỗng, Sequelize sẽ hiểu là không có pass
  {
    host: DB_HOST,
    port: DB_PORT || 3306,
    dialect: DB_DIALECT,
    logging: false
  }
);

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connection };