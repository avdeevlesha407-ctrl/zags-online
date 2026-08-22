function showNotification(message, type = "success") {

    let box = document.getElementById("notification");

    if (!box) {

        box = document.createElement("div");

        box.id = "notification";

        document.body.appendChild(box);

    }


    box.className = "";

    box.innerHTML =
        (type === "error" ? "⚠ " : "✓ ") + message;


    box.classList.add(type);

    box.classList.add("show");


    setTimeout(() => {

        box.classList.remove("show");

    }, 3000);

}
