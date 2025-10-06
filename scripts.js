// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const answer = item.querySelector('.faq-answer');
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
  });
});
