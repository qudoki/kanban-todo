import Dropzone from "./Dropzone.js";
import KanbanAPI from "../api/KanbanAPI.js";
import Kanban from "./Kanban.js";

export default class Item {
	constructor(id, content) {
		const bottomDropzone = Dropzone.createDropzone();

		this.elements = {};
		this.elements.root = Item.createRoot();
		this.elements.input = this.elements.root.querySelector(
			".kanban__item-input"
		);

		this.elements.root.dataset.id = id;
		this.elements.input.textContent = content;
		this.content = content;

		this.elements.root.appendChild(bottomDropzone);

		const onBlur = () => {
			const newContent = this.elements.input.textContent.trim();

			if (newContent == this.content) {
				return;
			}
			this.content = newContent;
			KanbanAPI.updateItem(id, {
				content: this.content,
			});
		};
		this.elements.input.addEventListener("blur", onBlur);
		this.elements.root.addEventListener("dblclick", () => {
			const check = confirm("Are you sure you want to delete this item?");
			if (check) {
				KanbanAPI.deleteItem(id);
				this.elements.input.removeEventListener("blur", onBlur);
				this.elements.root.parentElement.removeChild(this.elements.root);
			}
		});

		this.elements.root.addEventListener("dragstart", (e) => {
			e.dataTransfer.setData("text/plain", id);
		});
		this.elements.input.addEventListener("drop", (e) => {
			// Prevents default - dragging text into other item
			e.preventDefault();
		});
	}
	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
            <div class="kanban__item" draggable="true">
            <div class="kanban__item-input" contenteditable></div>
                <div class="category__div">
                    <button id="cat__mebic" class="item__category" type="button">Mebic</button>
                    <button id="cat__home" class="item__category type="button"">Home</button>
                    <button id="cat__delhi" class="item__category type="button"">Delhi</button>
                    <button id="cat__work" class="item__category type="button"">Work</button>
                    <button id="cat__misc" class="item__category type="button"">Misc</button>
                </div>
            </div>
            `).children[0];
	}
}
// TODO: sorting by priority and categorize with color, how to deal with timescale?
// <div class="priority">Priority: 1</div>
