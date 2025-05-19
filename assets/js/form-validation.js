// Initialize EmailJS with your public key
(function() {
    emailjs.init("0jrveAI7UnN8l3sXW"); // Replace with your actual public key
})();

// Function to handle form submission
function sendMail(event) {
    event.preventDefault();

    // Get form elements
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Get form data
    const templateParams = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    };

    // Send email using EmailJS
    emailjs.send(
        'service_6wgzufy', // Replace with your service ID
        'template_2yfytih', // Replace with your template ID
        templateParams
    )
    .then(function(response) {
        // Show success message
        showFormMessage('success', 'Thank you! Your message has been sent.');
        form.reset();
    })
    .catch(function(error) {
        // Show error message
        showFormMessage('error', 'Sorry, something went wrong. Please try again later.');
        console.error('EmailJS error:', error);
    })
    .finally(function() {
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    });

    return false;
}

// Function to show form messages
function showFormMessage(type, message) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('form-message');
    
    if (type === 'success') {
        messageDiv.innerHTML = `
            <div class="form-success">
                <i class="fas fa-check-circle"></i>
                <p>Message Sent Successfully!</p>
                <p>${message}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="form-error">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        `;
    }

    // Insert message after form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}