import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export function configurarFirebase(firebaseConfig) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // --- FUNÇÃO PARA SALVAR ---
    const materialForm = document.getElementById('formMaterial'); // Ajustado para o ID do seu form
    if (materialForm) {
        materialForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const titulo = materialForm.querySelector('input[type="text"]').value;
            const observacoes = materialForm.querySelector('textarea').value;

            try {
                await addDoc(collection(db, "apostilas"), {
                    titulo: titulo,
                    observacoes: observacoes,
                    dataCriacao: serverTimestamp()
                });
                alert("Material salvo!");
                materialForm.reset();
                document.getElementById('modalContainer').classList.remove('active');
            } catch (error) {
                console.error(error);
            }
        });
    }

    // --- FUNÇÃO PARA LISTAR ---
    const listaHtml = document.querySelector('.article-list');

    // Criamos uma consulta ordenada por data
    const q = query(collection(db, "apostilas"), orderBy("dataCriacao", "desc"));

    // onSnapshot atualiza a tela em tempo real sem precisar dar F5
    onSnapshot(q, (snapshot) => {
        listaHtml.innerHTML = ""; // Limpa a lista para não duplicar

        snapshot.forEach((doc) => {
            const dados = doc.data();
            const dataFormatada = dados.dataCriacao ? new Date(dados.dataCriacao.seconds * 1000).toLocaleDateString('pt-BR') : "Recente";

            // Montando o HTML exatamente como o seu modelo
            const itemHtml = `
                <div class="article-item" id="${doc.id}">
                    <div class="item-icon-circle">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <div class="item-info">
                        <span class="item-name">${dados.titulo}</span>
                        <span class="item-meta">${dados.observacoes.substring(0, 30)}... • ${dataFormatada}</span>
                    </div>
                    <div class="item-options">
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                </div>
            `;
            listaHtml.innerHTML += itemHtml;
        });
    });
}