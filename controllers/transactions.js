import database from "../database/database.js";

async function insertTransaction(request, response) {
    try {
        const transactions = database.collection('transactions');
        const { type, value, description, date } = response.locals.body;

        transactions.insertOne({
            type: type,
            value: value,
            description: description,
            date: date,
            userId: response.locals.userId,
            isDeleted: false
        });

        response.sendStatus(201);
    }
    catch (err) {
        console.log(err.message);
    }
}

async function sendUserTransactions(request, response) {
    try {
        const transactions = database.collection('transactions');
        const userTransactions = await transactions.find({ userId: response.locals.userId, isDeleted: false }).toArray();

        response.send(userTransactions);
    }
    catch (err) {
        console.log(err.message);
    }
}


export { insertTransaction, sendUserTransactions }