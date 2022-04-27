'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ meet_greet, set_time }) {
      // define association here
      Band.hasMany(meet_greet, {
          foreignKey: "band_id",
          as: "meet_greets"
      })
      Band.hasMany(set_time, {
          foreignKey: "band_id",
          as: "set_times"
      })
    }
  }
  Band.init({
    band_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    genre: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    available_start_time: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    end_time: {
        allowNull: false,
        type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Band',
    tableName: 'bands',
    timestamps: false
  });
  return Band;
};