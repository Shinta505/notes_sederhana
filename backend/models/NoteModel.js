// Import dependencies
import { Sequelize, DataTypes } from "sequelize";
import dbContext from "../config/Database.js";

// === Model: Note ===
const Note = dbContext.define(
  "notes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "notes",
    freezeTableName: true,
    timestamps: true,
  }
);

// === Model: User ===
const User = dbContext.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "user",
    freezeTableName: true,
    timestamps: true,
  }
);

// Sinkronisasi database
(async () => {
  try {
    await dbContext.sync();
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Database sync error:", error);
  }
})();

// Export model
export { Note, User };
