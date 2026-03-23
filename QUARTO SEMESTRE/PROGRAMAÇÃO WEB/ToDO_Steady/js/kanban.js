// Classe para gerenciar o quadro Kanban
class KanbanBoard {
    constructor() {
        this.tasks = Storage.load();
        this.filteredTasks = [...this.tasks];
        this.currentFilter = { search: '', priority: '' };
        this.init();
    }

    // Inicializar o quadro
    init() {
        this.render();
        this.setupDragAndDrop();
        this.updateCounters();
    }

    // Adicionar tarefa
    addTask(title, description, priority, tags, status = 'todo', customFields = {}, assignedTo = null) {
        const id = Date.now() + Math.random();
        const task = new Task(id, title, description, priority, tags, status, new Date(), customFields, [], assignedTo);
        this.tasks.push(task);
        this.saveAndRender();
        this.showNotification('Tarefa criada com sucesso!');
    }

    // Editar tarefa
    editTask(id, title, description, priority, tags, status, customFields, assignedTo) {
        const task = this.tasks.find(t => t.id == id);
        if (task) {
            task.update(title, description, priority, tags, customFields, assignedTo);
            this.saveAndRender();
            this.showNotification('Tarefa atualizada!');
        }
    }

    // Excluir tarefa
    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id != id);
        this.saveAndRender();
        this.showNotification('Tarefa excluída!');
    }

    // Mover tarefa
    moveTask(id, newStatus) {
        const task = this.tasks.find(t => t.id == id);
        if (task) {
            task.moveTo(newStatus);
            this.saveAndRender();
        }
    }

    // Filtrar tarefas
    filterTasks(search = '', priority = '') {
        this.currentFilter = { search, priority };
        this.filteredTasks = this.tasks.filter(task => {
            const matchesSearch = search === '' ||
                task.title.toLowerCase().includes(search.toLowerCase()) ||
                task.description.toLowerCase().includes(search.toLowerCase()) ||
                task.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
            const matchesPriority = priority === '' || task.priority === priority;
            return matchesSearch && matchesPriority;
        });
        this.render();
    }

    // Renderizar o quadro
    render() {
        const columns = ['todo', 'in-progress', 'done'];
        columns.forEach(status => {
            const list = document.getElementById(`${status}-list`);
            const filteredTasks = this.filteredTasks.filter(task => task.status === status);
            list.innerHTML = filteredTasks.map(task => task.toHTML()).join('');
        });
        this.updateCounters();
    }

    // Atualizar contadores
    updateCounters() {
        const columns = ['todo', 'in-progress', 'done'];
        columns.forEach(status => {
            const count = this.filteredTasks.filter(task => task.status === status).length;
            document.getElementById(`${status}-counter`).textContent = count;
        });
    }

    // Configurar drag and drop com SortableJS
    setupDragAndDrop() {
        const columns = ['todo', 'in-progress', 'done'];
        columns.forEach(status => {
            const list = document.getElementById(`${status}-list`);
            new Sortable(list, {
                group: 'kanban',
                animation: 150,
                ghostClass: 'sortable-ghost',
                chosenClass: 'sortable-chosen',
                dragClass: 'sortable-drag',
                onEnd: (evt) => {
                    const taskId = evt.item.dataset.id;
                    const newStatus = evt.to.closest('.column').dataset.status;
                    this.moveTask(taskId, newStatus);
                }
            });
        });
    }

    // Salvar e renderizar + trigger stats
    saveAndRender() {
        Storage.save(this.tasks);
        this.filterTasks(this.currentFilter.search, this.currentFilter.priority);
        if (typeof Stats !== 'undefined') Stats.update();
    }

    // Mostrar notificação
    showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}