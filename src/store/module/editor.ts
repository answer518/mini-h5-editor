import { Module } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { GlobalDataProps } from '../index'
import { TextComponentProps, ImageComponentProps } from '../../defaultProps'

export interface EditorProps {
    // 存放供编辑器画布渲染的组件
    components: ComponentData[];
    // 当前编辑的是哪个元素, uuid
    currentElement: string;
}

export interface ComponentData {
    // props: { [key: string]: any };
    props: Partial<TextComponentProps & ImageComponentProps>; // & 与 | 的区别？
    id: string;
    // 业务组件库名称: l-text l-image 等
    name: 'l-text' | 'l-image'; // string;
}

export const testComponents: ComponentData[] = [
    { id: uuidv4(), name: 'l-text', props: { text: 'hello', fontSize: '20px', color: 'red', textAlign: 'center', lineHeight: '2', fontFamily: '' } },
    { id: uuidv4(), name: 'l-text', props: { text: 'hello', fontSize: '25px', fontWeight: 'bold', actionType: 'url', url: 'https://www.baidu.com', fontFamily: '' } },
    { id: uuidv4(), name: 'l-text', props: { text: 'hello', fontSize: '30px', textDecoration: 'underline', textAlign: 'left', fontFamily: '' } },
    { id: uuidv4(), name: 'l-image', props: { src: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg', width: '100px' } },
]

const editor: Module<EditorProps, GlobalDataProps> = {
    state: {
        components: testComponents,
        currentElement: ''
    },
    mutations: {
        // 往画布新增组件
        addComponent(state, component: ComponentData) {
            state.components.push(component)
        },
        updateComponent(state, { key, value }) {
            const updatedComponent = state.components.find((component) => component.id === state.currentElement)
            if (updatedComponent) {
                updatedComponent.props[key as keyof TextComponentProps] = value
            }
        },
        // 选择组件高亮显示
        setActive(state, currentId: string) {
            state.currentElement = currentId
        }
    },
    getters: {
        getCurrentElement: (state) => {
            return state.components.find((component) => component.id === state.currentElement)
        }
    }
}

export default editor