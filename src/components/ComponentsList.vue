<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <l-text v-bind="item"></l-text>
    </div>
  </div>
  <uploader-wrapper @success="onImageUploaded" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { message } from 'ant-design-vue'
import LText from '../components/LText.vue'
import UploaderWrapper from '../components/UploaderWrapper.vue'
import { ComponentData } from '../store/module/editor'
import { imageDefaultProps, TextComponentProps } from '../defaultProps'
import { UploadResp } from '../types/upload'
import { getImageDimensions } from '../utils/helper'

export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  emits: ['on-item-click'],
  name: 'components-list',
  components: {
    LText,
    UploaderWrapper,
  },
  setup(props, context) {
    const onItemClick = (props: TextComponentProps) => {
      const componentData: ComponentData = {
        name: 'l-text',
        id: uuidv4(),
        props,
      }
      console.log('onItemClick -> componentData', componentData)
      context.emit('on-item-click', componentData)
    }
    const onImageUploaded = (data: { resp: UploadResp; file: File }) => {
      const { resp, file } = data
      const componentData: ComponentData = {
        name: 'l-image',
        id: uuidv4(),
        props: {
          ...imageDefaultProps,
        },
      }
      console.log('onImageUploaded -> componentData', componentData)
      message.success('上传成功')
      componentData.props.src = resp.data.url
      getImageDimensions(file).then(({ width }) => {
        const maxWidth = 373
        componentData.props.width = (width > maxWidth ? maxWidth : width) + 'px'
        context.emit('on-item-click', componentData)
      })
    }
    return {
      onItemClick,
      onImageUploaded,
    }
  },
})
</script>

<style scoped>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
</style>