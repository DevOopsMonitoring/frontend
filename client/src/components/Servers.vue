<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <h1>Сервера</h1>
        <hr />
        <br /><br />
        <button
          type="button"
          class="btn btn-success btn-lg v-b-modal.book-modal"
        >
          Добавить
        </button>
        <br /><br />
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Адрес</th>
              <th scope="col">Описание</th>
              <th scope="col">Компаня</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(server, index) in servers" :key="index">
              <td scope="col">{{ server.name }}</td>
              <td scope="col">{{ server.address }}</td>
              <td scope="col">{{ server.description }}</td>
              <td scope="col">{{ server.company }}</td>
              <td>
                <button type="button" class="btn btn-outline-warning btn-sm">
                  Изменить
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm">
                  Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal
      ref="addBookModal"
      id="book-modal"
      title="Add a new book"
      hide-footer
    >
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group
          id="form-title-group"
          label="Title:"
          label-for="form-title-input"
        >
          <b-form-input
            id="form-title-input"
            type="text"
            v-model="addBookForm.title"
            required
            placeholder="Enter title"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-author-group"
          label="Author:"
          label-for="form-author-input"
        >
          <b-form-input
            id="form-author-input"
            type="text"
            v-model="addBookForm.author"
            required
            placeholder="Enter author"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-read-group">
          <b-form-checkbox-group v-model="addBookForm.read" id="form-checks">
            <b-form-checkbox value="true">Read?</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      servers: [],
      addBookForm: {
        title: "",
        author: "",
        read: [],
      },
    };
  },
  methods: {
    getServers() {
      const path = "http://localhost:5000/servers";
      axios
        .get(path)
        .then((res) => {
          this.servers = res.data.servers;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addBook(payload) {
      const path = "http://localhost:5000/servers";
      axios
        .post(path, payload)
        .then(() => {
          this.getServers();
        })
        .catch((error) => {
          console.log(error);
          this.getServers();
        });
    },
    initForm() {
      this.addBookForm.title = "";
      this.addBookForm.author = "";
      this.addBookForm.read = [];
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addBookModal.hide();
      let read = false;
      if (this.addBookForm.read[0]) read = true;
      const payload = {
        title: this.addBookForm.title,
        author: this.addBookForm.author,
        read,
      };
      this.addBook(payload);
      this.initForm();
    },
  },
  created() {
    this.getServers();
  },
};
</script>