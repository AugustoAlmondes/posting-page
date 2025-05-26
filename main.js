document.addEventListener('DOMContentLoaded', function() {
    
    const postForm = document.querySelector('#postForm');
    const tituloInput = document.querySelector('#titulo');
    const conteudoInput = document.querySelector('#conteudo');
    
    
    const tituloRenderizado = document.querySelector('#renderizador-titulo');
    const conteudoRenderizado = document.querySelector('#renderizador-conteudo');
    const postInfo = document.querySelector('#post-info');
    
    
    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const data = {
            title: tituloInput.value,
            body: conteudoInput.value,
            userId: 1
        };
        
        
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        };
        
        
        fetch('https://jsonplaceholder.typicode.com/posts', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                return response.json();
            })
            .then(json => {
                
                tituloRenderizado.textContent = json.title;
                conteudoRenderizado.textContent = json.body;
                
                
                postInfo.innerHTML = `
                    <p>Post ID: ${json.id}</p>
                    <p>User ID: ${json.userId}</p>
                    <p>Postado em: ${new Date().toLocaleString()}</p>
                `;
                
                
                tituloInput.value = '';
                conteudoInput.value = '';
                
                
                // alert('Post criado com sucesso!');
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao criar o post. Por favor, tente novamente.');
            });
    });
});