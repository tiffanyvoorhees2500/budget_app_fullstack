const { ColumnMapping } = require('../../models');

module.exports = {
  Query: {
    columnMappings: async (_, __, { user }) => {
      if (!user) throw new Error('User is not authenticated');
      return await ColumnMapping.findAll({ where: { user_id: user.id } });
    },
    columnMapping: async (_, { id }, { user }) => {
      if (!user) throw new Error('User is not authenticated');
      const columnMapping = await ColumnMapping.findOne({
        where: { id, user_id: user.id },
      });
      if (!columnMapping) throw new Error('ColumnMapping not found');
      return columnMapping;
    },
  },
  Mutation: {
    createColumnMapping: async (_, { input }, { user }) => {
      if (!user) throw new Error('User is not authenticated');
      const columnMapping = await ColumnMapping.create({
        ...input,
        user_id: user.id,
      });
      return columnMapping;
    },
    updateColumnMapping: async (_, { id, input }, { user }) => {
      if (!user) throw new Error('User is not authenticated');

      const columnMapping = await ColumnMapping.findOne({
        where: { id, user_id: user.id },
      });
      if (!columnMapping) throw new Error('ColumnMapping not found');

      await columnMapping.update(input);
      return columnMapping;
    },
    deleteColumnMapping: async (_, { id }, { user }) => {
      if (!user) throw new Error('User is not authenticated');
      const columnMapping = await ColumnMapping.findOne({
        where: { id, user_id: user.id },
      });

      if (!columnMapping) throw new Error('ColumnMapping not found');
      await columnMapping.destroy();

      return { success: true, message: 'ColumnMapping deleted' };
    },
  },
  ColumnMapping: {
    user: async (columnMapping) => await columnMapping.getUser(),
    importFile: async (columnMapping) => await columnMapping.getImportFile(),
  },
};
