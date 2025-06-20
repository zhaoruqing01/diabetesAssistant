// 添加API模块导入
import { runWorkflow, chatWithDoctor } from '../../js/api.js';

// 获取DOM元素
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const charCount = document.getElementById('charCount');
const chatContainer = document.getElementById('chatContainer');

// 聊天狀態
let conversationId = '';
const userId = localStorage.getItem('userId') || 'abc-123';
const chatToken = 'app-5Z3WaXWTzNddx2RGJtOqsU3m';
const chatApiUrl = 'http://172.16.26.20';
let chatInputs = {};

// 可根據實際情況設置 chatInputs，例如從 localStorage 或其他地方獲取
try {
    const paramStr = localStorage.getItem('chatInputs');
    if (paramStr) chatInputs = JSON.parse(paramStr);
} catch (e) {}

// 页面加载时获取医生信息
window.addEventListener('load', async () => {
    const doctorId = localStorage.getItem('selectedDoctorId');
    if (doctorId) {
        try {
            console.log('正在获取医生ID:', doctorId); // 调试日志
            const response = await runWorkflow({
                action: 'get_doctor_detail',
                intention: '获取医生详情',
                params: { doctor_id: doctorId }
            });

            console.log('API响应:', response); // 调试日志

            if (!response || !response.result) {
                throw new Error('API返回数据格式不正确');
            }

            const doctor = response.result[0]; // 假设 API 返回的是一个数组，取第一个元素作为医生信息

            // 更新医生信息
            const doctorAvatar = document.getElementById('doctorAvatar');
            const doctorName = document.getElementById('doctorName');

            if (!doctorAvatar || !doctorName) {
                throw new Error('未找到医生信息展示元素');
            }

            doctorAvatar.src = doctor.image_url || 'https://picsum.photos/id/64/40/40';
            doctorName.textContent = doctor.doctor_name || '医生';

            // 更新聊天中的医生头像
            document.querySelectorAll('.chat-container img[alt="医生头像"]').forEach(img => {
                img.src = doctor.image_url || 'https://picsum.photos/id/64/40/40';
            });

            // 添加医生介绍信息
            const doctorIntroduction = document.createElement('div');
            doctorIntroduction.className = 'mt-2 text-sm text-neutral-500';
            doctorIntroduction.innerHTML = `<strong>${doctor.title}</strong><br>${doctor.introduction}`;
            document.querySelector('#doctorName').parentNode.appendChild(doctorIntroduction);

        } catch (error) {
            console.error('获取医生信息失败:', error);
            // 添加UI提示
            alert('获取医生信息失败，请稍后再试');
            // 设置默认医生信息
            document.getElementById('doctorAvatar').src = 'https://picsum.photos/id/64/40/40';
            document.getElementById('doctorName').textContent = '医生';
        }
    } else {
        console.error('未找到医生ID');
        alert('未选择医生，请返回主页选择医生');
    }
    scrollToBottom();
    // 返回上一頁功能
    const backBtn = document.querySelector('header button i.fa-arrow-left');
    if (backBtn) {
        backBtn.parentElement.addEventListener('click', function() {
            history.back();
        });
    }
});

// 输入框字数统计
messageInput.addEventListener('input', function() {
    const count = this.value.length;
    charCount.textContent = `${count}/500`;
    
    // 启用/禁用发送按钮
    if (count > 0) {
        sendButton.disabled = false;
    } else {
        sendButton.disabled = true;
    }
    
    // 自动调整输入框高度
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
    
    // 限制最大高度
    if (this.scrollHeight > 80) {
        this.style.height = '80px';
    }
});

// 发送消息
sendButton.addEventListener('click', sendMessage);

