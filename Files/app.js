function sendEmail() {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "dipukumardevcod@gmail.com",
        Password: "Dipukumar@25012004",
        To: 'dipukumar404h@gmail.com',
        From: document.getElementById("email").value,
        Subject: "Portfoli email",
        Body: "And this is the body"
    }).then(
        message => alert(message)
    );
}