

<!-- user -->
```js user
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dg.js';

class User extends Model {}

User.init({
  id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
},
{
  sequelize,  
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
});

export default User;
```


<!-- Transaction -->
```js Transaction
import { DataTypes, Model } from "sequelize";
import sequelize from '../config/dg.js'

export default class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    planId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "plans", key: "id" },
      onDelete: "CASCADE",
    },
    
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: "USD",
    },
    status: {
      type: DataTypes.ENUM("PENDING", "COMPLETED", "FAILED"),
      defaultValue: "PENDING",
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true,
  }
);
```


<!-- Plan -->
```js Plan
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dg.js';

class Plan extends Model {}

Plan.init(
  {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    planType: {
      defaultValue: 'FREE',
    },
  },
  {
    sequelize,
    modelName: 'Plan',
    tableName: 'plans',
    timestamps: true,
  }
);

export default Plan;
```


<!-- Course -->
```js Plan
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dg.js';

class Course extends Model {}

Course.init(
  {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    duration: {

    },

    
  },
  {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
    timestamps: true,
  }
);

export default Course;
```