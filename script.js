// ── MOBILE MENU TOGGLE ──
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// ── ACTIVE NAV LINK ──
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ── SCROLL REVEAL ANIMATION ──
function initScrollReveal() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// ── SKILL BARS ANIMATION ──
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pct = entry.target.dataset.pct || '0';
                setTimeout(() => {
                    entry.target.style.width = pct + '%';
                }, 300);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Helper function to convert regular numbers to Roman numerals
function convertToRoman(num) {
  const romanPairs = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4, I: 1
  };
  let result = '';
  for (let key in romanPairs) {
    while (num >= romanPairs[key]) {
      result += key;
      num -= romanPairs[key];
    }
  }
  return result;
}

// --- UTILITIES ---
function convertToRoman(num) {
  const romanPairs = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4, I: 1
  };
  let result = '';
  for (let key in romanPairs) {
    while (num >= romanPairs[key]) {
      result += key;
      num -= romanPairs[key];
    }
  }
  return result;
}

function initWritingFilters() {
  const filterContainer = document.querySelector('.writing-filters');
  const noWritingsCard = document.querySelector('.no-writings-card');
  
  // Exit early if we aren't on the writing page
  if (!filterContainer) return;

  const buttons = filterContainer.querySelectorAll('.filter-btn');
  // Reverted to your original selector to ensure it catches every entry
  const cards = document.querySelectorAll('.content-item'); 

  // --- RESTORED NUMBERING LOGIC ---
  function calculateNumerals() {
    let counter = 1;
    cards.forEach(card => {
      if (!card.classList.contains('hidden')) {
        const numDisplay = card.querySelector('.writing-number');
        if (numDisplay) {
          numDisplay.textContent = convertToRoman(counter);
          counter++;
        }
      }
    });
  }

  // --- EMPTY STATE LOGIC ---
  function toggleEmptyState() {
    if (!noWritingsCard) return; // Don't crash if card layout isn't built yet
    const visibleCards = Array.from(cards).filter(card => !card.classList.contains('hidden'));
    if (visibleCards.length === 0) {
      noWritingsCard.classList.remove('hidden');
    } else {
      noWritingsCard.classList.add('hidden');
    }
  }

  // Run both rules immediately on page load
  calculateNumerals();
  toggleEmptyState();

  // --- BUTTON CLICK EVENT LISTENERS ---
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });

      // Recalculate everything after a filter change
      calculateNumerals();
      toggleEmptyState();
    });
  });
}

function initProjectFilters() {
    const filterContainer = document.querySelector('.project-filters');
    const noProjectsCard = document.querySelector('.no-projects-card');
    
    // Safely exit if this isn't the projects page
    if (!filterContainer || !noProjectsCard) return;

    const buttons = filterContainer.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    function toggleEmptyState() {
        const visibleCards = Array.from(cards).filter(card => !card.classList.contains('hidden'));
        if (visibleCards.length === 0) {
            noProjectsCard.classList.remove('hidden');
        } else {
            noProjectsCard.classList.add('hidden');
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button state styling
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });

            toggleEmptyState();
        });
    });

    // Run initial empty check on page build
    toggleEmptyState();
}


/*function initArtworkFilters() {
    const filterContainer = document.querySelector('.gallery-filters');
    const noArtCard = document.querySelector('.no-art-card');
    
    if (!filterContainer) return;

    const buttons = filterContainer.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.art-piece');
    const heading = document.querySelector('.gallery-section-heading'); // Grab the 'Featured' heading

    function toggleEmptyState() {
        if (!noArtCard) return;
        const visibleCards = Array.from(cards).filter(card => !card.classList.contains('hidden'));
        
        if (visibleCards.length === 0) {
            noArtCard.classList.remove('hidden');
        } else {
            noArtCard.classList.add('hidden');
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            if (filter === 'all') {
                // 1. Restore the 'Featured' text heading
                if (heading) heading.classList.remove('hidden');

               cards.forEach(card => {
        card.classList.remove('hidden');
        
        // ── FIX IS HERE ──
        // Check for the specific image by its unique title or its specific category
        const titleElement = card.querySelector('.art-title');
        if (titleElement && titleElement.textContent.trim() === 'First Bloom') {
            card.classList.add('featured'); // Force the grid cell to span across 3 columns again
        }
    }); 
            } else {
                // 3. Hide the 'Featured' heading text for all specific tabs
                if (heading) heading.classList.add('hidden');
                
                cards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (category === filter) {
                        card.classList.remove('hidden');
                        // 4. Strip the 'featured' layout class so it behaves like a normal grid card
                        card.classList.remove('featured');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }

            toggleEmptyState();
        });
    });

    toggleEmptyState();
}*/

