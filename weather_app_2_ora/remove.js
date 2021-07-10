export const remove = () => {
    const removeIcons = document.querySelectorAll('.torles');
    const deguCard = document.querySelectorAll('degulion-card');
    removeIcons[0].addEventListener('click', () => deguCard[0].remove());
    
}

