import { DataTypes, Sequelize } from "sequelize";
import dbContext from "../config/Database.js";

const Note = dbContext.define('notes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'notes',
    freezeTableName: true,
    timestamps: true
});

export { Note };

(async () => {
    await dbContext.sync();
})();
