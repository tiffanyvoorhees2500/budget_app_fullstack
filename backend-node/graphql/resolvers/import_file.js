const { col } = require('sequelize');
const { ImportFile } = require('../../models');

module.exports = {
  Query: {
    importFiles: async (_, __, {user}) => {
      if (!user) throw new Error('User is not authenticated');
      return await ImportFile.findAll({ where: { user_id: user.id } });
    },
    importFile: async (_, { id }, {user}) => {
      if (!user) throw new Error('User is not authenticated');
      const importFile = await ImportFile.findOne({ where: { id, user_id: user.id } });
      if (!importFile) throw new Error('ImportFile not found');
      return importFile;
    },
  },
  Mutation: {
    createImportFile: async (_, { input }, {user}) => {
      if (!user) throw new Error('User is not authenticated');
      const importFile = await ImportFile.create({ ...input, user_id: user.id });
      return importFile;
    },
    updateImportFile: async (_, { id, input }, {user}) => {
      if (!user) throw new Error('User is not authenticated');

      const importFile = await ImportFile.findOne({ where: { id, user_id: user.id } });
      if (!importFile) throw new Error('ImportFile not found');

      await importFile.update(input);
      return importFile;
    },
    deleteImportFile: async (_, { id }, {user}) => {
      if (!user) throw new Error('User is not authenticated');
      const importFile = await ImportFile.findOne({ where: { id, user_id: user.id } });

      if (!importFile) throw new Error('ImportFile not found');
      await importFile.destroy();

      return { success: true, message: 'ImportFile deleted' };
    },
  },
  ImportFile: {
    user: async (importFile) => await importFile.getUser(),
    columnMappings: async (importFile) => await importFile.getColumnMappings(),
  },
};