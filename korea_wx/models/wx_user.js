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
    open_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "open_id"
    }
  };
  const options = {
    tableName: "wx_user",
    comment: "",
    indexes: []
  };
  const WxUserModel = sequelize.define("wx_user_model", attributes, options);
  return WxUserModel;
};