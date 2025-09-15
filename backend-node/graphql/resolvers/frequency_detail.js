const { FrequencyDetail } = require('../../models');

module.exports = {
  Query: {
    frequencyDetails: async (_, __, { user }) => {
      if (!user) throw new Error('User is not authenticated');
      return await FrequencyDetail.findAll({ where: { user_id: user.id } });
    },
    frequencyDetail: async (_, { id }, { user }) => {
      if (!user) throw new Error('User is not authenticated');
      const frequencyDetail = await FrequencyDetail.findOne({
        where: { id, user_id: user.id },
      });
      if (!frequencyDetail) throw new Error('FrequencyDetail not found');
      return frequencyDetail;
    },
  },
  Mutation: {
    createFrequencyDetail: async (_, { input }, { user }) => {
      if (!user) throw new Error('User is not authenticated');
      const frequencyDetail = await FrequencyDetail.create({
        ...input,
        user_id: user.id,
      });
      return frequencyDetail;
    },
    updateFrequencyDetail: async (_, { id, input }, { user }) => {
      if (!user) throw new Error('User is not authenticated');

      const frequencyDetail = await FrequencyDetail.findOne({
        where: { id, user_id: user.id },
      });
      if (!frequencyDetail) throw new Error('FrequencyDetail not found');

      await frequencyDetail.update(input);
      return frequencyDetail;
    },
    deleteFrequencyDetail: async (_, { id }, { user }) => {
      if (!user) throw new Error('User is not authenticated');
      const frequencyDetail = await FrequencyDetail.findOne({
        where: { id, user_id: user.id },
      });

      if (!frequencyDetail) throw new Error('FrequencyDetail not found');
      await frequencyDetail.destroy();

      return { success: true, message: 'TransactionMatch deleted' };
    },
  },
  FrequencyDetail: {
    user: async (frequencyDetail) => await frequencyDetail.getUser(),
    frequency: async (frequencyDetail) => await frequencyDetail.getFrequency(),
    expense: async (frequencyDetail) => await frequencyDetail.getExpense(),
    income: async (frequencyDetail) => await frequencyDetail.getIncome(),
  },
};
