// Arquivo principal da aplicação - Limpo (sem compartilhamento)

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar o quadro Kanban
    const kanbanBoard = new KanbanBoard();

    // Inicializar a interface do usuário
    UI.init(kanbanBoard);

    // Configurar drag and drop após renderização inicial
    kanbanBoard.setupDragAndDrop();
});
