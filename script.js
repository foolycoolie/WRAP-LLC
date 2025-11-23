// Small interactive helpers: mobile nav toggle, reveal on scroll, simple form handling

document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  toggle && toggle.addEventListener('click', () => {
    if (nav.style.display === 'flex') nav.style.display = '';
    else nav.style.display = 'flex';
  });

  // IntersectionObserver reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Simple form submit handler (client-side only)
  window.submitForm = function(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    // Very light validation
    const name = data.get('name');
    const email = data.get('email');
    if (!name || !email) {
      alert('Please provide name and email.');
      return;
    }
    // For now we open the user's email client with the message (mailto fallback)
    const subject = encodeURIComponent('WRAP — New inquiry from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + (data.get('phone')||'') + '\n\nMessage:\n' + data.get('message'));
    window.location.href = 'mailto:info@wrap.example?subject=' + subject + '&body=' + body;
  };
});
