import {BackendiumRouter} from "backendium";
import {any, boolean, file, object, string} from "parsium";
import {checkAuthRetData} from "./authChecker.js";
import {JwtAccessPayload} from "./jwt.js";
import {getUserById} from "./sql/users.sql.js";

const router = new BackendiumRouter<JwtAccessPayload>();
router.setAuth(async (request, response) => {
    return checkAuthRetData(request.headers?.authorization, response);
})

router.post("/", {
    bodyValidator: object({
        img: file(),
        displayName: string(),
        description: string(),
        autoAccept: boolean(),
        formFields: any()
    }),
    auth: true
}, async (request, response) => {
    const user = await getUserById(request.globalAuth.id);
    if (!user) return;
    if (!user.isAdmin) {
        response.status(409);
        response.end();
        return;
    }
});

export default router;