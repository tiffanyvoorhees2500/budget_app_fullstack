'use strict';

const fs = require('fs');
const parseCSV = require('../utils/parsers/csvParser');
const { parse } = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Assumption: Account nickname matching is case-insensitive.
    // If a transaction's account nickname does not match any account, account_id will be null.
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
        {
          user_id: userId,
          nickname: 'CITI CASH',
          beg_balance: 0,
          track_spending: true,
          is_active: true,
        },
        {
          user_id: userId,
          nickname: 'CITI COSTCO',
          beg_balance: 0,
          track_spending: true,
          is_active: true,
        },
        {
          user_id: userId,
          nickname: 'AMAZON',
          beg_balance: 0,
          track_spending: true,
          is_active: true,
        },
        {
          user_id: userId,
          nickname: 'SAMS CLUB',
          beg_balance: 0,
          track_spending: true,
          is_active: true,
        },
      ],
      { returning: ['id', 'nickname'] }
    );

    // 3. Insert an ImportFile for the test user
    const importFiles = await queryInterface.bulkInsert(
      'import_files',
      [
        {
          user_id: userId,
          file_path:
            'C:\\Users\\Admin\\Google Drive\\Finances\\TiffanyVoorhees Budgeting\\tiffanyvoorheescom Budget - Transactions.csv',
          has_account_column: true,
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
          column_name: 'Account',
          mapped_to: 'account_nickname',
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
          column_name: 'Actual Amount',
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
          mapped_to: 'description4',
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
      // check if column_name = "account" and handle account_id lookup
      mappingObj[mapping.column_name] = mapping.mapped_to;
    });

    const bankTransactions = parsedData.previewRows.map((row) => {
      const transaction = {
        user_id: userId,
      };

      // If mapping includes account_nickname, look up account_id
      let accountNicknameCol = null;
      let amountCol = null;
      Object.keys(mappingObj).forEach((csvCol) => {
        if (mappingObj[csvCol] === 'account_nickname') {
          accountNicknameCol = csvCol;
        }
        if (mappingObj[csvCol] === 'amount') {
          amountCol = csvCol;
        }
      });

      if (accountNicknameCol) {
        // Find account_id by nickname (case-insensitive)
        const nickname = row[accountNicknameCol]?.trim().toLowerCase();
        const accountMatch = accounts.find(
          (a) => a.nickname.trim().toLowerCase() === nickname
        );
        transaction.account_id = accountMatch ? accountMatch.id : null;
      }

      // This is also where the logic for separate debit/credit or amount need altering will be done
      // This is just parsing string amount to numeric amoun
      if (amountCol) {
        const raw = row[amountCol] ?? '';
        const cleaned = String(raw).replace(/[^0-9.-]+/g, ''); // remove $ and commas
        const n = cleaned === '' ? null : Number(cleaned);
        transaction.amount = n == null || Number.isNaN(n) ? null : n;
      }

      // Add mapped fields to transaction
      Object.keys(mappingObj).forEach((csvCol) => {
        // Skip account_nickname, already handled
        if (
          mappingObj[csvCol] !== 'account_nickname' &&
          mappingObj[csvCol] !== 'amount'
        ) {
          transaction[mappingObj[csvCol]] = row[csvCol];
        }
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
