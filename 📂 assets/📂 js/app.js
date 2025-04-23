// ============== إدارة الأعضاء ==============
function addMember(username, password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const newUser = {
        username,
        password,
        role: 'member'
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    renderTeam();
}

function deleteMember(username) {
    const users = JSON.parse(localStorage.getItem('users'))
                    .filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(users));
    renderTeam();
}

function renderTeam() {
    const teamList = document.getElementById('teamList');
    const users = JSON.parse(localStorage.getItem('users'))
                    .filter(user => user.role === 'member');
    
    teamList.innerHTML = users.map(user => `
        <div class="member-card">
            <div class="member-info">
                <span class="member-username">${user.username}</span>
                <span class="member-password">${user.password}</span>
            </div>
            <button onclick="deleteMember('${user.username}')">حذف</button>
        </div>
    `).join('');
}

// ============== الأحداث ==============
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    renderTeam();
    
    document.getElementById('addForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('memberUser').value;
        const password = document.getElementById('memberPass').value;
        
        if (username && password) {
            addMember(username, password);
            document.getElementById('addMemberModal').style.display = 'none';
        }
    });
});
