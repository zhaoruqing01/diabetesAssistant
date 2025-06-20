// 文章頁面 JavaScript 功能
document.addEventListener('DOMContentLoaded', function() {
    // 返回按鈕功能
    const backButton = document.querySelector('button i.fa-arrow-left');
    if (backButton) {
        backButton.parentElement.addEventListener('click', function() {
            history.back();
        });
    }
    
    // 分享按鈕功能
    const shareButton = document.querySelector('button i.fa-share');
    if (shareButton) {
        shareButton.parentElement.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: '糖尿病类型',
                    text: '了解不同类型的糖尿病及其治疗方法',
                    url: window.location.href
                });
            } else {
                // 降級處理：複製鏈接到剪貼板
                navigator.clipboard.writeText(window.location.href).then(function() {
                    alert('鏈接已複製到剪貼板');
                });
            }
        });
    }
    
    // 底部導航功能
    const navButtons = document.querySelectorAll('footer button');
    navButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // 移除所有活動狀態
            navButtons.forEach(btn => {
                btn.classList.remove('text-primary');
                btn.classList.add('text-gray-400');
            });
            
            // 添加當前活動狀態
            button.classList.remove('text-gray-400');
            button.classList.add('text-primary');
            
            // 這裡可以添加頁面跳轉邏輯
            console.log('導航到:', index);
        });
    });
});