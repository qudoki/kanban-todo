import KanbanAPI from "./api/KanbanAPI.js";
import Kanban from "./view/Kanban.js";

// const data = [{"id":1,"items":[{"id":72714,"content":"Do laundry"}]},{"id":2,"items":[{"id":23044,"content":"Code project"}]},{"id":3,"items":[{"id":61584,"content":"Create art"}]}];

// KanbanAPI.deleteItem(450399);

new Kanban(
    document.querySelector(".kanban")
);