const usernameInput = document.getElementById('username');
const searchBtn = document.getElementById('searchBtn');
const profileCard = document.getElementById('profile');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('error');

async function searchUser() {
    const username = usernameInput.value.trim();
    if (!username) return;

    // Reset UI
    profileCard.classList.add('hidden');
    errorMsg.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (response.status === 404) {
            errorMsg.classList.remove('hidden');
            return;
        }

        const data = await response.json();
        
        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('name').textContent = data.name || data.login;
        document.getElementById('bio').textContent = data.bio || 'No bio available';
        document.getElementById('repos').textContent = data.public_repos;
        document.getElementById('link').href = data.html_url;

        profileCard.classList.remove('hidden');
    } catch (err) {
        alert('Terjadi kesalahan koneksi');
    } finally {
        loading.classList.add('hidden');
    }
}

searchBtn.addEventListener('click', searchUser);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchUser();
});
