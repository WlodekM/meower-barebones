import { exampleSocket } from "./home/index.js";

function sendCmd(cmd, val) {
    console.log({
        "cmd": "direct",
        "val": {
            cmd: cmd,
            val: val,
        }
    })
    exampleSocket.send(JSON.stringify({
        "cmd": "direct",
        "val": {
            cmd: cmd,
            val: val,
        }
    }))
}

$(document).ready(function () {
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        if (!$("#username").val()) return
        let isWebhook = $("#password").val() == undefined
        if (!isWebhook) {
            sendCmd("authpswd", {
                "username": String($("#username").val()),
                "pswd": String($("#password").val()),
            })
            loadAnotherPage("./home/index.html")
        }
    });
});

// chatgpt
function loadAnotherPage(pageUrl) {
    // Fetch the content of the specified page
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${pageUrl}`);
            }
            return response.text();
        })
        .then(htmlContent => {
            // Replace the entire content of the body with the fetched content
            document.body.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error(error);
        });
}

