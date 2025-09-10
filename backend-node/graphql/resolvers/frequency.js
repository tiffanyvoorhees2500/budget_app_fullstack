const { Frequency } = require('../../models');

module.exports = {
    Query: {
        frequencies: async () => await Frequency.findAll(),
        frequency: async (_, { id }) => await Frequency.findByPk(id),
    },
    Mutation: {
        createFrequency: async (_, { input }) => {
            const frequency = await Frequency.create(input);
            return frequency;
        },
        updateFrequency: async (_, { id, input }) => {
            const frequency = await Frequency.findByPk(id);
            if (!frequency) throw new Error('Frequency not found');
            await frequency.update(input);
            return frequency;
        },
        deleteFrequency: async (_, { id }) => {
            const frequency = await Frequency.findByPk(id);
            if (!frequency) throw new Error('Frequency not found');
            await frequency.destroy();
            return { success: true, message: 'Frequency deleted' };
        },
    },
};
