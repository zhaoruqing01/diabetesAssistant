// 主頁面 JavaScript 功能
document.addEventListener('DOMContentLoaded', function() {
    // 底部導航功能
    const navButtons = document.querySelectorAll('nav button, nav div');
    navButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // 移除所有活動狀態
            navButtons.forEach(btn => {
                const icon = btn.querySelector('i');
                const text = btn.querySelector('span');
                if (icon) icon.parentElement.classList.remove('text-primary');
                if (icon) icon.parentElement.classList.add('text-gray-400');
            });
            
            // 添加當前活動狀態
            const icon = button.querySelector('i');
            if (icon) {
                icon.parentElement.classList.remove('text-gray-400');
                icon.parentElement.classList.add('text-primary');
            }
            
            // 這裡可以添加頁面跳轉邏輯
            console.log('導航到:', index);
        });
    });
    
    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim();
            if (query.length > 0) {
                console.log('搜索:', query);
                // 這裡可以添加搜索邏輯
            }
        });
    }
});