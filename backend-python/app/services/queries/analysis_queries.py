ME_TRANSACTION_QUERY = """
    query GetAllBankTransactions {
        me {
            bankTransactions {
                id
                date
                amount
                default_category
            }
        }
    }
"""
