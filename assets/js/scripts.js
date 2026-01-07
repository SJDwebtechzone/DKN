 // Mobile menu functionality
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
        const mobileClose = document.getElementById('mobile-close');
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', () => {
    const isOpen = mobileNavOverlay.classList.contains('active');

    if (isOpen) {
        // CLOSE menu
        mobileNavOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';

        closeMobileDropdowns(); // ✅ closes dropdowns
    } else {
        // OPEN menu
        mobileNavOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
});


      

        // Close menu when clicking overlay
        mobileNavOverlay.addEventListener('click', (e) => {
            if (e.target === mobileNavOverlay) {
                mobileNavOverlay.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Mobile dropdown functionality
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const submenu = toggle.nextElementSibling;
                const icon = toggle.querySelector('i');
                
                if (submenu) {
                    submenu.classList.toggle('active');
                }
                if (icon) {
                    icon.classList.toggle('fa-chevron-down');
                    icon.classList.toggle('fa-chevron-up');
                }
            });
        });
 function closeMobileDropdowns() {
    document.querySelectorAll('.mobile-submenu').forEach(submenu => {
        submenu.classList.remove('active');
    });

    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.classList.remove('active');
    });
}


// Close mobile menu on scroll
window.addEventListener('scroll', () => {
    if (mobileNavOverlay.classList.contains('active')) {
        mobileNavOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
         closeMobileDropdowns();
    }
});
        const menu = document.querySelector('.mobile_menu');
        const nav = document.querySelector('#navigation');

        // Disable SlickNav initialization
        if (typeof $.fn.slicknav !== 'undefined') {
            $('#navigation').slicknav('destroy');
        }

         
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header-sticky");
    if (!header) return;

    if (window.scrollY > 100) {
      header.classList.add("sticky-bar");
    } else {
      header.classList.remove("sticky-bar");
    }
  });

  