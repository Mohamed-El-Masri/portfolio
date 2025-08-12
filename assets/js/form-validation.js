
// Function to handle Formspree form submission
function sendMail(event) {
    event.preventDefault();

    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Prepare form data
    const formData = new FormData(form);

    // Replace with your Formspree endpoint
    const formspreeEndpoint = 'https://formspree.io/f/mnnzwvla';

    fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            showFormMessage('success', 'Thank you! Your message has been sent.');
            form.reset();
        } else {
            showFormMessage('error', 'Sorry, something went wrong. Please try again later.');
        }
    })
    .catch(error => {
        showFormMessage('error', 'Sorry, something went wrong. Please try again later.');
        console.error('Formspree error:', error);
    })
    .finally(() => {
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