// Shared navigation for the Shorecrest Pipers Club site: writes the
// header nav and the footer panel into placeholders on every page.
// Edit either block here; all pages update at once.
//
// ORDER MATTERS: this file must load BEFORE main.js on every page
// (place its <script> tag right after the empty footer shell).
(function() {

// ---- Favicon ----

	var favicon = document.createElement('link');
	favicon.rel = 'icon';
	favicon.type = 'image/png';
	favicon.href = 'favicon.png';
	document.head.appendChild(favicon);

	// ---- Header navigation ----

	var links = [
		{ href: 'events.html',    icon: 'fa-calendar',    label: 'Events' },
		{ href: 'fundraiser.html', icon: 'fa-heart',       label: 'Fundraiser' },
		{ href: 'history.html',    icon: 'fa-book',        label: 'History' },
		{ href: '#footer',         icon: 'fa-info-circle', label: 'About' }
	];

	var navHtml = '<ul>';
	for (var i = 0; i < links.length; i++) {
		navHtml += '<li><a href="' + links[i].href +
			'" class="icon solid ' + links[i].icon + '">' +
			links[i].label + '</a></li>';
	}
	navHtml += '</ul>';

	document.getElementById('main-nav').innerHTML = navHtml;

	// ---- Footer ----

	var footerHtml =
		'<div class="inner split">' +
			'<div>' +
				'<section>' +
					'<h2>The revival</h2>' +
					'<p>Piping at Shorecrest is back. Since 2024, the Pipers Club has been led by Alexa Boss, an award-winning piper with thirty-four years of experience, twenty-two years of teaching, and international competition credentials including the World Pipe Band Championships. New members are always welcome, no experience needed. <a href="history.html">Read our full history</a>.</p>' +
				'</section>' +
				'<section>' +
					'<h2>Follow the pipes</h2>' +
					'<ul class="icons">' +
						'<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>' +
						'<li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>' +
					'</ul>' +
				'</section>' +
				'<p class="copyright">&copy; Shorecrest Pipers Club. Design: <a href="http://html5up.net">HTML5 UP</a>.</p>' +
			'</div>' +
			'<div>' +
				'<section>' +
					'<h2>Get in touch</h2>' +
					'<form method="post" action="#">' +
						'<div class="fields">' +
							'<div class="field half"><input type="text" name="name" id="name" placeholder="Name" /></div>' +
							'<div class="field half"><input type="text" name="email" id="email" placeholder="Email" /></div>' +
							'<div class="field"><textarea name="message" id="message" rows="4" placeholder="Message"></textarea></div>' +
						'</div>' +
						'<ul class="actions">' +
							'<li><input type="submit" value="Send" class="primary" /></li>' +
							'<li><input type="reset" value="Reset" /></li>' +
						'</ul>' +
					'</form>' +
				'</section>' +
			'</div>' +
		'</div>';

	document.getElementById('footer').innerHTML = footerHtml;

})();