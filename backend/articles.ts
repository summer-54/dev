import {BackendiumRouter} from "backendium";
import {object, string} from "checkeasy";

const router = new BackendiumRouter();

// router.post<{body: {auth: string}, headers: {auth: string}, query: {}, repo: string}>("/push-check", (request, response) => {
//     if (!repos.includes(request.body.repo.toLowerCase())) {
//         response.status(404);
//         response.end();
//         return;
//     }
//     console.log(request.body);
//     response.end(request.body.repo.toLowerCase());
// }, {
//     bodyValidator: object({
//         body: object({auth: string()}, {ignoreUnknown: true}),
//         headers: object({auth: string()}, {ignoreUnknown: true}),
//         query: object({}, {ignoreUnknown: true}),
//         repo: string()
//     }, {ignoreUnknown: true}),
//     validationErrorHandler() {
//         console.log(arguments);
//     }
// });
//
// router.post<{headers: {auth: string}, query: {}, repo: string}>("/pull-check", (request, response) => {
//     if (!repos.includes(request.body.repo.toLowerCase())) {
//         response.status(404);
//         response.end();
//         return;
//     }
//     console.log(request.body);
//     response.end(request.body.repo.toLowerCase());
// }, {
//     bodyValidator: object({
//         headers: object({auth: string()}, {ignoreUnknown: true}),
//         query: object({}, {ignoreUnknown: true}),
//         repo: string()
//     }, {ignoreUnknown: true}),
//     validationErrorHandler() {
//         console.log(arguments);
//     }
// });