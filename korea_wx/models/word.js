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
    word: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "word"
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
    }
  };
  const options = {
    tableName: "word",
    comment: "",
    indexes: [{
      name: "word_word_book_id_fk",
      unique: false,
      type: "BTREE",
      fields: ["word_book_id"]
    }]
  };
  const WordModel = sequelize.define("word_model", attributes, options);
  return WordModel;
};