module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(11, 2).UNSIGNED,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(150),
            allowNull: false
        },      
        gender: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        discount: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        size: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        brand_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        }
    }, {
        tableName: 'product',
        timestamps: true 
    });

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'productCategory'
        });
    
        Product.belongsTo(models.Brand, {
            foreignKey: 'brand_id', 
            as: 'productBrand'
        });
        Product.belongsToMany(models.Order, {
            through: models.OrderProduct,
            foreignKey: 'Product_id',
            otherKey: 'orderId',
            as: 'orderProducts'
        });
    };

    return Product;
};