import { createStore } from 'vuex'
import templates, { TemplatesProps } from './module/templates'
import user, { UserProps } from './module/user'
import editor, { EditorProps } from './module/editor'


export interface GlobalDataProps {
    user: UserProps;
    templates: TemplatesProps;
    editor: EditorProps;
}

const store = createStore({
    modules: {
        user,
        templates,
        editor,
    }
})

export default store
