function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser && window.location.pathname.endsWith('team.html')) {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// إدارة الفريق
let team = JSON.parse(localStorage.getItem('team')) || [];

function addMember(name, email, role) {
    const newMember = {
        id: Date.now(),
        name,
        email,
        role
    };
    team.push(newMember);
    localStorage.setItem('team', JSON.stringify(team));
    renderTeam();
}

function deleteMember(id) {
    team = team.filter(member => member.id !== id);
    localStorage.setItem('team', JSON.stringify(team));
    renderTeam();
}

function renderTeam() {
    const teamContainer = document.getElementById('teamList');
    teamContainer.innerHTML = team.map(member => `
        <div class="member-card">
            <h3>${member.name}</h3>
            <p>${member.email}</p>
            <p>الدور: ${member.role}</p>
            <button onclick="deleteMember(${member.id})">حذف</button>
        </div>
    `).join('');
}

// الأحداث
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    renderTeam();
    
    document.getElementById('addForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addMember(
            document.getElementById('memberName').value,
            document.getElementById('memberEmail').value,
            document.getElementById('memberRole').value
        );
        document.getElementById('addMemberModal').style.display = 'none';
    });

    document.getElementById('logoutBtn').addEventListener('click', logout);
});

function showAddForm() {
    document.getElementById('addMemberModal').style.display = 'flex';
}
