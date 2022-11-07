export function getAttributes(sequelize, DataTypes) {
  return {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    studentId: {
      field: 'student_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id'
      }
    },
    subjectsId: {
      field: 'subject_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'id'
      }
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
  const studentsSubjects = sequelize.define('students_subjects', getAttributes(sequelize, DataTypes), {
    tableName: 'students_subjects',
    paranoid: false,
    timestamps: true
  });

  studentsSubjects.associate = function(models) {
    studentsSubjects.students = studentsSubjects.hasMany(models.students, {
      foreignKey: 'id',
      sourceKey: 'studentId'
    });
    studentsSubjects.subjects = studentsSubjects.hasMany(models.subjects, {
      foreignKey: 'id',
      sourceKey: 'subjectId'
    });
  };

  return studentsSubjects;
}
