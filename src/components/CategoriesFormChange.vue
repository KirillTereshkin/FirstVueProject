<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent>
        <div class="input-field">
          <select>
            <option>Category</option>
          </select>
        </div>

        <div class="input-field">
          <input type="text" id="name" />
          <label for="name">Название</label>
          <span class="helper-text invalid">TITLE</span>
        </div>

        <div class="input-field">
          <input id="limit" type="number" />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid">LIMIT</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
    name: 'categories-form-change',
    props: {
        categories: {
            type: Array,
            required: true,
        }
    }
}
</script>