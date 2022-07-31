<script setup lang="ts">
import { ElButton,ElDialog, ElForm, ElFormItem, ElInput, ElTag, ElPagination} from 'element-plus'
import { ref, computed, defineComponent, reactive, toRefs, nextTick} from 'vue'
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
let pageTotal = ref(0)
const currentPage = ref(1)
let pageSize = ref(10)
const queryList = async function(){
  let opt = {
    "pageNum": currentPage.value,
    "pageSize": pageSize.value
  }
  if(query.value){
    opt.searchKey = query.value
  }
  const res = await getShareLinkList(opt)
  console.error(res.data.total)
  pageTotal.value = res.data.total
  console.error(pageTotal)
  console.error(currentPage)
  shareLinkList.value = res.data.list || []
}
queryList()
const formLabelWidth = '60px'
// defineComponent({
//   components: {
//     ElButton,
//   },
// })


const inputValue = ref('')
const dynamicTags = ref([])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value && dynamicTags.value.length<6 && inputValue.value.length<30) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

const confirmAdd = async function(){
  console.log(addDialogForm)
  let opt = {
    "data": {
      "name": addDialogForm.name,
      "url": addDialogForm.url,
      "label_id": "",
      "remark": addDialogForm.desc,
      "label_name": dynamicTags.value.join(',')
    }
  }
  console.log(dynamicTags)
  if(!opt.data.name || !opt.data.url){
    return false
  }

  await addShareLink(opt)
  addDialogVisible.value = false
  await queryList()
}

// import type { FormInstance } from 'element-plus'

// const ruleFormRef = ref<FormInstance>()
const checkUrl = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the url'))
  }
  setTimeout(() => {
    //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
    //下面的代码中应用了转义字符"\"输出一个字符"/"
    const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    if (new RegExp(Expression).test(value) === true) {
      callback()
    } else {
      callback(new Error('Please input a valid url'))
    }
  }, 1000)
}
const rules = reactive({
  url: [{ validator: checkUrl, trigger: 'blur' }]
})

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
        <div class="label">{{item.label_name}}</div>
      </div>

    </div>
    <el-pagination
      v-if="pageTotal"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      small="small"
      layout="sizes, prev, pager, next, jumper,total"
      :total="pageTotal"
      @size-change="queryList"
      @current-change="queryList"
    />
    <ElDialog v-model="addDialogVisible" title="Add Share Link">
      <ElForm :model="addDialogForm" :rules="rules">
        <ElFormItem label="name" prop="name" :label-width="formLabelWidth" required>
          <ElInput v-model.trim="addDialogForm.name" autocomplete="off" maxlength="100"/>
        </ElFormItem>
        <ElFormItem label="url" prop="url" :label-width="formLabelWidth" required>
          <ElInput type="textarea" placeholder="e.g. https://www.xxx.com" v-model.trim="addDialogForm.url" autocomplete="off" maxlength="500"/>
        </ElFormItem>
        <ElFormItem label="desc" :label-width="formLabelWidth">
          <ElInput type="textarea" v-model.trim="addDialogForm.desc" autocomplete="off" />
        </ElFormItem>
        <el-form-item label="label" :label-width="formLabelWidth">
          <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            class="mx-1"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="ml-1 w-20"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
            + New Tag
          </el-button>
        </el-form-item>
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
.list .item .label{
  font-size: 10px;
}
>>> .el-tag {
  margin-right: 10px;
  margin-bottom: 5px;
}
.button-new-tag{
  margin-bottom: 5px;
}
</style>
