(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const script_form = document.getElementById("form");
    const thankText = document.getElementById("thank-text");
    script_form.addEventListener("submit", formSend);
    async function formSend(e) {
        e.preventDefault();
        const valueEmail = document.getElementById("formEmail");
        formValidate1(script_form);
        let response = await fetch("https://wgyef7gexilrvcjkcermdqtisa0ponmg.lambda-url.us-east-1.on.aws/", {
            method: "POST",
            body: JSON.stringify({
                email: valueEmail.value
            })
        });
        if (response.ok) {
            thankTextAdd(thankText, script_form);
            script_form.reset();
        }
    }
    function formValidate1(form) {
        let error = 0;
        let formReq = document.querySelectorAll("._req");
        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);
            if (input.classList.contains("_email")) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if ("checkbox" === input.getAttribute("type") && false === input.checked) {
                formAddError(input);
                error++;
            } else if ("" === input.value) {
                formAddError(input);
                error++;
            }
            return error;
        }
    }
    function formAddError(input) {
        input.parentElement.classList.add("_error");
        input.classList.add("_error");
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
    function thankTextAdd(thankText, form) {
        thankText.classList.add("_add-text");
        form.classList.add("_remove-form");
    }
    window["FLS"] = true;
    isWebp();
})();