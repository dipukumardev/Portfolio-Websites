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

// Cursor Circle Animation
const cursorCircle = document.getElementById('cursor-circle');
const dots = [];
const dotCount = 2; // Number of trailing dots
let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

// Create trailing dots
for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.opacity = 1 - (i * 0.3); // Make dots progressively more transparent
    document.body.appendChild(dot);
    dots.push({
        element: dot,
        x: 0,
        y: 0,
        delay: (i + 1) * 0.1 // Stagger the delay for each dot
    });
}

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorCircle.style.left = mouseX + 'px';
    cursorCircle.style.top = mouseY + 'px';
});

// Handle hover effects
document.querySelectorAll('a, button, .hover-effect').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorCircle.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorCircle.classList.remove('hover');
    });
});

// Smooth animation loop
function animate() {
    // Ease the main cursor position
    posX += (mouseX - posX) * 0.2;
    posY += (mouseY - posY) * 0.2;
    
    // Update main cursor
    cursorCircle.style.left = posX + 'px';
    cursorCircle.style.top = posY + 'px';
    
    // Update trailing dots with delayed easing
    let lastX = posX;
    let lastY = posY;
    
    dots.forEach(dot => {
        // Calculate new position with delay
        dot.x += (lastX - dot.x) * (0.2 + dot.delay);
        dot.y += (lastY - dot.y) * (0.2 + dot.delay);
        
        // Update dot position
        dot.element.style.left = dot.x + 'px';
        dot.element.style.top = dot.y + 'px';
        
        // Update last position for next dot
        lastX = dot.x;
        lastY = dot.y;
    });
    
    requestAnimationFrame(animate);
}

// Start the animation
requestAnimationFrame(animate);

// Make cursor circle visible when mouse moves
document.addEventListener('mousemove', () => {
    cursorCircle.style.opacity = '1';
    dots.forEach(dot => {
        dot.element.style.opacity = '1';
    });
});

// Hide cursor when leaving the window
document.addEventListener('mouseleave', () => {
    cursorCircle.style.opacity = '0';
    dots.forEach(dot => {
        dot.element.style.opacity = '0';
    });
});