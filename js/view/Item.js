import Dropzone from "./Dropzone.js";
import KanbanAPI from "../api/KanbanAPI.js";
import Kanban from "./Kanban.js";

export default class Item {
	constructor(id, content, category) {
		const bottomDropzone = Dropzone.createDropzone();

		this.elements = {};
		this.elements.root = Item.createRoot();
		this.elements.input = this.elements.root.querySelector(
			".kanban__item-input"
		);

		this.elements.root.dataset.id = id;
		this.elements.input.textContent = content;
		this.content = content;
        this.elements.root.dataset.category = category;

        console.log(this.elements.root.dataset);

		this.elements.root.appendChild(bottomDropzone);

        // Handle tags
        const tagClickMebic = this.elements.root.querySelector(
			"#cat__mebic"
		);
        const tagClickHome = this.elements.root.querySelector(
			"#cat__home"
		);
        const tagClickDelhi = this.elements.root.querySelector(
			"#cat__delhi"
		);
        const tagClickWork = this.elements.root.querySelector(
			"#cat__work"
		);
        const tagClickCode = this.elements.root.querySelector(
			"#cat__code"
		);

        tagClickMebic.addEventListener("click", changeColor);
        tagClickHome.addEventListener("click", changeColor);
        tagClickDelhi.addEventListener("click", changeColor);
        tagClickWork.addEventListener("click", changeColor);
        tagClickCode.addEventListener("click", changeColor);

        function changeColor() {
            const newCategory = this.id;
            document.querySelector(".kanban__item").children[0]
            .setAttribute("id", newCategory);
            this.category = newCategory;
            // KanbanAPI.updateItem(id, {
            //     category: this.category,
            // })
            // console.log(this.category);
        }

		const onBlur = () => {
			const newContent = this.elements.input.textContent.trim();

			if (newContent == this.content) {
				return;
			}
			this.content = newContent;
			KanbanAPI.updateItem(id, {
				content: this.content,
                // category: this.category
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
                <div class="hover__el">
                    <div class="category__div">
                        <button id="cat__mebic" class="item__category" type="button">Mebic</button>
                        <button id="cat__home" class="item__category type="button"">Home</button>
                        <button id="cat__delhi" class="item__category type="button"">Delhi</button>
                        <button id="cat__work" class="item__category type="button"">Work</button>
                        <button id="cat__code" class="item__category type="button"">Code</button>
                    </div>
                </div>
            </div>
            `).children[0];
	}
}
// TODO: sorting by priority and categorize with color, how to deal with timescale, on hover - show category__div
// <div class="priority">Priority: 1</div>
