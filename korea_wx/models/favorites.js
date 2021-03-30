const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    word_book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "word_book_id",
      references: {
        key: "id",
        model: "word_book_model"
      }
    },
    word_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "word_id",
      references: {
        key: "id",
        model: "word_model"
      }
    }
  };
  const options = {
    tableName: "favorites",
    comment: "",
    indexes: [{
      name: "favorites_word_book_id_fk",
      unique: false,
      type: "BTREE",
      fields: ["word_book_id"]
    }, {
      name: "favorites_word_id_fk",
      unique: false,
      type: "BTREE",
      fields: ["word_id"]
    }]
  };
  const FavoritesModel = sequelize.define("favorites_model", attributes, options);
  return FavoritesModel;
};