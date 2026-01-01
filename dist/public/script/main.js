let button = document.getElementById("b");

button.addEventListener('click', function() {
    fetch("/data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "Ciao dal client!", user: "Mattia" })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Risposta dal server:", data);
    })
    .catch(error => {
        console.error("Errore nella richiesta: ", error);
    })
})
