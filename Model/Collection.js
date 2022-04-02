import TodoApi from "../TodoApi.js";

class Collection {
  #list = [];

  save(todo) {
    if (todo.id) {
      this.update(todo.id, todo);

      return Promise.resolve();
    } else {
      todo.status = false;

      return TodoApi
        .create(todo)
        .then(newTodo => this.addList(newTodo));
    }
  }

  update(id, data) {
    const todo = this.findById(id);

    Object.keys(data).forEach(name => todo[name] = data[name]);

    return TodoApi.update(todo.id, todo);
  }

  onToggle(id) {
    const todo = this.findById(id);
    todo.status = !todo.status;

    this.update(id, todo);

    return Promise.resolve();
  }

  fetch() {
    return TodoApi
      .getList()
      .then(list => this.setList(list));
  }

  delete(id) {
    return TodoApi
      .delete(id)
      .then(() => {
        const list = this.#list.filter(item => item.id !== id);
        this.setList(list);
      });
  }

  setList(list) {
    this.#list = list;
  }

  getList() {
    return this.#list;
  }

  addList(todo) {
    this.#list.push(todo);
  }

  findById(id) {
    return this.#list.find(item => item.id === id);
  }
}

export default Collection;
