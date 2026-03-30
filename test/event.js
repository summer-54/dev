import {FormData} from "formdata-node";
import {fileFromPath} from "formdata-node/file-from-path";
import axios from "axios";

(async () => {
    let form = new FormData()
    form.set("img", await fileFromPath("img.png"))

    axios.postForm("http://localhost:54000/api/events", form, {
        headers: {Authorization: ""}
    })
})()