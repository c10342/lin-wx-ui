import { delete } from 'vue/types/umd'
import {isObj} from '../common/utils'

const defaultOptions = {
    type:'text',
    mask:false,
    show:true,
    zIndex:1000,
    duration:2000,
    position:'middle',
    forbidClick:false,
    selector:'#lin-toast'
}

let queue = []

let currentOptions = {...defaultOptions}

function parseOptions(message){
    return isObj(message)?message:{message}
}

function getContext(){
    const pages  = getCurrentPages()
    return pages[pages.length-1]
}

function Toast(options){
    options = {...currentOptions,parseOptions(options)}

    const context = options.context || getContext()
    const toast = context.selectComponent(options.selector)

    if(!toast){
        console.warn('未找到 lin-toast 节点，请确认 selector 及 context 是否正确');
    return;
    }

    delete options.context;
    delete options.selector;

    toast.clear = ()=>{
        toast.setData({show:false})
        if(options.onClose){
            options.onClose()
        }
    }

    queue.push(toast)
    toast.setData(options)
    clearTimeout(toast.timer)
    if(options.duration>0){
        toast.timer = setTimeout(() => {
            toast.clear()
            queue = queue.filter(item=>item!==toast)
        }, options.duration);
    }
    return toast
}

const createMethod = type=>options=>{
    Toast({
        type,
        ...parseOptions(options)
    })
}

Toast.loading = createMethod('loading')
Toast.success=createMethod('success')
Toast.fail = createMethod('fail')

Toast.clear = ()=>{
    queue.forEach(toast=>{
        toast.clear()
    })
    queue = []
}

Toast.setDefaultOptions = (options) => {
    Object.assign(currentOptions, options);
  };
  
  Toast.resetDefaultOptions = () => {
    currentOptions = { ...defaultOptions };
  };

  export default Toast