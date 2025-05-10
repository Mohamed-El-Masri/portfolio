document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Simple validation
        let valid = true;
        let errorMessage = '';
        
        // Validate name
        if (nameInput.value.trim() === '') {
            valid = false;
            errorMessage += 'Name is required.\n';
            highlightError(nameInput);
        } else {
            removeErrorHighlight(nameInput);
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
            valid = false;
            errorMessage += 'Email is required.\n';
            highlightError(emailInput);
        } else if (!validateEmail(emailInput.value.trim())) {
            valid = false;
            errorMessage += 'Please enter a valid email address.\n';
            highlightError(emailInput);
        } else {
            removeErrorHighlight(emailInput);
        }
        
        // Validate subject
        if (subjectInput.value.trim() === '') {
            valid = false;
            errorMessage += 'Subject is required.\n';
            highlightError(subjectInput);
        } else {
            removeErrorHighlight(subjectInput);
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            valid = false;
            errorMessage += 'Message is required.\n';
            highlightError(messageInput);
        } else {
            removeErrorHighlight(messageInput);
        }
        
        if (valid) {
            // Form is valid, show success message
            showFormSuccess();
            
            // Reset the form
            form.reset();
        } else {
            // Show error message
            alert(errorMessage);
        }
    });
    
    // Helper function to validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Helper function to highlight error
    function highlightError(input) {
        input.style.borderColor = '#ff4b4b';
        input.style.boxShadow = '0 0 0 3px rgba(255, 75, 75, 0.2)';
    }
    
    // Helper function to remove error highlight
    function removeErrorHighlight(input) {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }
    
    // Helper function to show form success
    function showFormSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Your message has been sent successfully!</p>
            <p>I'll get back to you as soon as possible.</p>
        `;
        
        // Insert success message after form
        form.parentNode.insertBefore(successMessage, form.nextSibling);
        
        // Hide the form
        form.style.display = 'none';
        
        // Remove success message after 5 seconds and show form again
        setTimeout(() => {
            successMessage.remove();
            form.style.display = 'block';
        }, 5000);
    }
    
    // Add input event listeners for real-time validation
    const formInputs = [nameInput, emailInput, subjectInput, messageInput];
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                removeErrorHighlight(input);
            }
        });
    });
});