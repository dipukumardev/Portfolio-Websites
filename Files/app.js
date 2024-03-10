function sendEmail() {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "dipukumardevcod@gmail.com",
        Password: "",
        To: 'dipukumar404h@gmail.com',
        From: document.getElementById("email").value,
        Subject: "Portfoli email",
        Body: "And this is the body"
    }).then(
        message => alert(message)
    );
}