// Módulo para persistência de dados no localStorage
const Storage = {
    // Chave para armazenar as tarefas
    KEY: 'steady-tasks',

    // Salvar tarefas no localStorage
    save(tasks) {
        try {
            const data = tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                tags: task.tags,
                status: task.status,
                createdAt: task.createdAt.toISOString(),
                customFields: task.customFields,
                comments: task.comments.map(comment => ({
                    id: comment.id,
                    text: comment.text,
                    author: comment.author,
                    createdAt: comment.createdAt.toISOString()
                })),
                assignedTo: task.assignedTo
            }));
            localStorage.setItem(this.KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Erro ao salvar tarefas:', error);
        }
    },

    // Carregar tarefas do localStorage
    load() {
        try {
            const data = localStorage.getItem(this.KEY);
            if (data) {
                const parsed = JSON.parse(data);
                return parsed.map(item => new Task(
                    item.id,
                    item.title,
                    item.description,
                    item.priority,
                    item.tags,
                    item.status,
                    new Date(item.createdAt),
                    item.customFields || {},
                    (item.comments || []).map(comment => ({
                        id: comment.id,
                        text: comment.text,
                        author: comment.author,
                        createdAt: new Date(comment.createdAt)
                    })),
                    item.assignedTo
                ));
            }
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
        }
        return [];
    },

    // Exportar tarefas como JSON
    export() {
        const tasks = this.load();
        const dataStr = JSON.stringify(tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            tags: task.tags,
            status: task.status,
            createdAt: task.createdAt.toISOString(),
            customFields: task.customFields,
            comments: task.comments.map(comment => ({
                id: comment.id,
                text: comment.text,
                author: comment.author,
                createdAt: comment.createdAt.toISOString()
            })),
            assignedTo: task.assignedTo
        })), null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'steady-tasks.json';
        link.click();
        URL.revokeObjectURL(url);
    },

    // Importar tarefas de JSON
    import(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    const tasks = data.map(item => new Task(
                        item.id || Date.now() + Math.random(),
                        item.title,
                        item.description,
                        item.priority,
                        item.tags || [],
                        item.status,
                        new Date(item.createdAt),
                        item.customFields || {},
                        item.comments || [],
                        item.assignedTo || null
                    ));
                    resolve(tasks);
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    }
};