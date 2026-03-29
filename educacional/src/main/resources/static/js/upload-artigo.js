import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export function configurarArtigos(firebaseConfig) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const form = document.getElementById('formulario');
    const listaHtml = document.querySelector('.article-list');

    // --- ESCUTAR ARTIGOS EM TEMPO REAL ---
    const q = query(collection(db, "artigos"), orderBy("dataCriacao", "desc"));

    onSnapshot(q, (snapshot) => {
        listaHtml.innerHTML = "";
        snapshot.forEach((doc) => {
            const dados = doc.data();
            const dataPostagem = dados.dataCriacao ? new Date(dados.dataCriacao.seconds * 1000).toLocaleDateString('pt-BR') : "Agora";

            listaHtml.innerHTML += `
                <div class="article-item" id="${doc.id}">
                    <div class="item-icon-circle">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="item-info">
                        <span class="item-name">${dados.titulo}</span>
                        <span class="item-meta">${dados.comentario || 'Sem descrição'} • ${dataPostagem}</span>
                    </div>
                    <div class="item-options">
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                </div>
            `;
        });
    });

    // --- SALVAR NOVO ARTIGO ---
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const titulo = form.querySelector('input[type="text"]').value;
            const comentario = form.querySelector('textarea').value;

            try {
                await addDoc(collection(db, "artigos"), {
                    titulo: titulo,
                    comentario: comentario,
                    dataCriacao: serverTimestamp()
                });

                alert("Artigo postado!");
                form.reset();
                document.getElementById('modalContainer').classList.remove('active');
            } catch (error) {
                console.error("Erro ao postar artigo:", error);
            }
        });
    }
}