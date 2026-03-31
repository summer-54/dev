import {FormData} from "formdata-node";
import {fileFromPath} from "formdata-node/file-from-path";
import axios from "axios";

axios.defaults.validateStatus = () => true;

(async () => {
    let form = new FormData();
    form.set("img", await fileFromPath("img.png"));
    form.set("displayName", "test");
    form.set("description", "test");
    form.set("emailConfirm", false);

    let response = await axios.postForm("http://localhost:54000/api/events", form, {
        headers: {Authorization: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwianRpIjo4LCJhcHAiOiJtYWluIiwiaWF0IjoxNzc0ODk0MDE0LCJleHAiOjE3NzQ4OTQzMTR9.FStsAW0yAaD3hdJaIh17YQu78mOgrAOhjqUvpjvbYfIpFbPrdmBGv8JGLx1AUJCG5Edm3ZWVJIUhyJn3N-oVFg"}
    });
    console.log(response.status, response.statusText);
    console.log(response.data);
})()