// 按Enter键发送消息（阻止换行）
messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 发送消息函数
async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    // 创建患者消息元素
    const myMessage = document.createElement('div');
    myMessage.className = 'flex flex-row-reverse message-appear';
    myMessage.innerHTML = `
        <div class="mr-3 max-w-[75%]">
            <div class="bg-primary text-white rounded-lg rounded-tr-none shadow-chat p-3">
                <p class="text-sm leading-relaxed">${message}</p>
            </div>
            <div class="text-xs text-neutral-400 mt-1 text-right">${formatTime()}</div>
        </div>
        <img src="https://picsum.photos/id/65/40/40" alt="患者头像" class="w-10 h-10 rounded-full object-cover">
    `;
    
    chatContainer.appendChild(myMessage);
    
    // 清空输入框
    messageInput.value = '';
    charCount.textContent = '0/500';
    sendButton.disabled = true;
    messageInput.style.height = 'auto';
    
    // 滚动到底部
    scrollToBottom();
    
    // 顯示醫生輸入中動畫
    const typingDiv = document.createElement('div');
    typingDiv.className = 'flex message-appear';
    typingDiv.innerHTML = `
        <img src="https://picsum.photos/id/64/40/40" alt="医生头像" class="w-10 h-10 rounded-full object-cover">
        <div class="ml-3 max-w-[75%]">
            <div class="bg-white rounded-lg rounded-tl-none shadow-chat p-3">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    `;
    chatContainer.appendChild(typingDiv);
    scrollToBottom();
    
    // 調用聊天接口
    try {
        const res = await chatWithDoctor({
            inputs: chatInputs,
            message,
            user: userId,
            token: chatToken,
            apiUrl: chatApiUrl,
            conversation_id: conversationId
        });
        conversationId = res.conversation_id || conversationId;
        
        // 移除輸入中動畫
        chatContainer.removeChild(typingDiv);
        
        // 顯示醫生回覆加載動畫（新增）
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'flex message-appear';
        loadingDiv.innerHTML = `
            <img src="https://picsum.photos/id/64/40/40" alt="医生头像" class="w-10 h-10 rounded-full object-cover">
            <div class="ml-3 max-w-[75%]">
                <div class="bg-white rounded-lg rounded-tl-none shadow-chat p-3">
                    <div class="typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        `;
        chatContainer.appendChild(loadingDiv);
        scrollToBottom();
        
        // 模擬加載過程（實際可根據接口響應時間調整）
        setTimeout(() => {
            // 移除加載動畫，顯示實際回覆
            chatContainer.removeChild(loadingDiv);
            const doctorReply = document.createElement('div');
            doctorReply.className = 'flex message-appear';
            doctorReply.innerHTML = `
                <img src="https://picsum.photos/id/64/40/40" alt="医生头像" class="w-10 h-10 rounded-full object-cover">
                <div class="ml-3 max-w-[75%]">
                    <div class="bg-white rounded-lg rounded-tl-none shadow-chat p-3">
                        <p class="text-sm leading-relaxed">${res.answer || '暫無回覆'}</p>
                    </div>
                    <div class="text-xs text-neutral-400 mt-1">${formatTime()}</div>
                </div>
            `;
            chatContainer.appendChild(doctorReply);
            scrollToBottom();
        }, 800); // 加載動畫持續時間（可根據實際需求調整）

    } catch (error) {
        chatContainer.removeChild(typingDiv);
        const errorReply = document.createElement('div');
        errorReply.className = 'flex message-appear';
        errorReply.innerHTML = `
            <img src="https://picsum.photos/id/64/40/40" alt="医生头像" class="w-10 h-10 rounded-full object-cover">
            <div class="ml-3 max-w-[75%]">
                <div class="bg-white rounded-lg rounded-tl-none shadow-chat p-3">
                    <p class="text-sm leading-relaxed text-red-500">医生回复失败,请稍后重试。</p>
                </div>
                <div class="text-xs text-neutral-400 mt-1">${formatTime()}</div>
            </div>
        `;
        chatContainer.appendChild(errorReply);
        scrollToBottom();
    }
}

// 滚动到聊天底部
function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 格式化时间
function formatTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// 页面加载完成后滚动到底部
window.addEventListener('load', scrollToBottom);

// 顶部导航栏滚动效果
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 10) {
        header.classList.add('shadow-md');
        header.classList.remove('shadow-sm');
    } else {
        header.classList.remove('shadow-md');
        header.classList.add('shadow-sm');
    }
    
    lastScrollTop = scrollTop;
});

// 获取清除按钮元素
const clearChatBtn = document.getElementById('clearChatBtn');

// 添加清除聊天记录事件监听
clearChatBtn.addEventListener('click', clearChatHistory);

/**
 * 清空聊天记录
 */
async function clearChatHistory() {
    const result = await Swal.fire({
        title: '确定要清空聊天记录吗？',
        text: "这将删除当前所有聊天内容",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    });

    if (result.isConfirmed) {
        // 清空聊天容器
        chatContainer.innerHTML = '';
        
        // 清空会话ID
        conversationId = '';
        
        // 显示成功提示
        Swal.fire(
            '已清空',
            '聊天记录已清空',
            'success'
        );
    }
}
