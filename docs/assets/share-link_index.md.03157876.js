import { a as vModelText } from "./framework.765af80f.js";
import { _ as _export_sfc, f as defineComponent, k as ref, o as openBlock, b as createElementBlock, d as createBaseVNode, O as withDirectives, e as createStaticVNode, A as createVNode } from "./plugin-vue_export-helper.8106b725.js";
var index_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => "\n#api-index[data-v-2b844569] {\n  max-width: 1024px;\n  margin: 0 auto;\n  padding: 32px 32px;\n}\n.header[data-v-2b844569] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.api-filter[data-v-2b844569] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  gap: 1rem;\n  margin-bottom: 30px;\n}\n.api-filter input[data-v-2b844569] {\n  border: 1px solid var(--vt-c-divider);\n  border-radius: 24px;\n  padding: 6px 24px;\n  width: 400px;\n}\n.api-filter[data-v-2b844569]:focus {\n  border-color: var(--vt-c-green-light);\n}\n.api-filter .btn-search[data-v-2b844569]{\n  cursor: pointer;\n}\n@media (max-width: 768px) {\n#api-index[data-v-2b844569] {\n    padding: 42px 24px;\n}\n.api-groups a[data-v-2b844569] {\n    font-size: 14px;\n}\n.header[data-v-2b844569] {\n    display: block;\n}\n}\n.list[data-v-2b844569]{\n}\n.list .item[data-v-2b844569] {\n  margin-bottom: 30px;\n}\n.list .item .title[data-v-2b844569]{\n  color: #1a0dab;\n  text-decoration: none;\n  -webkit-tap-highlight-color: rgba(0,0,0,.10);\n  font-size: 20px;\n  font-weight: 400;\n  display: inline-block;\n  line-height: 1.3;\n  margin-bottom: 3px;\n}\n.list .item .desc[data-v-2b844569]{\n  display: -webkit-box;\n  overflow: hidden;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  text-overflow: ellipsis;\n  width: 60%;\n  word-break: break-all;\n}\n")();
const _hoisted_1 = { id: "api-index" };
const _hoisted_2 = { class: "header" };
const _hoisted_3 = { class: "api-filter" };
const _hoisted_4 = /* @__PURE__ */ createStaticVNode('<div class="list" data-v-2b844569><div class="item" data-v-2b844569><a class="title" href="https://www.baidu.com" target="_blank" data-v-2b844569>title</a><div class="desc" data-v-2b844569>descdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdesc</div></div><div class="item" data-v-2b844569><a class="title" href="https://www.baidu.com" target="_blank" data-v-2b844569>title</a><div class="desc" data-v-2b844569>descdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdesc</div></div></div>', 1);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const query = ref("");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            withDirectives(createBaseVNode("input", {
              type: "search",
              placeholder: "Enter keyword",
              id: "api-filter",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => query.value = $event)
            }, null, 512), [
              [vModelText, query.value]
            ]),
            createBaseVNode("label", {
              class: "btn-search",
              for: "api-filter",
              onClick: _cache[1] || (_cache[1] = (...args) => _ctx.queryList && _ctx.queryList(...args))
            }, "Search"),
            createBaseVNode("label", {
              class: "btn-search",
              for: "api-filter",
              onClick: _cache[2] || (_cache[2] = (...args) => _ctx.queryList && _ctx.queryList(...args))
            }, "+")
          ])
        ]),
        _hoisted_4
      ]);
    };
  }
});
var WorkNotesIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-2b844569"]]);
const __pageData = '{"title":"","description":"","frontmatter":{"page":true,"footer":false},"relativePath":"share-link/index.md","lastUpdated":1649231303667}';
const __default__ = {};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(WorkNotesIndex)
      ]);
    };
  }
});
export { __pageData, _sfc_main as default };
