/**
 * Hotel Sugran - Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Elevation on Scroll
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Drawer Toggle
  const mobileToggleBtn = document.getElementById('mobileToggle');
  const drawerCloseBtn = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Quick Booking Bar - WhatsApp Inquiry Generator
  const bookingForm = document.getElementById('quickBookingForm');
  if (bookingForm) {
    // Set default check-in date to tomorrow
    const checkinInput = document.getElementById('checkinDate');
    if (checkinInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      checkinInput.value = tomorrow.toISOString().split('T')[0];
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const roomType = document.getElementById('roomTypeSelect').value;
      const checkinDate = document.getElementById('checkinDate').value;
      const guests = document.getElementById('guestsSelect').value;

      const formattedMessage = `Hello Hotel Sugran! 👋%0A%0AI would like to check room availability & book a room:%0A• *Room Type:* ${encodeURIComponent(roomType)}%0A• *Check-in Date:* ${encodeURIComponent(checkinDate)}%0A• *Guests:* ${encodeURIComponent(guests)}%0A%0APlease let me know room availability and pricing details. Thank you!`;

      const whatsappURL = `https://wa.me/919960318418?text=${formattedMessage}`;
      window.open(whatsappURL, '_blank');
    });
  }

  // 4. Room Details Modal Logic
  const roomModalData = {
    'super-deluxe': {
      title: 'Super Deluxe Room',
      image: './super-deluxe-room.png',
      badge: 'Boutique Luxury',
      description: 'Our Super Deluxe Room offers extra space, premium bedding, elegant lighting, and modern decor for a restful stay. Ideal for families and discerning travelers seeking maximum comfort.',
      amenities: [
        '🛏️ Plush King Size Bed',
        '❄️ Premium Air Conditioning',
        '📺 Flat Screen Smart LED TV',
        '📶 High-Speed Free Wi-Fi',
        '🚿 Hot Water & Rain Shower',
        '🍲 In-Room Dining Service',
        '🧰 Daily Housekeeping & Fresh Towels'
      ]
    },
    'deluxe': {
      title: 'Deluxe Room',
      image: './deluxe-room.png',
      badge: 'Everyday Comfort',
      description: 'The Deluxe Room combines modern amenities with warm hospitality. Clean, quiet, and equipped with everything you need for business trips or relaxing weekend getaways.',
      amenities: [
        '🛏️ Comfortable Queen Bed',
        '❄️ Efficient Air Conditioning',
        '📺 Flat Screen Smart LED TV',
        '📶 High-Speed Free Wi-Fi',
        '🚿 Continuous Hot & Cold Water',
        '🧹 Daily Room Cleaning Service',
        '💼 Dedicated Work Desk & Chair'
      ]
    }
  };

  const roomModalBackdrop = document.getElementById('roomModalBackdrop');
  const roomModalCloseBtn = document.getElementById('roomModalClose');
  const roomDetailBtns = document.querySelectorAll('.btn-room-details');

  function openRoomModal(roomId) {
    const data = roomModalData[roomId];
    if (!data) return;

    document.getElementById('modalRoomTitle').innerText = data.title;
    document.getElementById('modalRoomImg').src = data.image;
    document.getElementById('modalRoomImg').alt = data.title;
    document.getElementById('modalRoomBadge').innerText = data.badge;
    document.getElementById('modalRoomDesc').innerText = data.description;

    const amenitiesList = document.getElementById('modalRoomAmenities');
    amenitiesList.innerHTML = '';
    data.amenities.forEach(item => {
      const li = document.createElement('div');
      li.className = 'modal-amenity-item';
      li.innerText = item;
      amenitiesList.appendChild(li);
    });

    const bookBtn = document.getElementById('modalRoomBookBtn');
    bookBtn.href = `https://wa.me/919960318418?text=Hello%20Hotel%20Sugran!%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(data.title)}.`;

    roomModalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeRoomModal() {
    roomModalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  roomDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const roomId = btn.getAttribute('data-room-id');
      openRoomModal(roomId);
    });
  });

  if (roomModalCloseBtn) roomModalCloseBtn.addEventListener('click', closeRoomModal);
  if (roomModalBackdrop) {
    roomModalBackdrop.addEventListener('click', (e) => {
      if (e.target === roomModalBackdrop) closeRoomModal();
    });
  }

  // 5. Gallery Lightbox Modal
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Hotel Sugran Photo Gallery';
        lightboxBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxBackdrop) {
      lightboxBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', (e) => {
      if (e.target === lightboxBackdrop || e.target.classList.contains('lightbox-modal-content')) {
        closeLightbox();
      }
    });
  }

  // Keyboard shortcut ESC to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeRoomModal();
      closeLightbox();
      closeDrawer();
    }
  });

  // 6. Restaurant Menu Category Filter Tabs
  const menuTabBtns = document.querySelectorAll('.tab-btn');
  const menuItemCards = document.querySelectorAll('.menu-item-card');

  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      menuItemCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. Scroll Reveal Animation using Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 8. Back to Top Smooth Scroll
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
