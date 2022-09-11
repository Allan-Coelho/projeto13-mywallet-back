import database from "../database/database.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

async function signin(request, response) {
    try {
        const { email, password } = response.locals.body;
        const sessions = database.collection('sessions');
        const users = database.collection('users');
        const user = await users.findOne({ email: email });

        if (!user) {
            response.sendStatus(404);
            return
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (user && passwordIsValid) {
            const token = uuid();

            sessions.insertOne({
                user: user._id,
                sessionId: token,
                sessionStart: Date.now(),
                isDeleted: false
            });

            response.send(token);
            return
        }

        response.sendStatus(404);
    } catch (err) {
        console.log(err.message);
    }
}

async function signup(request, response) {
    try {
        const { email, password, name } = response.locals.body;
        const sessions = database.collection('sessions');
        const users = database.collection('users');
        const user = await users.findOne({ email: email });

        if (user !== null) {
            response.status(422).send("Esse email e/ou nome de usuário já está em uso");
            return
        };

        const token = uuid();
        const hashedPassword = bcrypt.hashSync(password, 10);
        const insertInformation = await users.insertOne({
            email: email,
            name: name,
            password: hashedPassword
        });

        await sessions.insertOne({
            user: insertInformation.insertedId,
            sessionId: token,
            sessionStart: Date.now(),
            isDeleted: false
        });

        response.status(201).send(token);
    }
    catch (err) {
        console.log(err.message);
    }
}

export { signin, signup }