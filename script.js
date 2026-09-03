 
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      e.preventDefault();  
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');
const restaurantCards = document.querySelectorAll('.rest-card');

function filterRestaurants() {
  const query = searchInput.value.trim().toLowerCase();
 
  if (query === '') {
    restaurantCards.forEach((card) => (card.style.display = ''));
    return;
  }

  let matchCount = 0;

  restaurantCards.forEach((card) => {
    const name = card.querySelector('.rest-name').textContent.toLowerCase();
    const cuisine = card.querySelector('.rest-cuisine').textContent.toLowerCase();

    const isMatch = name.includes(query) || cuisine.includes(query);
    card.style.display = isMatch ? '' : 'none';
    if (isMatch) matchCount++;
  });

  showNoResultsMessage(matchCount === 0);
  if(matchCount>0){
    document.querySelector('#restaurants').scrollIntoView({ behavior: 'smooth' });

  }
  
}

function showNoResultsMessage(show) {
  let msg = document.querySelector('.no-results-msg');

  if (show && !msg) {
    msg = document.createElement('p');
    msg.className = 'no-results-msg';
    msg.textContent = 'No restaurants match your search.';
    msg.style.textAlign = 'center';
    msg.style.padding = '20px';
    document.querySelector('.search-bar').after(msg);
  } else if (!show && msg) {
    msg.remove();
  }
}

searchBtn.addEventListener('click', filterRestaurants);

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    filterRestaurants();
  }
});
 
searchInput.addEventListener('input', filterRestaurants);
