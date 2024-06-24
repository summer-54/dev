import { buildHandlers } from "sbackend";

export default buildHandlers({
    post: {
        async "/file"(request) {
            console.log(request.body);
        }
    }
});