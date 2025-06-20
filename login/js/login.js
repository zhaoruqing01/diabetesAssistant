        function switchForm(type) {
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            const buttons = document.querySelectorAll('button');
            if (type === 'login') {
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
                buttons[0].classList.add('border-primary', 'text-primary');
                buttons[0].classList.remove('border-gray-200', 'text-gray-400');
                buttons[1].classList.add('border-gray-200', 'text-gray-400');
                buttons[1].classList.remove('border-primary', 'text-primary');
            } else {
                loginForm.classList.add('hidden');
                registerForm.classList.remove('hidden');
                buttons[0].classList.add('border-gray-200', 'text-gray-400');
                buttons[0].classList.remove('border-primary', 'text-primary');
                buttons[1].classList.add('border-primary', 'text-primary');
                buttons[1].classList.remove('border-gray-200', 'text-gray-400');
            }
        }

        document.querySelectorAll('.fa-eye').forEach(eye => {
            eye.addEventListener('click', function() {
                const input = this.previousElementSibling;
                if (input.type === 'password') {
                    input.type = 'text';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                }
            });
        });