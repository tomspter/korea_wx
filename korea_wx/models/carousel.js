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
    pic_url: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "pic_url"
    }
  };
  const options = {
    tableName: "carousel",
    comment: "",
    indexes: []
  };
  const CarouselModel = sequelize.define("carousel_model", attributes, options);
  return CarouselModel;
};