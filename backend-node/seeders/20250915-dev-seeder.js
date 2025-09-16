'use strict';

const fs = require('fs');
const parseCSV = require('../utils/parsers/csvParser');
const { parse } = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Clear tables before seeding (order matters due to foreign keys)
    await queryInterface.bulkDelete('bank_transactions', null, {});
    await queryInterface.bulkDelete('column_mappings', null, {});
    await queryInterface.bulkDelete('import_files', null, {});
    await queryInterface.bulkDelete('accounts', null, {});
    await queryInterface.bulkDelete('users', null, {});

    // 1. Insert a test user
    const users = await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'testuser',
          email: 'testuser@example.com',
          password: 'hashed_password',
        },
      ],
      { returning: ['id'] }
    );
    const userId = users[0].id;

    // 2. Insert accounts for the test user
    const accounts = await queryInterface.bulkInsert(
      'accounts',
      [
        {
          user_id: userId,
          nickname: 'MACU CHECKING',
          beg_balance: 0,
          track_spending: true,
          is_active: true,
        },
      ],
      { returning: ['id', 'nickname'] }
    );
    const accountId = accounts[0].id;
    const accountNickname = accounts[0].nickname;

    // 3. Insert an ImportFile for the test user
    const importFiles = await queryInterface.bulkInsert(
      'import_files',
      [
        {
          user_id: userId,
          file_path:
            'C:\\Users\\Admin\\Google Drive\\Finances\\TiffanyVoorhees Budgeting\\MACU CHECKING.csv',
          has_account_column: false,
          account_nickname: accountNickname,
        },
      ],
      { returning: ['id', 'file_path'] }
    );
    const importFileId = importFiles[0].id;
    const filePath = importFiles[0].file_path;

    // 4. Insert Column Mappings for ImportFile
    const columnMappings = await queryInterface.bulkInsert(
      'column_mappings',
      [
        {
          user_id: userId,
          import_file_id: importFileId,
          column_name: 'Transaction ID',
          mapped_to: 'id',
        },
        {
          user_id: userId,
          import_file_id: importFileId,
          column_name: 'Effective Date',
          mapped_to: 'date',
        },
        {
          user_id: userId,
          import_file_id: importFileId,
          column_name: 'Amount',
          mapped_to: 'amount',
        },
        {
          user_id: userId,
          import_file_id: importFileId,
          column_name: 'Transaction Category',
          mapped_to: 'default_category',
        },
        {
          user_id: userId,
          import_file_id: importFileId,
          column_name: 'Description',
          mapped_to: 'description1',
        },
        {
          user_id: userId,
          import_file_id: importFileId,
          column_name: 'Extended Description',
          mapped_to: 'description2',
        },
        {
          user_id: userId,
          import_file_id: importFileId,
          column_name: 'Memo',
          mapped_to: 'memo',
        },
      ],
      { returning: true }
    );

    // 5a. Parse CSV file for bank Transactions
    const fileBuffer = fs.readFileSync(filePath);
    const parsedData = await parseCSV(fileBuffer);

    // 5b. Build a Mapping from parsed data
    const mappingObj = {};
    columnMappings.forEach((mapping) => {
      mappingObj[mapping.column_name] = mapping.mapped_to;
    });

    const bankTransactions = parsedData.previewRows.map((row) => {
      const transaction = {
        // set the shared information
        user_id: userId,
        account_id: accountId,
      };
      // Now add mapped fields to transaction
      Object.keys(mappingObj).forEach((csvCol) => {
        transaction[mappingObj[csvCol]] = row[csvCol];
      });
      return transaction;
    });

    // 5c. Bulk insert into BankTransactions
    await queryInterface.bulkInsert('bank_transactions', bankTransactions);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bank_transactions', null, {});
    await queryInterface.bulkDelete('column_mappings', null, {});
    await queryInterface.bulkDelete('import_files', null, {});
    await queryInterface.bulkDelete('accounts', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
