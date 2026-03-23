// Módulo para manipulação da interface do usuário
const UI = {
    kanbanBoard: null,

    // Inicializar UI
    init(kanbanBoard) {
        this.kanbanBoard = kanbanBoard;
        this.setupEventListeners();
        this.loadTheme();
    },

    // Configurar event listeners
    setupEventListeners() {
        // Botões de adicionar tarefa
        document.querySelectorAll('.add-task-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const status = e.target.dataset.status;
                this.openTaskModal(null, status);
            });
        });

        // Modal de tarefa
        const modal = document.getElementById('task-modal');
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => this.closeTaskModal());

        // Formulário de tarefa
        const form = document.getElementById('task-form');
        form.addEventListener('submit', (e) => this.handleTaskSubmit(e));

        // Botão adicionar campo customizado
        document.getElementById('add-custom-field').addEventListener('click', () => {
            this.addCustomFieldInput();
        });

        // Botão adicionar comentário
        document.getElementById('add-comment').addEventListener('click', () => {
            this.handleAddComment();
        });

        // Modal de exclusão
        const deleteModal = document.getElementById('delete-modal');
        document.getElementById('confirm-delete').addEventListener('click', () => {
            const taskId = deleteModal.dataset.taskId;
            this.kanbanBoard.deleteTask(taskId);
            this.closeDeleteModal();
        });
        document.getElementById('cancel-delete').addEventListener('click', () => this.closeDeleteModal());

        // Busca e filtro
        const searchInput = document.getElementById('search');
        const filterSelect = document.getElementById('filter-priority');
        searchInput.addEventListener('input', () => {
            this.kanbanBoard.filterTasks(searchInput.value, filterSelect.value);
        });
        filterSelect.addEventListener('change', () => {
            this.kanbanBoard.filterTasks(searchInput.value, filterSelect.value);
        });

        // Toggle tema
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

        // Exportar
        document.getElementById('export-btn').addEventListener('click', () => Storage.export());

        // Importar
        document.getElementById('import-btn').addEventListener('click', () => {
            document.getElementById('import-input').click();
        });
        document.getElementById('import-input').addEventListener('change', (e) => this.handleImport(e));

        // No share button event (removed)

        // Delegação de eventos para botões dinâmicos
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-btn')) {
                const taskId = e.target.dataset.id;
                const task = this.kanbanBoard.tasks.find(t => t.id == taskId);
                if (task) {
                    this.openTaskModal(task);
                }
            } else if (e.target.classList.contains('delete-btn')) {
                const taskId = e.target.dataset.id;
                this.openDeleteModal(taskId);
            } else if (e.target.classList.contains('toggle-comments-btn')) {
                const taskId = e.target.dataset.taskId;
                this.toggleComments(taskId);
            } else if (e.target.classList.contains('add-comment-btn')) {
                const taskId = e.target.dataset.taskId;
                this.handleTaskComment(taskId, e.target.previousElementSibling.value);
            } else if (e.target.classList.contains('delete-comment-btn')) {
                const commentId = e.target.dataset.commentId;
                const taskId = e.target.dataset.taskId;
                const task = this.kanbanBoard.tasks.find(t => t.id == taskId);
                if (task) {
                    task.removeComment(commentId);
                    this.kanbanBoard.saveAndRender();
                    this.kanbanBoard.showNotification('Comentário removido!');
                }
            } else if (e.target.classList.contains('modal-delete-comment-btn')) {
                const commentId = e.target.dataset.commentId;
                const taskId = document.getElementById('task-form').dataset.taskId;
                const task = this.kanbanBoard.tasks.find(t => t.id == taskId);
                if (task) {
                    task.removeComment(commentId);
                    this.populateComments(task.comments);
                    this.kanbanBoard.saveAndRender();
                    this.kanbanBoard.showNotification('Comentário removido!');
                }
            }
        });
    },

    // Abrir modal de tarefa
    openTaskModal(task = null, status = 'todo') {
        const modal = document.getElementById('task-modal');
        const title = document.getElementById('modal-title');
        const form = document.getElementById('task-form');

        if (task) {
            title.textContent = 'Editar Tarefa';
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-description').value = task.description;
            document.getElementById('task-priority').value = task.priority;
            document.getElementById('task-tags').value = task.tags.join(', ');
            document.getElementById('task-assigned-to').value = task.assignedTo || '';
            form.dataset.taskId = task.id;
            this.populateCustomFields(task.customFields);
            this.populateComments(task.comments);
        } else {
            title.textContent = 'Nova Tarefa';
            form.reset();
            form.dataset.taskId = '';
            form.dataset.status = status;
            this.clearCustomFields();
            this.clearComments();
        }

        modal.style.display = 'block';
    },

    // Fechar modal de tarefa
    closeTaskModal() {
        document.getElementById('task-modal').style.display = 'none';
    },

    // Manipular submissão do formulário
    handleTaskSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const priority = document.getElementById('task-priority').value;
        const tags = document.getElementById('task-tags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
        const assignedTo = document.getElementById('task-assigned-to').value.trim() || null;
        const customFields = this.getCustomFields();

        const taskId = form.dataset.taskId;
        const status = form.dataset.status;

        if (taskId) {
            this.kanbanBoard.editTask(taskId, title, description, priority, tags, status, customFields, assignedTo);
        } else {
            this.kanbanBoard.addTask(title, description, priority, tags, status, customFields, assignedTo);
        }

        this.closeTaskModal();
    },

    // Abrir modal de exclusão
    openDeleteModal(taskId) {
        const modal = document.getElementById('delete-modal');
        modal.dataset.taskId = taskId;
        modal.style.display = 'block';
    },

    // Fechar modal de exclusão
    closeDeleteModal() {
        document.getElementById('delete-modal').style.display = 'none';
    },

    // Toggle tema
    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('steady-theme', isDark ? 'dark' : 'light');
        document.getElementById('theme-toggle').textContent = isDark ? '☀️' : '🌙';
    },

    // Carregar tema
    loadTheme() {
        const theme = localStorage.getItem('steady-theme') || 'light';
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            document.getElementById('theme-toggle').textContent = '☀️';
        } else {
            document.getElementById('theme-toggle').textContent = '🌙';
        }
    },

    // Manipular importação
    async handleImport(e) {
        const file = e.target.files[0];
        if (file) {
            try {
                const importedTasks = await Storage.import(file);
                this.kanbanBoard.tasks = [...this.kanbanBoard.tasks, ...importedTasks];
                this.kanbanBoard.saveAndRender();
                this.kanbanBoard.showNotification('Tarefas importadas com sucesso!');
            } catch (error) {
                this.kanbanBoard.showNotification('Erro ao importar tarefas.');
            }
        }
    },

    // Preencher campos customizados
    populateCustomFields(customFields) {
        const container = document.getElementById('custom-fields-list');
        container.innerHTML = '';
        Object.entries(customFields).forEach(([key, value]) => {
            this.addCustomFieldInput(key, value);
        });
    },

    // Limpar campos customizados
    clearCustomFields() {
        document.getElementById('custom-fields-list').innerHTML = '';
    },

    // Obter campos customizados
    getCustomFields() {
        const fields = {};
        const inputs = document.querySelectorAll('.custom-field-input');
        inputs.forEach(input => {
            const key = input.querySelector('input[type="text"]').value.trim();
            const value = input.querySelector('input[type="text"]:nth-child(2)').value.trim();
            if (key && value) {
                fields[key] = value;
            }
        });
        return fields;
    },

    // Adicionar input de campo customizado
    addCustomFieldInput(key = '', value = '') {
        const container = document.getElementById('custom-fields-list');
        const div = document.createElement('div');
        div.className = 'custom-field-input';
        div.innerHTML = `
            <input type="text" placeholder="Nome do campo (ex: Link, Email, Prazo)" value="${key}" maxlength="50">
            <input type="text" placeholder="Valor do campo (ex: https://..., email@..., 2024-12-31)" value="${value}" maxlength="200">
            <button type="button" class="remove-field" title="Remover campo">×</button>
        `;
        container.appendChild(div);

        // Event listener para remover
        div.querySelector('.remove-field').addEventListener('click', () => {
            div.remove();
        });

        // Auto-focus no primeiro input vazio
        const firstInput = div.querySelector('input:first-child');
        if (!key) {
            setTimeout(() => firstInput.focus(), 100);
        }
    },

    // Preencher comentários
    populateComments(comments) {
        const container = document.getElementById('comments-list');
        container.innerHTML = '';
        comments.forEach(comment => {
            this.addCommentElement(comment);
        });
    },

    // Limpar comentários
    clearComments() {
        document.getElementById('comments-list').innerHTML = '';
        document.getElementById('comment-text').value = '';
        document.getElementById('comment-author').value = '';
    },

    // Adicionar elemento de comentário
    addCommentElement(comment) {
        const container = document.getElementById('comments-list');
        const div = document.createElement('div');
        div.className = 'modal-comment';
        div.dataset.commentId = comment.id;
        div.innerHTML = `
            <div class="modal-comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${comment.createdAt.toLocaleString()}</span>
            </div>
            <div class="comment-text">${comment.text}</div>
            <div class="comment-actions">
                <button class="modal-delete-comment-btn" data-comment-id="${comment.id}">🗑️</button>
            </div>
        `;
        container.appendChild(div);

        // Event listener para deletar comentário
        div.querySelector('.modal-delete-comment-btn').addEventListener('click', (e) => {
            const commentId = e.target.dataset.commentId;
            this.handleDeleteComment(commentId);
        });
    },

    // Manipular adição de comentário
    handleAddComment() {
        const text = document.getElementById('comment-text').value.trim();
        const author = document.getElementById('comment-author').value.trim();
        const taskId = document.getElementById('task-form').dataset.taskId;

        if (!text || !author) {
            this.kanbanBoard.showNotification('Preencha o texto e o autor do comentário.');
            return;
        }

        if (!taskId) {
            this.kanbanBoard.showNotification('Salve a tarefa primeiro antes de adicionar comentários.');
            return;
        }

        const task = this.kanbanBoard.tasks.find(t => t.id == taskId);
        if (task) {
            task.addComment(text, author);
            this.addCommentElement(task.comments[task.comments.length - 1]);
            document.getElementById('comment-text').value = '';
            this.kanbanBoard.saveAndRender();
            this.kanbanBoard.showNotification('Comentário adicionado!');
        }
    },

    // Manipular exclusão de comentário
    handleDeleteComment(commentId) {
        const taskId = document.getElementById('task-form').dataset.taskId;
        const task = this.kanbanBoard.tasks.find(t => t.id == taskId);
        if (task) {
            task.removeComment(commentId);
            this.populateComments(task.comments); // Re-render no modal para evitar inconsistência visual
            this.kanbanBoard.saveAndRender();
            this.kanbanBoard.showNotification('Comentário removido!');
        }
    },

    // Toggle comentários na tarefa
    toggleComments(taskId) {
        const commentsList = document.getElementById(`comments-${taskId}`);
        const isVisible = commentsList.style.display !== 'none';
        commentsList.style.display = isVisible ? 'none' : 'block';
    },

    // Manipular comentário na tarefa
    handleTaskComment(taskId, text) {
        if (!text.trim()) {
            this.kanbanBoard.showNotification('Digite um comentário.');
            return;
        }

        const task = this.kanbanBoard.tasks.find(t => t.id == taskId);
        if (task) {
            task.addComment(text.trim(), 'Usuário');
            this.kanbanBoard.saveAndRender();
            this.kanbanBoard.showNotification('Comentário adicionado!');
        }
    },

    // Manipular exclusão de comentário na tarefa
};
