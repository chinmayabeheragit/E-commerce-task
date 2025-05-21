module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "customer"),
      defaultValue: "customer",
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Cart, { foreignKey: "userId" });
    User.hasMany(models.Order, { foreignKey: "userId" });
  };

  return User;
};
