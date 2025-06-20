// 糖尿病頁面 JavaScript 功能
document.addEventListener('DOMContentLoaded', function() {
    // 返回按鈕功能
    const backButton = document.querySelector('button i.fa-arrow-left');
    if (backButton) {
        backButton.parentElement.addEventListener('click', function() {
            history.back();
        });
    }
    
    // 點讚功能
    const likeButton = document.querySelector('footer button:first-child');
    if (likeButton) {
        likeButton.addEventListener('click', function() {
            const heartIcon = likeButton.querySelector('i');
            const likeCount = likeButton.querySelector('span');
            
            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                likeCount.textContent = parseInt(likeCount.textContent) + 1;
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
            }
        });
    }
});