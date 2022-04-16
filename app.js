async function createAccount(account) {
    try {
        const response = await fetch('//localhost:5000/api/accounts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: account
        });
        return await response.json();
    } catch (error) {
        return { error: error.message || 'Unknown error' };
    }
}

async function register() {
    const registerForm = document.getElementById('registerForm');
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);
    const result = await createAccount(jsonData);

    if (result.error) {
        console.log('error')
    }

    console.log('Account created!', result);
}

async function getAccount(user) {

    try {
        const response = await fetch('//localhost:5000/api/accounts/'+user, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        return await response.json();
      } catch (error) {
        return { error: error.message || 'Unknown error' };
      }
}

async function login() {

    const loginForm = document.getElementById('loginForm')
    const user = loginForm.user.value;
    const data = await getAccount(user);

    if (data.error) {
       console.log(data.error);
    }

    console.log(data);
}