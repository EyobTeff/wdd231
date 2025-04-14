export function showModal(message) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    content.textContent = message;
    modal.classList.add('open');
  }
  
  export function closeModal() {
    document.getElementById('modal').classList.remove('open');
  }
  