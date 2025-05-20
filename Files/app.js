function sendEmail() {
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    
    // Format the message body
    const messageBody = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
    `;
    
    // Using EmailJS service to send emails
    // You need to create an account at https://www.emailjs.com/ and replace these values
    const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
    const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
    const userID = 'YOUR_USER_ID'; // Replace with your EmailJS user ID
    
    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };
    
    // Send email using EmailJS
    emailjs.send(serviceID, templateID, templateParams, userID)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Your message has been sent successfully!');
            
            // Also redirect to WhatsApp
            redirectToWhatsApp(name, email, subject, message);
            
            // Reset the form
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send the message. Please try again later.');
        });
    
    return false; // Prevent form submission
}

function redirectToWhatsApp(name, email, subject, message) {
    // Format the message for WhatsApp
    const whatsappMessage = `*New Contact Form Submission*%0A
*Name:* ${name}%0A
*Email:* ${email}%0A
*Subject:* ${subject}%0A
*Message:* ${message}`;
    
    // Create WhatsApp URL with your number and the formatted message
    const whatsappUrl = `https://wa.me/917870655593?text=${whatsappMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
}

function showCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            window.open(mapUrl, '_blank');
        }, function(error) {
            alert("Unable to retrieve your location: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}