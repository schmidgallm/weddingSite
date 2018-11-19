$(document).ready(() => {

    // focus on name on page load and hide success message
    $('#name').focus();
    $('#success-message').hide();
    $('#email-message').hide();


    // Event Listeners
    $(document).on('click', '#submit', newMessage);

    function newMessage(e) {

        // Prevent form from submitting
        e.preventDefault();
        // Create new message objct 
        const newMsg = {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            message: $('#message').val().trim()
        }

        // Ajax Post Request
        $.ajax({
            url: '/submit',
            type: 'POST',
            data: newMsg,
            success: messageSent()
        }).then((rsp) => {
            console.log(rsp);
            console.log("ajax called");
        });
    }

    function messageSent(){
        swal({
            title: "Message Has Beent Sent!",
            text: "See You There!!",
            icon: "success",
            button: "Aww yiss!",
        }).then( function() {
            //show success message
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
            $('#name').focus();
            $('#success-message').show().addClass('animated slideInLeft success-message-color');
        });
    }
});