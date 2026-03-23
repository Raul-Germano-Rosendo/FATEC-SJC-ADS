// Estatísticas avançadas para Kanban Steady
const Stats = {
    update() {
        const kb = UI.kanbanBoard;
        if (!kb) return;

        const total = kb.tasks.length;
        const todo = kb.tasks.filter(t => t.status === 'todo').length;
        const progress = kb.tasks.filter(t => t.status === 'in-progress').length;
        const done = kb.tasks.filter(t => t.status === 'done').length;

        // Stats container (assume added to HTML)
        const container = document.getElementById('stats-container') || createStatsContainer();
        
        // Completion %
        const completion = total > 0 ? Math.round((done / total) * 100) : 0;
        
        // Priorities
        const high = kb.tasks.filter(t => t.priority === 'high').length;
        const medium = kb.tasks.filter(t => t.priority === 'medium').length;
        const low = kb.tasks.filter(t => t.priority === 'low').length;
        
        // Overdue (if custom date field)
        const overdue = kb.tasks.filter(t => {
            const dateField = Object.values(t.customFields).find(v => v.match(/\\d{4}-\\d{2}-\\d{2}/));
            return dateField && new Date(dateField) < new Date() && t.status !== 'done';
        }).length;

        container.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>${total}</h3>
                    <p>Total Tarefas</p>
                </div>
                <div class="stat-card">
                    <h3>${completion}%</h3>
                    <p>Concluídas</p>
                </div>
                <div class="stat-card">
                    <h3>${high}</h3>
                    <p>Alta Prioridade</p>
                </div>
                <div class="stat-card">
                    <h3>${overdue}</h3>
                    <p>Atrasadas</p>
                </div>
            </div>
            <div class="progress-bars">
                <div class="progress-group">
                    <label>A Fazer: ${todo}</label>
                    <div class="progress-bar"><div class="progress-fill" style="width: ${total > 0 ? (todo/total*100) : 0}%"></div></div>
                </div>
                <div class="progress-group">
                    <label>Em Progresso: ${progress}</label>
                    <div class="progress-bar"><div class="progress-fill" style="width: ${total > 0 ? (progress/total*100) : 0}%"></div></div>
                </div>
                <div class="progress-group">
                    <label>Concluído: ${done}</label>
                    <div class="progress-bar"><div class="progress-fill success" style="width: ${total > 0 ? (done/total*100) : 0}%"></div></div>
                </div>
            </div>
        `;
    }
};

function createStatsContainer() {
    const main = document.querySelector('main');
    const statsDiv = document.createElement('div');
    statsDiv.id = 'stats-container';
    statsDiv.className = 'stats-panel';
    main.insertBefore(statsDiv, main.firstChild);
    return statsDiv;
}

// Auto-update on changes
const originalSave = KanbanBoard.prototype.saveAndRender;
KanbanBoard.prototype.saveAndRender = function() {
    originalSave.call(this);
    Stats.update();
};

Stats.update(); // Initial
