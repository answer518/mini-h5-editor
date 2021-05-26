import { parse } from 'uuid'
import { Prop } from 'vue'
import { TextComponentProps } from './defaultProps'

export interface PropsToForm {
    component: string;
    valueProp?: string;
    // 兼容各种组件对value的不同需求
    beforeTransformValue?: (v: any) => any;
    // 当改变属性时触发的更新函数
    afterTransformValue?: (v: any) => any;
    extraProps?: {};
    text?: string;
    // 子组件如options
    subComponent?: string;
    options?: { text: string; value: any }[];
    // 事件
    eventName?: string;
}

export type PropsToForms = {
    [P in keyof TextComponentProps]?: PropsToForm
}

const px2Number: PropsToForm = {
    component: 'a-input-number',
    beforeTransformValue: (v: string) => parseInt(v),
    afterTransformValue: (e: number) => e ? `${e}px` : '',
}

export const mapPropsToForms: PropsToForms = {
    text: {
        component: 'a-textarea',
        text: '文本',
        extraProps: { rows: 3 },
        afterTransformValue: (e: any) => e.target.value,
    },
    width: {
        text: '宽度',
        ...px2Number,
    },
    fontSize: {
        text: '字号',
        ...px2Number,
    },
    lineHeight: {
        component: 'a-slider',
        text: '行高',
        extraProps: { min: 0, max: 3, step: 0.1 },
        beforeTransformValue: (v) => parseInt(v),
        afterTransformValue: (e: number) => e.toString(),
    },
    textAlign: {
        component: 'a-radio-group',
        subComponent: 'a-radio-button',
        text: '对齐',
        options: [
            { value: 'left', text: '左' },
            { value: 'center', text: '中' },
            { value: 'right', text: '右' },
        ],
        afterTransformValue: (e: any) => e.target.value,
    },
    fontFamily: {
        component: 'a-select',
        subComponent: 'a-select-option',
        text: '字体',
        options: [
            { value: '', text: '无' },
            { text: '宋体', value: '"SimSun","STSong"' },
            { text: '黑体', value: '"SimHei","STHeiti"' },
            { text: '楷体', value: '"KaiTi","STKaiti"' },
            { text: '仿宋', value: '"FangSong","STFangsong"' },
        ]
    }
}