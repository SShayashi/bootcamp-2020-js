import store from "../store.js"
import { removeTodoAction, changeToggleState } from "../flux/index.js";

class Todo {
  constructor(parent, { id, name, done }) {
    this.parent = parent;
    this.element = document.createElement("li");
    this.element.className = "todo-item";
    this.props = { id, name, done };
  }

  mount(){
    const removeButton = this.element.querySelector('.todo-remove-button');
    removeButton.addEventListener("click", ()=>{
      store.dispatch(removeTodoAction(this.props.id));
    });

    const todoToggle = this.element.querySelector('.todo-toggle');
    todoToggle.addEventListener("click", ()=> {
      store.dispatch(changeToggleState(this.props.id, this.props.name, true));
    });
  }

  render() {
    const { id, name, done } = this.props;
    this.element.innerHTML = `
      <label class="todo-toggle__container">
        <input
          data-todo-id="${id}"
          type="checkbox"
          class="todo-toggle"
          value="checked"
          ${done ? "checked" : ""}
        />
        <span class="todo-toggle__checkmark"></span>
      </label>
      <div class="todo-name">${name}</div>
      <div data-todo-id="${id}" class="todo-remove-button">x</div>
    `;
    this.parent.appendChild(this.element);
    this.mount()
  }
}

export default Todo;
