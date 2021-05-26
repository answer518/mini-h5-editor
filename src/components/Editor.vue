<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: white">
        <div class="sidebar-container">
          组件列表
          <components-list
            :list="defaultTextTemplates"
            @onItemClick="addComponent"
          ></components-list>
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div id="canvas-area" class="preview-list">
            <editor-wrapper
              v-for="component in components"
              :key="component.id"
              :id="component.id"
              :active="component.id === (currentElement && currentElement.id)"
              @setActive="setActive"
            >
              <component :is="component.name" v-bind="component.props" />
            </editor-wrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider
        width="300"
        style="background: white"
        class="settings-panel"
      >
        组件属性
        <props-table
          v-if="currentElement && currentElement.props"
          :props="currentElement.props"
          @change="handleChange"
        />
        <!-- <pre>
          {{ currentElement && currentElement.props }}
        </pre> -->
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'
import EditorWrapper from '../components/EditorWrapper.vue'
import ComponentsList from '../components/ComponentsList.vue'
import LText from './LText.vue'
import LImage from './LImage.vue'
import PropsTable from '../components/PropsTable.vue'
import { ComponentData } from '../store/module/editor'
import { defaultTextTemplates } from '../defaultTemplates'

export default defineComponent({
  components: {
    EditorWrapper,
    ComponentsList,
    LText,
    LImage,
    PropsTable,
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    // 模块内的state是模块私有的，调用的时候需要加上模块名
    const components = computed(() => store.state.editor.components)
    const currentElement = computed<ComponentData | null>(
      () => store.getters.getCurrentElement
    )
    const addComponent = (props: any) => {
      // 模块内的的mutations、getters、actions是注册在全局的
      store.commit('addComponent', props)
    }
    const setActive = (id: string) => {
      store.commit('setActive', id)
    }
    const handleChange = (e: any) => {
      console.log('event', e)
      store.commit('updateComponent', e)
    }
    return {
      currentElement,
      components,
      defaultTextTemplates,
      addComponent,
      setActive,
      handleChange,
    }
  },
})
</script>

<style>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
</style>