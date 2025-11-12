const API_BASE = window.location.origin;
const API_URL = `${API_BASE}/api/links`;

document.addEventListener('DOMContentLoaded', loadLinks);

async function loadLinks() {
    try {
        const container = document.getElementById('linksContainer');
        container.innerHTML = '<p>Loading...</p>';
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Server error');
        }
        
        const links = await response.json();
        
        if (links.length === 0) {
            container.innerHTML = '<p>Dont exist links .</p>';
            return;
        }
        
        container.innerHTML = '';
        
        links.forEach(link => {
            const linkElement = document.createElement('div');
            linkElement.className = 'link-item';
            linkElement.innerHTML = `
                <strong>#${link.id}</strong>: 
                <a href="${link.links}" target="_blank">${link.links}</a>
                <br><small> ${new Date(link.created_At).toLocaleString()}</small>
            `;
            container.appendChild(linkElement);
        });
    } catch (error) {
        console.error('Error loading links:', error);
        document.getElementById('linksContainer').innerHTML = 
            '<p>Error from loadings links.</p>';
    }
}

async function addLink() {
    const linkInput = document.getElementById('linkInput');
    let url = linkInput.value.trim();
    
    if (!url) {
        alert('Please insert URL');
        return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                links: url
            })
        });

        if (response.ok) {
            linkInput.value = '';
            await loadLinks();
            alert('Link load correctly');
        } else {
            const error = await response.json();
            alert(' Error: ' + (error.message || 'Dont can add link'));
        }
    } catch (error) {
        console.error('Error adding link:', error);
        alert('Coneccition error.');
    }
}

document.getElementById('linkInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addLink();
    }
});