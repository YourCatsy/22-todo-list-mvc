class TodoApi {
  static URL = 'https://62054479161670001741b708.mockapi.io/api/todo/';

  static getList() {
    return fetch(this.URL).then((res) => {
      if (res.ok) { // 200 ... 299
        return res.json();
      }

      throw new Error('Не могу получить список туду.');
    });
  }

  static getOne(id) {
    return fetch(this.URL + id).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`Не могу получить туду c id '${id}'.`);
    });
  }

  static create(todo) {
    return fetch(this.URL, {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`Не могу создать туду.`);
    });
  }

  static update(id, todo) {
    return fetch(this.URL + id, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`Не могу обновить туду.`);
    });
  }

  static delete(id) {
    return fetch(this.URL + id, {
      method: 'DELETE',
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }

      throw new Error(`Не могу удалить туду.`);
    });
  }
}

export default TodoApi;