function initArtworkFilters() {
    const filterContainer = document.querySelector('.gallery-filters');
    const noArtCard = document.querySelector('.no-art-card');
    
    if (!filterContainer) return;

    const buttons = filterContainer.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.art-piece');
    const heading = document.querySelector('.gallery-section-heading'); // Grab the 'Featured' heading

    function toggleEmptyState() {
        if (!noArtCard) return;
        const visibleCards = Array.from(cards).filter(card => !card.classList.contains('hidden'));
        
        if (visibleCards.length === 0) {
            noArtCard.classList.remove('hidden');
        } else {
            noArtCard.classList.add('hidden');
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state styling rules on navigation elements
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            if (filter === 'all') {
                // Restore the 'Featured' text heading
                if (heading) heading.classList.remove('hidden');

                cards.forEach(card => {
                    card.classList.remove('hidden');
                    
                    // Force the grid cell to span across full columns again on active toggle
                    const titleElement = card.querySelector('.art-title');
                    if (titleElement && titleElement.textContent.trim() === 'First Bloom') {
                        card.classList.add('featured');
                    }
                });
            } else {
                // Hide the 'Featured' heading text for all specific category tabs
                if (heading) heading.classList.add('hidden');
                
                cards.forEach(card => {
                    // Pull data tags and split them by spaces to safely handle multiple categories
                    const categoriesAttr = card.getAttribute('data-category') || '';
                    const categories = categoriesAttr.split(' ');
                    
                    if (categories.includes(filter)) {
                        card.classList.remove('hidden');
                        // Strip the layout settings so it behaves like a standard grid card inside sub-menus
                        card.classList.remove('featured');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }

            // Check if we need to display the empty folder fallback status
            toggleEmptyState();
        });
    });

    // Run initial execution layer state checks on DOM assembly
    toggleEmptyState();
}

    function initContactForm() {
				const contactForm = document.getElementById('contact-form');
				const formStatus = document.getElementById('form-status');
				
				if (!contactForm) return;
				
				contactForm.addEventListener('submit', async (e) => {
					e.preventDefault(); // Stop default form submit and 405 error
        console.log("Form submission intercepted successfully!");
	
        const submitBtn = contactForm.querySelector('.form-submit');
              submitBtn.disabled = true;
              submitBtn.textContent = 'Sending...';
              
					// 1. Gather and format input values into an object
					const payload = {
						name: document.getElementById('name').value,
						email: document.getElementById('email').value,
						subject: document.getElementById('subject').value,
						message: document.getElementById('message').value
						};
						
						try {
							// 2. Post the formatted data directly to your personal Google Script URL
							const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyE4D02duv6MjB08i9qOxjiT4PIAuOpRpRvE7F9k-1LkLx_7F6SH079pZ_tRJUAAxjd/exec';
							
							const response = await fetch(GOOGLE_SCRIPT_URL, {
								method: 'POST',
								headers: {
									'Content-Type': 'text/plain;charset=utf-8',
									},
									body: JSON.stringify(payload)
									});
									
									const result = await response.json();
									
									if (result.status === 'success') {
										/*formStatus.style.color = 'var(--accent, #4ade80)';
										formStatus.textContent = 'Message delivered successfully!';
                    const submitBtn = contactForm.querySelector('.form-submit');
                          submitBtn.disabled = true;*/
                          submitBtn.textContent = 'Sent successfully!';
										contactForm.reset();
										} else {
											throw new Error(result.message);
										}
										} catch (error) {
											/*formStatus.style.color = '#f87171';
											formStatus.textContent = 'Failed to send message. Please try again.';*/
											console.error('Submission error:', error);
											} finally {
												submitBtn.disabled = false;
												submitBtn.textContent = 'Send Message →';
											}
											});
										}

// ── INITIALIZE ──
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    setActiveNavLink();
    initScrollReveal();
    animateSkillBars();
    initWritingFilters();
    initProjectFilters();
    initArtworkFilters();
    initContactForm();
});
