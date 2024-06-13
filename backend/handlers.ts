import {buildHandlers} from "sbackend";

export default buildHandlers({
    get: {
        "/test"(request, response, next) {
            console.log(request.body); // request body
            console.log(request.headers); // request headers
            console.log(request.query); // query (after '?' in route string)
            response.end("test0"); // argument can be string or object
        }
    },
    post: {}
});