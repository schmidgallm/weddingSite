$(document).ready(() => {
	// focus on name on page load and hide success message
	$('#name').focus();
	$('#success-message').hide();
	$('#success-comment-message').hide();
	$('#email-message').hide();

	// Event Listeners
	$(document).on('click', '#submit', newMessage);
	$(document).on('click', '#comment-submit', newComment);

	function newMessage(e) {
		// Prevent form from submitting
		e.preventDefault();
		// Create new message objct
		const newMsg = {
			name: $('#name').val().trim(),
			email: $('#email').val().trim(),
			message: $('#message').val().trim()
		};

		// Ajax Post Request
		$.ajax({
			url: '/submit',
			type: 'POST',
			data: newMsg,
			success: messageSent()
		}).then((rsp) => {
			console.log(rsp);
			console.log('ajax called');
		});
	}

	function messageSent() {
		swal({
			title: 'Message Has Beent Sent!',
			text: 'See You There!!',
			icon: 'success',
			button: 'Wedding!'
		}).then(function() {
			//show success message
			$('#name').val('');
			$('#email').val('');
			$('#message').val('');
			$('#name').focus();
			$('#success-message').show().addClass('animated slideInLeft success-message-color');
		});
	}

	function newComment(e) {
		// Prevent form from submitting
		e.preventDefault();
		// Create new message objct
		const newCmt = {
			name: $('#comment-name').val().trim(),
			comment: $('#comment-message').val().trim()
		};

		// Ajax Post Request
		$.ajax({
			url: '/commentsubmit',
			type: 'POST',
			data: newCmt,
			success: commentSent()
		});
	}

	function commentSent() {
		window.location.reload();
		$('#success-comment-message').show();
		$('#success-comment-message').addClass('animated slideInRight');
	}
});
