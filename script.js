/* ============================================= */
/* 🎉 FRIENDSHIP SURPRISE WEBSITE — SCRIPT.JS    */
/* For Vruti Poojara 💜                          */
/* ============================================= */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced-motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================= */
  /* BACKGROUND PARTICLES                          */
  /* ============================================= */
  function createParticles() {
    if (prefersReducedMotion) return;
    const container = document.getElementById('particles-bg');
    const particleCount = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      // Random purple/pink tones
      const colors = ['#A78BFA', '#C4B5FD', '#F9A8D4', '#8B5CF6', '#6D28D9'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      container.appendChild(particle);
    }
  }
  createParticles();

  /* ============================================= */
  /* 1. WELCOME SCREEN TRANSITION                  */
  /* ============================================= */
  const welcomeScreen = document.getElementById('welcome-screen');
  const openSurpriseBtn = document.getElementById('open-surprise-btn');

  openSurpriseBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    // Remove from DOM after transition
    setTimeout(() => {
      welcomeScreen.style.display = 'none';
    }, 900);
  });

  /* ============================================= */
  /* 2. NAVIGATION                                 */
  /* ============================================= */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  let lastScrollY = window.scrollY;

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Hide/show navbar on scroll
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }
    lastScrollY = currentScrollY;

    // Back to top button visibility
    updateScrollTopBtn();
  }, { passive: true });

  /* ============================================= */
  /* 3. SMOOTH SCROLLING (for all anchor links)    */
  /* ============================================= */
  document.querySelectorAll('a[href^="#"], .scroll-btn').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ============================================= */
  /* 4. SCROLL-TRIGGERED REVEAL ANIMATIONS         */
  /* ============================================= */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Don't unobserve — keep it revealed once visible
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ============================================= */
  /* 5. ANIMATED ENVELOPE / LETTER REVEAL          */
  /* ============================================= */
  const envelope = document.getElementById('envelope');
  const openLetterBtn = document.getElementById('open-letter-btn');
  const letterContent = document.getElementById('letter-content');

  openLetterBtn.addEventListener('click', () => {
    // Animate envelope opening
    envelope.classList.add('opened');

    // After envelope opens, reveal the letter
    setTimeout(() => {
      letterContent.style.display = 'block';
      // Animate each paragraph sequentially
      const paragraphs = letterContent.querySelectorAll('p');
      paragraphs.forEach((p, i) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(() => {
          p.style.opacity = '1';
          p.style.transform = 'translateY(0)';
        }, 150 * i);
      });

      // Hide the button and envelope after reveal
      openLetterBtn.style.display = 'none';

      // Smooth scroll to letter content
      setTimeout(() => {
        letterContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }, 700);
  });

  /* ============================================= */
  /* 6. GIFT BOX ANIMATION                         */
  /* ============================================= */
  const giftBox = document.getElementById('gift-box');
  const openGiftBtn = document.getElementById('open-gift-btn');
  const giftMessage = document.getElementById('gift-message');
  const giftContainer = document.getElementById('gift-container');
  const replayGiftBtn = document.getElementById('replay-gift-btn');

  function openGift() {
    // Animate the gift box opening
    giftBox.classList.add('opened');

    // Show confetti and floating hearts
    if (!prefersReducedMotion) {
      createConfetti();
      createFloatingHearts();
    }

    // After lid animation, show message
    setTimeout(() => {
      giftContainer.style.display = 'none';
      giftMessage.style.display = 'block';

      // Scroll to the message
      setTimeout(() => {
        giftMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }, 800);
  }

  openGiftBtn.addEventListener('click', openGift);

  // Replay gift
  replayGiftBtn.addEventListener('click', () => {
    giftBox.classList.remove('opened');
    giftMessage.style.display = 'none';
    giftContainer.style.display = 'flex';
    // Clean up confetti
    document.getElementById('confetti-container').innerHTML = '';
  });

  /* ============================================= */
  /* 7. CONFETTI & FLOATING HEARTS                 */
  /* ============================================= */
  function createConfetti() {
    const container = document.getElementById('confetti-container');
    const confettiCount = window.innerWidth < 768 ? 40 : 80;
    const colors = ['#A78BFA', '#F9A8D4', '#C4B5FD', '#8B5CF6', '#6D28D9', '#EC4899', '#FBBF24', '#34D399'];

    for (let i = 0; i < confettiCount; i++) {
      const piece = document.createElement('div');
      piece.classList.add('confetti-piece');
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (Math.random() * 3 + 2) + 's';
      piece.style.animationDelay = (Math.random() * 2) + 's';

      // Random shapes
      const shapes = ['50%', '0%', '30%'];
      piece.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
      piece.style.width = (Math.random() * 10 + 5) + 'px';
      piece.style.height = (Math.random() * 10 + 5) + 'px';

      container.appendChild(piece);
    }

    // Clean up confetti after animations complete
    setTimeout(() => {
      container.innerHTML = '';
    }, 6000);
  }

  function createFloatingHearts() {
    const container = document.getElementById('confetti-container');
    const heartEmojis = ['💜', '💕', '✨', '💗', '💖'];

    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.classList.add('floating-heart');
      heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.bottom = '0';
      heart.style.animationDelay = (Math.random() * 2) + 's';
      heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
      container.appendChild(heart);
    }
  }

  /* ============================================= */
  /* 8. IMAGE GALLERY LIGHTBOX                     */
  /* ============================================= */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  // Click on gallery images to open lightbox
  document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => {
      // Only open if the image has actually loaded (not a placeholder)
      if (!img.classList.contains('img-placeholder') && img.src && img.naturalWidth > 0) {
        lightboxImg.src = img.dataset.full || img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);

  // Close on overlay click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  /* ============================================= */
  /* 9. INTERACTIVE FRIENDSHIP QUIZ                */
  /* ============================================= */
  const quizQuestions = [
    {
      question: 'What did I create this website for?',
      options: ['A college assignment', 'A special friendship gift', 'A job application'],
      correct: 1,
      correctFeedback: '🎉 Exactly! This is a special gift made just for you!',
      wrongFeedback: 'Haha, not quite! This is a special friendship gift! 💜'
    },
    {
      question: 'What do I appreciate most about you?',
      options: ['Your guidance and support', 'Your shopping habits', 'Your cooking skills'],
      correct: 0,
      correctFeedback: '💜 You know it! Your guidance means the world to me!',
      wrongFeedback: 'Nice try! But it\'s your guidance and support I appreciate most! 💫'
    },
    {
      question: 'What is the main message of this website?',
      options: ['Never talk to me again', 'Thank you for being such a wonderful friend', 'Let\'s study all day'],
      correct: 1,
      correctFeedback: '✨ Perfect! You truly are a wonderful friend!',
      wrongFeedback: 'Hehe, the answer is — Thank you for being such a wonderful friend! 💜'
    }
  ];

  let currentQuestion = 0;
  let quizScore = 0;
  let answered = false;

  const quizQText = document.getElementById('quiz-q-text');
  const quizOptions = document.getElementById('quiz-options');
  const quizFeedback = document.getElementById('quiz-feedback');
  const quizResult = document.getElementById('quiz-result');
  const quizNextBtn = document.getElementById('quiz-next-btn');
  const quizReplayBtn = document.getElementById('quiz-replay-btn');

  function loadQuestion() {
    answered = false;
    const q = quizQuestions[currentQuestion];
    quizQText.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}: ${q.question}`;
    quizOptions.innerHTML = '';
    quizFeedback.textContent = '';
    quizNextBtn.style.display = 'none';

    q.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.classList.add('quiz-option');
      btn.textContent = option;
      btn.addEventListener('click', () => selectAnswer(index, btn));
      quizOptions.appendChild(btn);
    });
  }

  function selectAnswer(index, btn) {
    if (answered) return;
    answered = true;

    const q = quizQuestions[currentQuestion];
    const allOptions = quizOptions.querySelectorAll('.quiz-option');

    // Disable all options
    allOptions.forEach(opt => opt.classList.add('disabled'));

    if (index === q.correct) {
      btn.classList.add('correct');
      quizFeedback.textContent = q.correctFeedback;
      quizFeedback.style.color = '#86EFAC';
      quizScore++;
    } else {
      btn.classList.add('wrong');
      allOptions[q.correct].classList.add('correct');
      quizFeedback.textContent = q.wrongFeedback;
      quizFeedback.style.color = '#FCA5A5';
    }

    // Show next button or result
    if (currentQuestion < quizQuestions.length - 1) {
      quizNextBtn.style.display = 'inline-block';
    } else {
      setTimeout(showQuizResult, 1000);
    }
  }

  function showQuizResult() {
    document.getElementById('quiz-question').style.display = 'none';
    quizFeedback.textContent = '';
    quizNextBtn.style.display = 'none';

    quizResult.style.display = 'block';
    let resultMsg = '';
    if (quizScore === quizQuestions.length) {
      resultMsg = `🎉 Perfect Score! ${quizScore}/${quizQuestions.length}! You really know our friendship well! 💜`;
    } else if (quizScore >= 2) {
      resultMsg = `✨ Great job! ${quizScore}/${quizQuestions.length}! You know our friendship pretty well! 💜`;
    } else {
      resultMsg = `😄 You scored ${quizScore}/${quizQuestions.length}! But hey, what matters is that we're friends! 💜`;
    }
    quizResult.textContent = resultMsg;
    quizReplayBtn.style.display = 'inline-block';
  }

  quizNextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuestion();
  });

  quizReplayBtn.addEventListener('click', () => {
    currentQuestion = 0;
    quizScore = 0;
    document.getElementById('quiz-question').style.display = 'block';
    quizResult.style.display = 'none';
    quizReplayBtn.style.display = 'none';
    loadQuestion();
  });

  // Initialize quiz
  loadQuestion();

  /* ============================================= */
  /* 10. BACK TO TOP BUTTON                        */
  /* ============================================= */
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  function updateScrollTopBtn() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollTopBtn.addEventListener('click', scrollToTop);
  backToTopBtn.addEventListener('click', scrollToTop);

  /* ============================================= */
  /* 11. GRACEFUL IMAGE HANDLING                   */
  /* ============================================= */
  // Handle images that fail to load (in addition to inline onerror)
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      if (!this.classList.contains('img-placeholder')) {
        this.src = '';
        this.alt = 'Photo coming soon 📸';
        this.classList.add('img-placeholder');
      }
    });
  });

  /* ============================================= */
  /* INITIALIZATION COMPLETE                       */
  /* ============================================= */
  console.log('💜 Friendship Surprise Website loaded successfully!');
  console.log('🎁 Made with love for Vruti Poojara.');
});
