import Column from "./Column.js";

export default class Kanban {
	// relates to kanban at html gen by js
	constructor(root) {
		this.root = root;

        Kanban.columns().forEach(column => {
            const columnView = new Column(column.id, column.title);

            this.root.appendChild(columnView.elements.root);
        });
	}

	static columns() {
		return [
			{ id: 1, title: "Backlog" },
			{ id: 2, title: "Today" },
			{ id: 3, title: "Snag" },
			{ id: 4, title: "Done" }
		];
	}
}
