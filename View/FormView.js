class ListView {
  constructor(options) {
    this.options = options;
    this.$rootEl = this.initView();
    this.$inputs = this.$rootEl.find('input, textarea');
  }

  initView() {
    return $(`
      <form>
        <input type="hidden" name="id" />
        <input type="text" name="title" placeholder="Введите сообщение" />
        <button type="submit">Отправить</button>
      </form>
    `)
      .on('submit', e => this.onFormSubmit(e));
  }

  onFormSubmit(e) {
    e.preventDefault();

    const todo = this.getFormData();

    this.options.onSubmit(todo);
  }

  setFormData(data) {
    for(let input of this.$inputs) {
      if (input.name in data) {
        input.value = data[input.name];
      }
    }
  }

  getFormData() {
    const res = {};

    for(let input of this.$inputs) {
      res[input.name] = input.value;
    }

    return res;
  }

  appendTo($container) {
    $container.append( this.$rootEl);
  }
}

export default ListView;
