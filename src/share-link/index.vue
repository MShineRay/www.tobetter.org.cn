<script setup lang="ts">
import { ref, computed } from 'vue'
const query = ref('')

</script>

<template>
  <div id="api-index">
    <div class="header">
      <div class="api-filter">
        <input
          type="search"
          placeholder="Enter keyword"
          id="api-filter"
          v-model="query"
        />
        <label class="btn-search" for="api-filter" @click="queryList">Search</label>
        <label class="btn-search" for="api-filter" @click="queryList">+</label>
      </div>
    </div>
    <div class="list">
      <div class="item">
        <a class="title" href="https://www.baidu.com" target="_blank">title</a>
        <div class="desc">descdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdesc</div>
      </div>
      <div class="item">
        <a class="title" href="https://www.baidu.com" target="_blank">title</a>
        <div class="desc">descdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdesc</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#api-index {
  max-width: 1024px;
  margin: 0 auto;
  padding: 32px 32px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.api-filter {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin-bottom: 30px;
}

.api-filter input {
  border: 1px solid var(--vt-c-divider);
  border-radius: 24px;
  padding: 6px 24px;
  width: 400px;
}

.api-filter:focus {
  border-color: var(--vt-c-green-light);
}
.api-filter .btn-search{
  cursor: pointer;
}
@media (max-width: 768px) {
  #api-index {
    padding: 42px 24px;
  }

  .api-groups a {
    font-size: 14px;
  }
  .header {
    display: block;
  }
}

.list{

}
.list .item {
  margin-bottom: 30px;
}
.list .item .title{
  color: #1a0dab;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0,0,0,.10);
  font-size: 20px;
  font-weight: 400;
  display: inline-block;
  line-height: 1.3;
  margin-bottom: 3px;
}
.list .item .desc{
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  width: 60%;
  word-break: break-all;
}
</style>
