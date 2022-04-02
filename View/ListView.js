class ListView {
  static DONE_CLASS = 'done';
  static TODO_ITEM_SELECTOR = '.todoItem';

  constructor(options) {
    this.options = options;
    this.$rootEl = this.initView();
  }

  initView() {
    return $(`<ul></ul>`)
      .on('click', '.editBtn', this.onEditBtnClick.bind(this))
      .on('click', '.removeBtn', this.onRemoveBtnClick.bind(this))
      .on('click', ListView.TODO_ITEM_SELECTOR, this.onTodoItemClick.bind(this));
  }

  onTodoItemClick(e) {
    const id = this.getTodoElId(e.target);

    this.options.onStatusToggle(id);
  }

  onEditBtnClick(e) {
    const id = this.getTodoElId(e.target);

    this.options.onEdit(id);
  }

  onRemoveBtnClick(e) {
    const id = this.getTodoElId(e.target);

    this.options.onDelete(id);
  }

  appendTo($container) {
    $container.append( this.$rootEl);
  }

  renderList(list) {
    const html = list.map(this.generateTodoHTML).join('');

     this.$rootEl.html(html);
  }

  generateTodoHTML(todo) {
    const done = todo.status ? ListView.DONE_CLASS : '';

    return `
      <li
          data-id="${todo.id}"
          data-status="${todo.status}"
          class="todoItem ${done}"
      >
        ${todo.title}
        <button class="editBtn">Edit</button>
        <button class="removeBtn">Delete</button>
      </li>
    `
  }

  getTodoElId(el) {
    return el.closest(ListView.TODO_ITEM_SELECTOR).dataset.id;
  }
}

export default ListView;
