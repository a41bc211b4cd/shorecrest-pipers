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

	// pill: true draws that link as the gold button (style is in pipers.css).
	var links = [
		{ href: 'calendar.html',   icon: 'fa-calendar',    label: 'Calendar' },
		{ href: 'fundraiser.html', icon: 'fa-heart',       label: 'Got Pipes? Fundraiser', pill: true },
		{ href: 'history.html',    icon: 'fa-book',        label: 'History' },
		{ href: '#footer',         icon: 'fa-info-circle', label: 'About' }
	];

	var navHtml = '<ul>';
	for (var i = 0; i < links.length; i++) {
		var classes = 'icon solid ' + links[i].icon;
		if (links[i].pill) {
			classes += ' pill';
		}
		navHtml += '<li><a href="' + links[i].href +
			'" class="' + classes + '">' +
			links[i].label + '</a></li>';
	}
	navHtml += '</ul>';

	document.getElementById('main-nav').innerHTML = navHtml;

	// ---- Footer ----

	// Contact email, assembled at runtime so address-scraping bots
	// that don't run JavaScript never see it in the page source.
	// (A placeholder form embed is planned; this mailto link fills
	// the gap until then.)
	var emailUser = 'schpipersclub';
	var emailDomain = 'gmail.com';
	var mailLink = 'mailto:' + emailUser + '@' + emailDomain +
		'?subject=' + encodeURIComponent('Shorecrest Pipers Club Inquiry') +
		'&body=' + encodeURIComponent('Describe your request here:');

	var footerHtml =
		'<div class="inner split">' +
			'<div>' +
				'<section>' +
					'<h2>The Revival</h2>' +
					'<p>Piping at Shorecrest is back! Since 2024, the Pipers Club has been led by Alexa Boss, an award-winning piper with thirty-four years of experience, twenty-two years of teaching, and international competition credentials including the World Pipe Band Championships. New members are always welcome, no experience needed. <a href="history.html">Read our full history</a>.</p>' +
				'</section>' +
				'<section>' +
					'<h2>Follow Pipers Club</h2>' +
					'<ul class="icons">' +
						// Facebook link commented out until the club has a page.
						// '<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>' +
						'<li><a href="https://www.instagram.com/scpipers/" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>' +
					'</ul>' +
				'</section>' +
				'<p class="copyright">&copy; Shorecrest Pipers Club. Design: <a href="http://html5up.net">HTML5 UP</a>. Webmaster: CallumCM.</p>' +
			'</div>' +
			'<div>' +
				'<section>' +
					'<h2>Get in touch</h2>' +
					'<p>Questions about joining, booking the Shorecrest Pipers Club for an event, or anything else? <a href="' + mailLink + '">Send us an email</a>, and a club volunteer will write back.</p>' +
					'<p class="contact-note">Our full contact form is coming soon.</p>' +
				'</section>' +
			'</div>' +
		'</div>';

	document.getElementById('footer').innerHTML = footerHtml;

})();
