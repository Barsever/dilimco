document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animations with enhanced settings
    AOS.init({
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        once: false,
        mirror: true,
        disable: 'mobile',
        anchorPlacement: 'center-bottom'
    });

    // Custom cursor effect
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            cursorFollower.classList.add('cursor-follower-active');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            cursorFollower.classList.remove('cursor-follower-active');
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (document.querySelector('nav.active')) {
                toggleMobileMenu();
            }
        });
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    function toggleMobileMenu() {
        const nav = document.querySelector('nav');
        const toggle = document.querySelector('.mobile-nav-toggle');
        
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
        
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    // Add header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Enhanced pizza hover effects with dramatic growth and 3D effects
    const pizzaItems = document.querySelectorAll('.pizza-item');
    
    pizzaItems.forEach(item => {
        const pizzaImg = item.querySelector('.pizza-img');
        const pizzaContainer = item.querySelector('.pizza-image-container');
        const pizzaInfo = item.querySelector('h3').parentElement;
        
        // Generate random rotation values for each pizza
        const randomRotationX = Math.random() * 10 - 5;
        const randomRotationY = Math.random() * 10 - 5;
        const randomRotationZ = Math.random() > 0.5 ? 5 : -5;
        
        // Apply initial subtle transform
        pizzaImg.style.transform = 'scale(1.02) rotate(0deg)';
        pizzaImg.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        // Create shadow and light effect elements if they don't exist
        if (!item.querySelector('.pizza-shine')) {
            const shine = document.createElement('div');
            shine.className = 'pizza-shine';
            pizzaContainer.appendChild(shine);
        }
        
        // Dramatic hover effect
        item.addEventListener('mouseenter', () => {
            pizzaImg.style.transform = `scale(1.25) rotate(${randomRotationZ}deg) perspective(500px) rotateX(${randomRotationX}deg) rotateY(${randomRotationY}deg)`;
            pizzaContainer.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
            pizzaContainer.style.zIndex = '2';
            item.querySelector('.pizza-shine').style.opacity = '0.15';
            
            // Animate price and description
            const price = item.querySelector('.price');
            if (price) {
                price.style.transform = 'scale(1.1)';
                price.style.color = 'var(--accent-color)';
            }
        });
        
        // Smooth transition back
        item.addEventListener('mouseleave', () => {
            pizzaImg.style.transform = 'scale(1.02) rotate(0deg) perspective(500px) rotateX(0deg) rotateY(0deg)';
            pizzaContainer.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            pizzaContainer.style.zIndex = '1';
            item.querySelector('.pizza-shine').style.opacity = '0';
            
            // Reset price animation
            const price = item.querySelector('.price');
            if (price) {
                price.style.transform = 'scale(1)';
                price.style.color = 'var(--pastel-red)';
            }
        });
        
        // Add subtle movement on mouse move within the item
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            pizzaImg.style.transform = `scale(1.25) rotate(${randomRotationZ}deg) perspective(500px) rotateX(${y * 10}deg) rotateY(${-x * 10}deg)`;
            
            // Move light effect
            const shine = item.querySelector('.pizza-shine');
            shine.style.backgroundPosition = `${x * 100 + 50}% ${y * 100 + 50}%`;
        });
    });

    // Hero image enhanced interactive effect
    const heroImage = document.querySelector('.pizza-image img');
    const heroContainer = document.querySelector('.pizza-container');
    
    if (heroContainer && heroImage) {
        // Add shine effect to hero pizza if it doesn't exist
        if (!heroContainer.querySelector('.hero-shine')) {
            const heroShine = document.createElement('div');
            heroShine.className = 'hero-shine';
            heroContainer.appendChild(heroShine);
        }
        
        // Add pizza slice decoration elements
        if (!document.querySelector('.floating-slice')) {
            for (let i = 0; i < 3; i++) {
                const slice = document.createElement('div');
                slice.className = 'floating-slice';
                slice.style.top = `${20 + Math.random() * 60}%`;
                slice.style.left = `${Math.random() * 80}%`;
                slice.style.animationDelay = `${Math.random() * 5}s`;
                slice.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5})`;
                document.querySelector('.hero').appendChild(slice);
            }
        }

        // Initial subtle animation
        heroImage.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        heroImage.style.transform = 'scale(1.05)';
        
        // Create dramatic growth effect on hover
        heroContainer.addEventListener('mouseenter', () => {
            heroImage.style.transform = 'scale(1.2)';
            heroContainer.querySelector('.hero-shine').style.opacity = '0.2';
        });
        
        // Enhanced 3D movement effect on mouse move
        heroContainer.addEventListener('mousemove', (e) => {
            const rect = heroContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            heroImage.style.transform = `scale(1.3) translate(${x * 30}px, ${y * 30}px) perspective(800px) rotateX(${y * 10}deg) rotateY(${-x * 15}deg)`;
            
            // Move light effect
            const shine = heroContainer.querySelector('.hero-shine');
            shine.style.backgroundPosition = `${x * 100 + 50}% ${y * 100 + 50}%`;
        });
        
        heroContainer.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'scale(1.05)';
            heroContainer.querySelector('.hero-shine').style.opacity = '0';
        });
        
        // Add parallax scrolling effect
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroSection = document.querySelector('.hero');
            const scrollPosition = scrollY - heroSection.offsetTop;
            
            if (scrollPosition <= heroSection.offsetHeight && scrollPosition >= -window.innerHeight) {
                const parallaxValue = scrollPosition * 0.15;
                heroImage.style.transform = `scale(1.05) translateY(${parallaxValue}px)`;
            }
        });
    }

    // Form submission with better UX
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Gönderiliyor...';
            submitBtn.disabled = true;
            
            // Simulate form submission (in a real app, this would be an API call)
            setTimeout(() => {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Mesajınız için teşekkürler! En kısa sürede size geri dönüş yapacağız.';
                successMessage.style.padding = '15px';
                successMessage.style.marginTop = '15px';
                successMessage.style.backgroundColor = 'rgba(202, 255, 191, 0.2)';
                successMessage.style.borderRadius = '10px';
                successMessage.style.color = 'var(--pastel-green)';
                successMessage.style.textAlign = 'center';
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        contactForm.removeChild(successMessage);
                    }, 500);
                }, 5000);
            }, 1500);
        });
    }

    // Gallery functionality removed
});

// Add CSS classes for cursor when content is clicked
document.addEventListener('mousedown', () => {
    document.querySelector('.cursor').classList.add('cursor-clicked');
});

document.addEventListener('mouseup', () => {
    document.querySelector('.cursor').classList.remove('cursor-clicked');
});

// Add scroll-triggered animations for sections
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        
        // Check if section is in viewport
        if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
            section.classList.add('in-view');
            
            // Add staggered animation to children
            const animatedElements = section.querySelectorAll('.pizza-item, .feature');
            animatedElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('item-in-view');
                }, index * 100);
            });
        }
    });
});

// Add interactive pizza slice background elements
function createPizzaElements() {
    const pizzaContainer = document.createElement('div');
    pizzaContainer.className = 'background-elements';
    document.body.appendChild(pizzaContainer);
    
    // Create abstract pizza elements
    for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.className = 'bg-element';
        element.style.top = `${Math.random() * 100}%`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.width = `${30 + Math.random() * 50}px`;
        element.style.height = `${30 + Math.random() * 50}px`;
        element.style.opacity = `${0.03 + Math.random() * 0.05}`;
        element.style.transform = `rotate(${Math.random() * 360}deg)`;
        element.style.animationDelay = `${Math.random() * 10}s`;
        pizzaContainer.appendChild(element);
    }
}

createPizzaElements();

