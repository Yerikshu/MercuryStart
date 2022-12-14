<template>
  <slot v-if="finalConfig.withHeaderSlot" name="headerSlot" />
  <el-scrollbar>
    <el-tree
      ref="tree"
      v-loading="loading"
      :data="finalConfig.data"
      :empty-text="finalConfig.emptyText"
      :node-key="finalConfig.nodeKey"
      :props="finalConfig.props"
      :render-after-expand="finalConfig.renderAfterExpand"
      :load="finalConfig.load"
      :render-content="finalConfig.renderContent"
      :highlight-current="finalConfig.highlightCurrent"
      :default-expand-all="finalConfig.defaultExpandAll"
      :expand-on-click-node="finalConfig.expandOnClickNode"
      :check-on-click-node="finalConfig.checkOnClickNode"
      :auto-expand-parent="finalConfig.autoExpandParent"
      :default-expanded-keys="finalConfig.defaultCheckedKeys"
      :show-checkbox="finalConfig.showCheckbox"
      :check-strictly="finalConfig.checkStrictly"
      :default-checked-keys="finalConfig.defaultCheckedKeys"
      :current-node-key="finalConfig.currentNodeKey"
      :filter-node-method="finalConfig.filterNodeMethod"
      :accordion="finalConfig.accordion"
      :indent="finalConfig.indent"
      :icon="finalConfig.icon"
      :lazy="finalConfig.lazy"
      :draggable="finalConfig.draggable"
      :allow-drag="finalConfig.allowDrag"
      :allow-drop="finalConfig.allowDrop"
      @node-click="handleNodeClick"
      @node-contextmenu="handleNodeContextmenu"
      @check-change="handleCheckChange"
      @check="handleCheck"
      @current-change="handleCurrentChange"
      @node-expand="handleNodeExpand"
      @node-collapse="handleNodeCollapse"
      @node-drag-start="handleNodeDragStart"
      @node-drag-enter="handleNodeDragEnter"
      @node-drag-leave="handleNodeDragLeave"
      @node-drag-over="handleNodeDragOver"
      @node-drag-end="handleNodeDragEnd"
      @node-drop="handleNodeDrop"
    >
      <template v-slot="{ node }">
        <el-dropdown
          v-if="finalConfig.menu"
          trigger="contextmenu"
          @command="handleClickMenu"
        >
          <template v-if="finalConfig.slot">
            <slot :data="{ node }"></slot
          ></template>
          <span class="tree_label" v-else-if="node.data.content.length === 0">
            {{ node.label }}</span
          >
          <el-tooltip
            v-else
            effect="dark"
            placement="right"
            :content="node.data.content"
          >
            <span class="tree_label">{{ node.label }}</span></el-tooltip
          >
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in finalConfig.menuData"
                :key="item.value"
                :command="item.value"
                >{{ item.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span class="tree_label" v-else-if="node.data.content.length === 0">
          {{ node.label }}</span
        >
        <el-tooltip
          v-else
          effect="dark"
          placement="right"
          :content="node.data.content"
        >
          <span class="tree_label">{{ node.label }}</span></el-tooltip
        >
      </template>
    </el-tree>
  </el-scrollbar>
</template>
<script setup>
import { ref, defineEmits, reactive, computed } from "vue";

let tree = ref();

let loading = reactive(false);
let initConfig = reactive({
  data: [],
  emptyText: "",
  nodeKey: "",
  props: Object,
  renderAfterExpand: true,
  load: "",
  renderContent: null,
  highlightCurrent: false,
  defaultExpandAll: false,
  expandOnClickNode: true,
  autoExpandParent: true,
  showCheckbox: false,
  checkStrictly: false,
  defaultCheckedKeys: [],
  currentNodeKey: null,
  filterNodeMethod: null,
  accordion: false,
  indent: 18,
  icon: null,
  lazy: false,
  draggable: false,
  allowDrag: null,
  allowDrop: null,
});

const props = defineProps({
  config: {
    type: Object,
    require: true,
  },
});

let finalConfig = computed({
  get() {
    let tmpConfig = Object.assign(initConfig, props.config);
    if (tmpConfig.immediateRemote) {
      updateTree();
    }
    console.log(tmpConfig);
    return tmpConfig;
  },
  set(value) {
    emit("update:config", value);
  },
});

const handleNodeClick = (nodeObecjt, nodeProperty, treeNode, event) => {
  emit("node-click", nodeObecjt, nodeProperty, treeNode, event);
};
const handleNodeContextmenu = (event, nodeObject, node, self) => {
  emit("node-contextmenu", event, nodeObject, node, self);
};
const handleCheckChange = (data, selected, selectedObject) => {
  emit("check-change", data, selected, selectedObject);
};
const handleCheck = (dataObject, node) => {
  emit("check", dataObject, node);
};
const handleCurrentChange = (data, node) => {
  emit("current-change", data, node);
};
const handleNodeExpand = (data, node, nodeObject) => {
  emit("node-expand", data, node, nodeObject);
};
const handleNodeCollapse = (data, node, nodeObject) => {
  emit("node-collapse", data, node, nodeObject);
};
const handleNodeDragStart = (node, event) => {
  emit("node-drag-start", node, event);
};
const handleNodeDragEnter = (dragedNode, draggingNode, event) => {
  emit("node-drag-enter", dragedNode, draggingNode, event);
};
const handleNodeDragLeave = (dragedNode, draggingNode, event) => {
  emit("node-drag-leave", dragedNode, draggingNode, event);
};
const handleNodeDragOver = (dragedNode, draggingNode, event) => {
  emit("node-drag-over", dragedNode, draggingNode, event);
};
const handleNodeDragEnd = (dragedNode, draggingNode, position, event) => {
  emit("node-drag-end", dragedNode, draggingNode, position, event);
};
const handleNodeDrop = (dragedNode, draggingNode, position, event) => {
  emit("node-drop", dragedNode, draggingNode, position, event);
};

function updateTree() {}

const emit = defineEmits([
  "update:config",
  "node-click",
  "node-contextmenu",
  "check-change",
  "check",
  "current-change",
  "node-expand",
  "node-collapse",
  "node-drag-start",
  "node-drag-enter",
  "node-drag-leave",
  "node-drag-over",
  "node-drag-end",
  "node-drop",
]);

function filter() {
  tree.value.filter();
}

function updateKeyChildren(key, data) {
  tree.value.updateKeyChildren(key, data);
}
function getCheckedNodes(leafOnly, includeHalfChecked) {
  tree.value.getCheckedNodes(leafOnly, includeHalfChecked);
}
function setCheckedNodes(nodes) {
  tree.value.setCheckedNodes(nodes);
}
function getCheckedKeys(leafOnly) {
  tree.value.getCheckedKeys(leafOnly);
}
function setCheckedKeys(keys, leafOnly) {
  tree.value.setCheckedKeys(keys, leafOnly);
}
function setChecked(data, checked, deep) {
  tree.value.setChecked(data, checked, deep);
}
function getHalfCheckedNodes() {
  tree.value.getHalfCheckedNodes();
}
function getHalfCheckedKeys() {
  tree.value.getHalfCheckedKeys();
}
function getCurrentKey() {
  tree.value.getCurrentKey();
}
function getCurrentNode() {
  tree.value.getCurrentNode();
}

function setCurrentKey(key, shouldAutoExpandParent) {
  tree.value.getCurrentNode(key, shouldAutoExpandParent);
}

function setCurrentNode(key, shouldAutoExpandParent) {
  tree.value.setCurrentNode(key, shouldAutoExpandParent);
}

function getNode(data) {
  tree.value.getNode(data);
}

function remove(data) {
  tree.value.remove(data);
}

function append(data, parentNode) {
  tree.value.append(data, parentNode);
}

function insertBefore(data, refNode) {
  tree.value.insertBefore(data, refNode);
}

function insertAfter(data, refNode) {
  tree.value.insertAfter(data, refNode);
}

defineExpose({
  filter,
  updateKeyChildren,
  setCheckedNodes,
  getCheckedKeys,
  setCheckedKeys,
  setChecked,
  getHalfCheckedNodes,
  getHalfCheckedKeys,
  getCurrentKey,
  getCurrentNode,
  setCurrentKey,
  setCurrentNode,
  getNode,
  remove,
  append,
  insertBefore,
  insertAfter,
});
</script>
