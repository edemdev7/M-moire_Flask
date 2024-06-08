$(document).ready(function() {
    $('#contact-form').on('submit', function(event) {
        event.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();

        $.ajax({
            url: '/contact',
            method: 'POST',
            data: JSON.stringify({ name: name, email: email, message: message }),
            contentType: 'application/json',
            success: function(data) {
                alert('Message envoyé avec succès !');
                $('#contact-form')[0].reset();
            }
        });
    });
});
