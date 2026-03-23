// Classe para representar uma tarefa
class Task {
    constructor(id, title, description, priority, tags = [], status = 'todo', createdAt = new Date(), customFields = {}, comments = [], assignedTo = null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority; // 'low', 'medium', 'high'
        this.tags = tags; // array de strings
        this.status = status; // 'todo', 'in-progress', 'done'
        this.createdAt = createdAt;
        this.customFields = customFields; // objeto com campos customizados {fieldName: value}
        this.comments = comments; // array de comentários
        this.assignedTo = assignedTo; // responsável pela tarefa
    }

    // Método para atualizar a tarefa
    update(title, description, priority, tags, customFields, assignedTo) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.tags = tags;
        this.customFields = customFields;
        this.assignedTo = assignedTo;
    }

    // Método para adicionar comentário
    addComment(text, author = 'Usuário') {
        const comment = {
            id: Date.now() + Math.random(),
            text: text,
            author: author,
            createdAt: new Date()
        };
        this.comments.push(comment);
        return comment;
    }

    // Método para remover comentário
    removeComment(commentId) {
        this.comments = this.comments.filter(c => c.id !== commentId);
    }

    // Método para mover para outro status
    moveTo(status) {
        this.status = status;
    }

    // Método para obter representação HTML
    toHTML() {
        const priorityClass = `priority-${this.priority}`;
        const tagsHTML = this.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        const dateStr = this.createdAt.toLocaleDateString('pt-BR');

        const customFieldsHTML = Object.entries(this.customFields)
            .map(([key, value]) => {
                if (key.toLowerCase().includes('email') || value.includes('@')) {
                    return `<div class="custom-field"><strong>${key}:</strong> <a href="mailto:${value}">${value}</a></div>`;
                } else if (key.toLowerCase().includes('link') || value.startsWith('http')) {
                    return `<div class="custom-field"><strong>${key}:</strong> <a href="${value}" target="_blank">${value}</a></div>`;
                } else {
                    return `<div class="custom-field"><strong>${key}:</strong> ${value}</div>`;
                }
            })
            .join('');

        const assignedHTML = this.assignedTo ? `<div class="assigned-to"><strong>Responsável:</strong> ${this.assignedTo}</div>` : '';

        const commentsHTML = this.comments.length > 0 ?
            `<div class="task-comments">
                <div class="comments-header">
                    <span>💬 ${this.comments.length} comentário${this.comments.length > 1 ? 's' : ''}</span>
                    <button class="toggle-comments-btn" data-task-id="${this.id}">👁️</button>
                </div>
                <div class="comments-list" id="comments-${this.id}" style="display: none;">
                    ${this.comments.map(comment => `
                        <div class="task-comment" data-comment-id="${comment.id}">
                            <div class="task-comment-header">
                                <strong>${comment.author}</strong>
                                <span class="task-comment-date">${comment.createdAt.toLocaleDateString('pt-BR')} ${comment.createdAt.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}</span>
                                <button class="delete-comment-btn" data-comment-id="${comment.id}" data-task-id="${this.id}">×</button>
                            </div>
                            <div class="task-comment-text">${comment.text}</div>
                        </div>
                    `).join('')}
                    <div class="add-comment">
                        <input type="text" placeholder="Adicionar comentário..." class="comment-input" data-task-id="${this.id}">
                        <button class="add-comment-btn" data-task-id="${this.id}">💬</button>
                    </div>
                </div>
            </div>` : `<div class="add-comment-standalone">
                <input type="text" placeholder="Adicionar comentário..." class="comment-input" data-task-id="${this.id}">
                <button class="add-comment-btn" data-task-id="${this.id}">💬</button>
            </div>`;

        return `
            <div class="task" data-id="${this.id}">
                <div class="task-title">${this.title}</div>
                <div class="task-description">${this.description}</div>
                <div class="task-meta">
                    <span class="task-priority ${priorityClass}">${this.priority}</span>
                    <span>${dateStr}</span>
                </div>
                <div class="task-tags">${tagsHTML}</div>
                ${assignedHTML}
                <div class="task-custom-fields">${customFieldsHTML}</div>
                ${commentsHTML}
                <div class="task-actions">
                    <button class="edit-btn" data-id="${this.id}">Editar</button>
                    <button class="delete-btn" data-id="${this.id}">Excluir</button>
                </div>
            </div>
        `;
    }
}