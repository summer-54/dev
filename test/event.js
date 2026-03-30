import {FormData} from "formdata-node";
import {fileFromPath} from "formdata-node/file-from-path";
import axios from "axios";

axios.defaults.validateStatus = () => true;

(async () => {
    let form = new FormData();
    form.set("img", await fileFromPath("img.png"));
    form.set("displayName", "test");
    form.set("description", "test");
    form.set("autoAccept", true);
    form.set("showInList", true);
    form.set("opened", true);

    let response = await axios.postForm("http://localhost:54000/api/events", form, {
        headers: {Authorization: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwianRpIjoxLCJhcHAiOiJtYWluIiwiaWF0IjoxNzc0ODY2NjUyLCJleHAiOjE3NzQ4NjY5NTJ9.5naQrG0tf_zo_FjbgaIpZWTH1Bj92TjxV5Cuv_3_rVTdw8HDjeyKxwmrMm5nDlrGml7Zsm4wgZ9QBS6tt_6BUA"}
    });
    console.log(response.status, response.statusText);
    console.log(response.data);
})()