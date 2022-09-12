import database from "../database/database.js";

async function sessionVerifier(request, response, next) {
    try {
        const { authorization } = request.headers;
        const token = authorization?.replace("Bearer ", "");
        const sessions = database.collection("sessions");
        const userSession = await sessions.findOne({ sessionId: token });

        if (!authorization || !authorization.includes("Bearer ")) {
            response.status(401).send("Authorization token is missing");
            return
        }

        if (!userSession) {
            response.status(401).send("Invalid Authorization token");
            return
        }

        response.locals.userId = userSession.user;
        next();
    }
    catch (err) {
        console.log(err.message);
    }
}

export { sessionVerifier }