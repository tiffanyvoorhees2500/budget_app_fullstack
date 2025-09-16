-- Already had Relational Database Schema in a project I started in the summer, but didn't finish... Since this sprint isn't focusing on relational data, I decided to use AI to help me convert the localDb schema to work with Node

BEGIN;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    google_id VARCHAR(255),
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Accounts table
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    nickname VARCHAR(255) NOT NULL,
    beg_balance NUMERIC(12,2) NOT NULL,
    bank_url VARCHAR(255),
    target_goal NUMERIC(12,2),
    goal_date DATE,
    track_spending BOOLEAN NOT NULL,
    is_active BOOLEAN NOT NULL
);

-- Bank transactions table
CREATE TABLE bank_transactions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(12,2) NOT NULL,
    default_category VARCHAR(255),
    description1 VARCHAR(255) NOT NULL,
    description2 VARCHAR(255),
    description3 VARCHAR(255),
    memo TEXT,
    my_note TEXT,
    from_account_id INT REFERENCES accounts(id) ON DELETE CASCADE,
    to_account_id INT REFERENCES accounts(id) ON DELETE CASCADE,
    date DATE NOT NULL
);

-- Frequencies table
CREATE TABLE frequencies (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    interval INT,
    day_of_month VARCHAR(10),
    week_of_month INT,
    day_of_week INT,
    special_day VARCHAR(255),
    callback_function_name VARCHAR(255)
);

-- Incomes table
CREATE TABLE incomes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    end_date DATE,
    salary_amount NUMERIC(12,2),
    num_hours INT,
    rate_per_hour NUMERIC(12,2),
    gross_pay NUMERIC(12,2) NOT NULL,
    net_pay NUMERIC(12,2),
    tracking_type VARCHAR(20) NOT NULL,
    frequency_id INT REFERENCES frequencies(id) ON DELETE CASCADE,
    to_account_id INT REFERENCES accounts(id) ON DELETE CASCADE,
    start_date DATE NOT NULL
);

-- Expenses table
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    pay_to VARCHAR(255) NOT NULL,
    next_due_date DATE NOT NULL,
    end_date DATE,
    from_account_id INT REFERENCES accounts(id) ON DELETE CASCADE,
    plan_account_id INT REFERENCES accounts(id),
    frequency_id INT REFERENCES frequencies(id) ON DELETE CASCADE,
    plan_frequency_id INT REFERENCES frequencies(id),
    plan_income_id INT REFERENCES incomes(id),
    start_date DATE NOT NULL
);

-- Import files table
CREATE TABLE import_files (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    nickname VARCHAR(255) NOT NULL,
    file_path VARCHAR(255),
    only_manually_import BOOLEAN NOT NULL
);

-- Income breakdowns table
CREATE TABLE income_breakdowns (
    id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
    income_id INT REFERENCES incomes(id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    amount NUMERIC(12,2) NOT NULL
);

-- Transactions table (links bank_transactions, expenses, incomes)
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    bank_transaction_id VARCHAR(255) REFERENCES bank_transactions(id),
    expense_id INT REFERENCES expenses(id),
    income_id INT REFERENCES incomes(id)
);

-- Indexes
CREATE INDEX idx_bank_transactions_from_account ON bank_transactions(from_account_id);
CREATE INDEX idx_bank_transactions_to_account ON bank_transactions(to_account_id);
CREATE INDEX idx_expenses_frequency ON expenses(frequency_id);
CREATE INDEX idx_expenses_from_account ON expenses(from_account_id);
CREATE INDEX idx_expenses_plan_account ON expenses(plan_account_id);
CREATE INDEX idx_expenses_plan_frequency ON expenses(plan_frequency_id);
CREATE INDEX idx_expenses_plan_income ON expenses(plan_income_id);
CREATE INDEX idx_incomes_frequency ON incomes(frequency_id);
CREATE INDEX idx_incomes_to_account ON incomes(to_account_id);
CREATE INDEX idx_income_breakdowns_income_id ON income_breakdowns(income_id);
CREATE INDEX idx_transactions_bank_transaction ON transactions(bank_transaction_id);
CREATE INDEX idx_transactions_expense ON transactions(expense_id);
CREATE INDEX idx_transactions_income ON transactions(income_id);

COMMIT;
