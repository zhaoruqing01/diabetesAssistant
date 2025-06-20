// home.js（假设为页面逻辑文件，需与 api.js 路径对应，如 '../../js/api.js'）
import { runWorkflow } from '../../js/api.js';

// 渲染医生列表
function renderDoctors(doctors) {
    const container = document.getElementById('doctors-container');
    container.innerHTML = doctors.map(doctor => `
        <div class="doctor-card bg-white p-3 rounded-lg shadow-sm text-center">
            <img src="${doctor.image_url}" class="w-20 h-20 rounded-full mx-auto mb-2" alt="医生头像">
            <h3 class="font-medium text-sm">${doctor.doctor_name}</h3>
            <p class="text-xs text-gray-500 my-1">${doctor.department}</p>
            <p class="text-xs text-gray-400 mb-2">${doctor.title}</p>
            <button class="bg-primary text-white text-xs px-3 py-1 rounded-button w-full" data-doctor-id="${doctor.id}">立即咨询</button>
        </div>
    `).join('');

    // 添加医生卡片点击事件
    document.querySelectorAll('.doctor-card button').forEach(button => {
        button.addEventListener('click', () => {
            const doctorId = button.getAttribute('data-doctor-id');
            localStorage.setItem('selectedDoctorId', doctorId);
            window.location.href = '../chat/chat.html';
        });
    });
}

// 渲染文章列表
function renderArticles(articles) {
    const container = document.getElementById('articles-container');
    container.innerHTML = articles.map(article => `
        <a href="./diabetes.html">
                <div class="flex bg-white rounded-lg shadow-sm overflow-hidden">
            <img src="https://ai-public.mastergo.com/ai/img_res/4e9c5a73935b37686267266cd2f35a2f.jpg" class="w-[120px] h-[90px] object-cover" alt="科普图片">
            <div class="flex-1 p-3">
                <h3 class="font-medium text-sm">${article.title}</h3>
                <p class="text-xs text-gray-500 line-clamp-2 mt-1">${article.content}</p>
                <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center">
                        <i class="far fa-eye text-gray-400 text-xs"></i>
                        <span class="text-xs text-gray-400 ml-1">${article.views}</span>
                    </div>
                    <div class="text-xs text-gray-400">${article.author}</div>
                </div>
            </div>
        </div>
        </a>

    `).join('');
}

// 渲染糖尿病类型
function renderDiabetesTypes(types) {
    const container = document.getElementById('diabetes-types-container');
    container.innerHTML = types.map(type => `
        <a href="./article.html">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                <img src="${type.img}" class="w-full h-[120px] object-cover" alt="${type.type_name}">
                <div class="p-3">
                    <h3 class="font-medium text-sm">${type.type_name}</h3>
                    <p class="text-xs text-gray-500 mt-1 line-clamp-2">${type.pathogenesis}</p>
                </div>
            </div>
        </a>
    `).join('');
}

// 初始化数据（核心：调用 API 并解析 result）
async function initData() {
    try {
        // 1. 获取医生数据
        const doctorsResp = await runWorkflow({
            action: 'get_doctors',
            intention: '获取医生列表'
        });
        const doctors = doctorsResp.result; // 业务数据在 result 字段中
        if (Array.isArray(doctors)) {
            renderDoctors(doctors);
        } else {
            console.error('医生数据格式异常：', doctorsResp);
        }

        // 2. 获取文章数据
        const articlesResp = await runWorkflow({
            action: 'get_articles',
            intention: '获取科普文章列表'
        });
        const articles = articlesResp.result;
        if (Array.isArray(articles)) {
            renderArticles(articles);
        } else {
            console.error('文章数据格式异常：', articlesResp);
        }

        // 3. 获取糖尿病类型数据
        const typesResp = await runWorkflow({
            action: 'get_diabetes_types',
            intention: '获取糖尿病类型信息'
        });
        const types = typesResp.result;
        if (Array.isArray(types)) {
            renderDiabetesTypes(types);
        } else {
            console.error('糖尿病类型数据格式异常：', typesResp);
        }

    } catch (error) {
        console.error('初始化数据失败：', error);
        // 可选：添加 UI 提示（如 Swal.fire 或 Toast）
    }
}

// 页面加载后执行初始化
document.addEventListener('DOMContentLoaded', initData);