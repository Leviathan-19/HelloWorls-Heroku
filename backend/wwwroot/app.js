// URL base - misma del backend (funciona en local y producción)
const API_BASE = window.location.origin;
const API_URL = `${API_BASE}/api/links`;

// Cargar links al iniciar
document.addEventListener('DOMContentLoaded', loadLinks);

async function loadLinks() {
    try {
        const container = document.getElementById('linksContainer');
        container.innerHTML = '<p>Cargando...</p>';
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Error del servidor');
        }
        
        const links = await response.json();
        
        if (links.length === 0) {
            container.innerHTML = '<p>No hay links guardados aún.</p>';
            return;
        }
        
        container.innerHTML = '';
        
        links.forEach(link => {
            const linkElement = document.createElement('div');
            linkElement.className = 'link-item';
            linkElement.innerHTML = `
                <strong>#${link.id}</strong>: 
                <a href="${link.links}" target="_blank">${link.links}</a>
                <br><small>🕐 ${new Date(link.created_At).toLocaleString()}</small>
            `;
            container.appendChild(linkElement);
        });
    } catch (error) {
        console.error('Error loading links:', error);
        document.getElementById('linksContainer').innerHTML = 
            '<p>Error al cargar los links. Asegúrate de que el backend esté funcionando.</p>';
    }
}

async function addLink() {
    const linkInput = document.getElementById('linkInput');
    let url = linkInput.value.trim();
    
    if (!url) {
        alert('❌ Por favor ingresa un URL');
        return;
    }

    // Agregar https:// si no lo tiene
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
            await loadLinks(); // Recargar la lista
            alert('✅ Link agregado correctamente');
        } else {
            const error = await response.json();
            alert('❌ Error: ' + (error.message || 'No se pudo agregar el link'));
        }
    } catch (error) {
        console.error('Error adding link:', error);
        alert('❌ Error de conexión. Verifica que el backend esté funcionando.');
    }
}

// Permitir Enter para agregar
document.getElementById('linkInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addLink();
    }
});