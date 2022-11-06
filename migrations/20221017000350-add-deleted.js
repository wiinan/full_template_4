'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    const transactionPromises = [];

    try {
      transactionPromises.push(queryInterface.addColumn('specs', 'deleted_at', {
          type: Sequelize.DATE,
          allowNull: true
        }, transaction),
        queryInterface.addColumn('userinfos', 'deleted_at', {
          type: Sequelize.DATE,
          allowNull: true
        }, transaction),
        )

        // await queryInterface.sequelize.query(`
        //   ALTER TABLE specs ADD COLUMN deleted_at DATE;
        //   ALTER TABLE userinfos ADD COLUMN deleted_at DATE;
        // `);

        await Promise.all(transactionPromises);
        transaction.commit();
    } catch (error) {
        transaction.rollback();
        throw error
    }
    },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    ALTER TABLE specs DROP COLUMN deleted_at;
    ALTER TABLE userinfos DROP COLUMN deleted_at;
    `);

  }
};
