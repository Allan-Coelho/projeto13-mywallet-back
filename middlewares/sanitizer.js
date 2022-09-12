import { stripHtml } from "string-strip-html";

const propertiesToSanitize = ["email", "password", "name", "type", "value", "description", "date"];
const requestObjectsToSanitize = ["headers", "body"];

function sanitizer(request, response, next) {
    for (let j = 0, len0 = requestObjectsToSanitize.length; j < len0; j++) {
        const objectKey = requestObjectsToSanitize[j];
        const object = request?.[objectKey];

        if (!object) {
            continue
        }

        for (let i = 0, len1 = propertiesToSanitize.length; i < len1; i++) {
            const propertyName = propertiesToSanitize[i];
            const propertyValue = String(object?.[propertyName]);

            if (propertyValue === "undefined" || propertyValue === undefined) {
                continue
            }

            response.locals[objectKey] = { ...response.locals[objectKey] };
            response.locals[objectKey][propertyName] = stripHtml(propertyValue).result;
        }
    }
    next();
}

export { sanitizer };


