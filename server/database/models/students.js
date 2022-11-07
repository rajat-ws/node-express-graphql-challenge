export function getAttributes(sequelize, DataTypes) {
  return {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedAt: {
      field: 'deleted_at',
      type: DataTypes.DATE,
      allowNull: true
    }
  };
}

export function model(sequelize, DataTypes) {
  const students = sequelize.define('students', getAttributes(sequelize, DataTypes), {
    tableName: 'students',
    paranoid: true,
    timestamps: true
  });

  students.associate = function(models) {
    // for every studentsSubjectId, there will be one studentId
    students.studentsSubjects = students.hasOne(models.studentsSubjects, {
      sourceKey: 'id',
      foreignKey: 'student_id'
    });
  };

  return students;
}
