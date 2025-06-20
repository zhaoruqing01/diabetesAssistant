/**
 * 工作流API调用模块（带响应日志）
 * @param {Object} inputs - 工作流输入参数
 * @param {string} [user='default-user'] - 用户标识
 * @param {string} [responseMode='blocking'] - 响应模式
 * @returns {Promise<Object>} - API响应数据
 */
export async function runWorkflow(inputs = {}, user = 'abc-123', responseMode = 'blocking') {
    const apiUrl = 'http://172.16.26.20/v1/workflows/run';
    const apiKey = 'app-Eu4QCGpGJFC8gKw03O9vz97x';
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs, response_mode: responseMode, user })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API错误 ${response.status}: ${JSON.stringify(errorData)}`);
        }

        const responseData = await response.json();
        console.log('API响应:', responseData);
        
        // 核心修正：从 data.outputs.body 提取业务数据
        const body = responseData.data?.outputs?.body;
        if (typeof body === 'string') {
            return JSON.parse(body);
        } else if (typeof body === 'object') {
            return body;
        } else {
            throw new Error('无效的业务数据格式');
        }

    } catch (error) {
        console.error('工作流调用失败:', error);
        throw error;
    }
}

/**
 * 聊天接口調用
 * @param {Object} options - 聊天參數 { inputs, message, user, token, conversation_id }
 * @returns {Promise<Object>} - { conversation_id, answer }
 */
export async function chatWithDoctor({
    inputs = {},
    message = '',
    user = 'abc-123',
    token = 'app-5Z3WaXWTzNddx2RGJtOqsU3m',
    apiUrl = 'http://172.16.26.20',
    conversation_id = ''
} = {}) {
    let url = apiUrl.endsWith('/') ? `${apiUrl}v1/chat-messages` : `${apiUrl}/v1/chat-messages`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs,
                query: message,
                response_mode: 'streaming',
                conversation_id,
                user,
                files: [{
                    type: 'image',
                    transfer_method: 'remote_url',
                    url: 'https://cloud.dify.ai/logo/logo-site.png'
                }]
            })
        });
        if (!response.ok) {
            throw new Error(`API错误 ${response.status}`);
        }
        // 处理流式响应
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let answer = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const chunks = chunk.split('data: ');
            chunks.forEach((ck) => {
                try {
                    const data = JSON.parse(ck);
                    if (data.answer) answer += data.answer;
                } catch (error) {}
            });
        }
        return { conversation_id, answer };
    } catch (error) {
        console.error('聊天接口接口失败:', error);
        throw error;
    }
}

// 示例用法:
// runWorkflow({param1: 'value1'}, 'user123')
//   .then(data => console.log(data))
//   .catch(err => console.error(err));
    