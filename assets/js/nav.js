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
		{ href: '#',               icon: 'fa-calendar',    label: 'Calendar' },
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

// ---- Keyboard access (issue #13) ----
// main.js strips href from the header links (and the About toggle) to
// attach click handlers, which leaves them unfocusable and inoperable
// from the keyboard. Once main.js has run (DOMContentLoaded), restore
// focus, button/link semantics and Enter/Space activation, and move
// focus into the footer panel when it opens and back out when it closes.
document.addEventListener('DOMContentLoaded', function() {

	var header = document.getElementById('header');
	var footer = document.getElementById('footer');
	var toggle = null;

	if (!header) return;

	var els = header.querySelectorAll('a:not([href])');
	for (var i = 0; i < els.length; i++) {
		(function(el) {
			var isAbout = (el.textContent.replace(/\s+/g, '') == 'About');
			el.setAttribute('tabindex', '0');
			el.setAttribute('role', isAbout ? 'button' : 'link');
			if (isAbout) {
				toggle = el;
				el.setAttribute('aria-controls', 'footer');
				el.setAttribute('aria-expanded', 'false');
			}
			el.addEventListener('keydown', function(e) {
				if (e.key == 'Enter' || (isAbout && e.key == ' ')) {
					e.preventDefault();
					el.click();
				}
			});
		})(els[i]);
	}

	if (footer && toggle && window.MutationObserver) {
		footer.setAttribute('tabindex', '-1');
		footer.setAttribute('aria-label', 'About the Pipers Club');
		new MutationObserver(function() {
			var open = footer.classList.contains('active');
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
			if (open) {
				footer.focus();
			} else if (footer.contains(document.activeElement)) {
				toggle.focus();
			}
		}).observe(footer, { attributes: true, attributeFilter: ['class'] });
	}

});