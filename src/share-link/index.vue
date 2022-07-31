<script setup lang="ts">
import { ElButton,ElDialog, ElForm, ElFormItem, ElInput} from 'element-plus'
import { ref, computed, defineComponent, reactive, toRefs} from 'vue'
import {getShareLinkList, addShareLink} from '../public/scripts/apiList.js'
const query = ref('')
let addDialogVisible = ref(false)
const addDialogForm = reactive({
  name:"",
  url:'',
  desc:"",
  label:''
})
const shareLinkList = ref([])
// toRefs(addDialogForm)
const showAddDialog = function(){
  addDialogVisible.value = true
  console.log(addDialogVisible)
}

const queryList = async function(){
  const {data} = await getShareLinkList()
  shareLinkList.value = data || []
}
queryList()
const formLabelWidth = '140px'
// defineComponent({
//   components: {
//     ElButton,
//   },
// })
const confirmAdd = async function(){
  console.log(addDialogForm)
  let opt = {
    "data": {
      "name": addDialogForm.name,
      "url": addDialogForm.url,
      "label_id": "",
      "remark": addDialogForm.desc
    }
  }
  if(!opt.data.name || !opt.data.url){
    return false
  }
  await addShareLink(opt)
  addDialogVisible.value = false
  await queryList()
}

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
        <label class="btn-search" for="api-filter" @click="queryList">
          <ElButton type="primary">Search</ElButton>
        </label>
        <label class="btn-search" for="api-filter" @click="showAddDialog">
          <ElButton>Add</ElButton>
        </label>
      </div>
    </div>
    <div class="list">
<!--      <div class="item">-->
<!--        <a class="title" href="https://www.baidu.com" target="_blank">title</a>-->
<!--        <div class="desc">descdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdesc</div>-->
<!--      </div>-->
<!--      <div class="item">-->
<!--        <a class="title" href="https://www.baidu.com" target="_blank">title</a>-->
<!--        <div class="desc">descdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdesc</div>-->
<!--      </div>-->
      <div class="item" v-for="item in shareLinkList">
        <a class="title" :href="item.url" target="_blank">{{ item.name }}</a>
        <div class="desc">{{item.desc}}</div>
        <div class="desc">{{item.url}}</div>
      </div>

    </div>
    <ElDialog v-model="addDialogVisible" title="Add Share Link">
      <ElForm :model="addDialogForm">
        <ElFormItem label="name" prop="name" :label-width="formLabelWidth" required>
          <ElInput v-model="addDialogForm.name" autocomplete="off" />
        </ElFormItem>
        <ElFormItem label="url" prop="url" :label-width="formLabelWidth" required>
          <ElInput v-model="addDialogForm.url" autocomplete="off" />
        </ElFormItem>
        <ElFormItem label="desc" :label-width="formLabelWidth">
          <ElInput v-model="addDialogForm.desc" autocomplete="off" />
        </ElFormItem>
      </ElForm>
      <template #footer>
      <span class="dialog-footer">
        <ElButton @click="addDialogVisible = false">Cancel</ElButton>
        <ElButton type="primary" @click="confirmAdd"
        >Confirm</ElButton>
      </span>
      </template>
    </ElDialog>
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
