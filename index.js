var avalon = require('avalon2')
var template = require('text!./template.html')
 require('style!css!oni.compass/oniui-common.css')

 require('style!css!sass!./oni.accordion.scss')

avalon.component('ms-accordion', {
    template: template,
    getTemplate: function (vm, template) {
        var templateArr = template.split("MS_OPTION_MODE_CARET")
        var caretTemplate = templateArr[1]
        var navTemplate = templateArr[0]
        var horizontalHeaderStyle = 'ms-css-width="{width: @headerWidth,height:@headerAndContentHeight}"'
        var horizontalH2Style = 'ms-css="{bottom: -@headerWidth, width: @headerAndContentHeight,height:@headerWidth}"'
        var horizontalContentStyle = 'ms-css="{width: @contentWidth,height: @headerAndContentHeight}"'
        var accordionTemp = ''

        navTemplate = vm.isVertical ?
                navTemplate.replace("MS_OPTION_HORIZONTAL_HEADER_WIDTH_HEIGHT", "")
                .replace(/MS_OPTION_HORIZONTAL_CONTENT_WIDTH_HEIGHT/g, "") :
                navTemplate.replace("MS_OPTION_HORIZONTAL_HEADER_WIDTH_HEIGHT", horizontalHeaderStyle).
                replace(/MS_OPTION_HORIZONTAL_CONTENT_WIDTH_HEIGHT/g, horizontalContentStyle)
        if (vm.isVertical) {
            accordionTemp = vm.mode === "caret" ? caretTemplate : navTemplate
            vm.mode = "nav"
            vm.multiple = false
            accordionTemp = navTemplate.replace("MS_OPTION_HORIZONTAL_TITLE", horizontalH2Style)
        }
        //绑定事件
        var triggerEvent = ' ms-on-' + vm.triggerType + '="@triggerCallback($event, $index)" '
        accordionTemp = accordionTemp.replace('MS_OPTION_EVENT', triggerEvent)

        var elementClass = elementClass = 'oni-accordion oni-accordion-mode-'
                + vm.mode + " " + vm.accordionClass
        //处理根节点样式
        var str =  '<div class="' + elementClass + '" ms-css="{width:@width}">' + accordionTemp + '</div>'
        return str.trim()
    },
    defaults: {
        isVertical: true,
        width: '100%', //@config 配置组件宽度(type: Number || Percent)
        headerWidth: 30, //@config 组件水平展开时，头部的宽
        contentWidth: 400, //@config 组件水平展开时内容的宽
        headerAndContentHeight: 200, //@config 组件水平展开时的高度
        autoRun: true, //@config 告知组件是否自动渲染，设为false时需要手动调用refresh方法进行组件的解析渲染
        //template: "", //@config 用户自定义template
        accordionClass: "", //@config 为accordion容器自定义的class
        currentTriggerClass: "oni-state-active", //@config 展开accordion面板时，header添加的class
        /**
         * @interface 配置accordion组件要展示的数据对象，格式为
         <pre class="brush:javascript;gutter:false;toolbar:false">
         [
         {title: String, content: String, toggle:true},
         {title: String, content: String, toggle:true},
         {title: String, content: String, toggle:true}
         ]
         </pre> 
         */
        version: "1.0",
        data: [],
        initIndex: null, //@config 初始展开第几个面板
        mode: "caret", //@config 组件展开模式，取值说明："nav"=面板header无小三角图标，"caret"=展开面板有小三角图标，可以定义是点击图标展开面板还是点击header即展开，默认是点击header即展开，当然也可以通过getTemplate自定义模板
        multiple: false, //@config 是否可以同时打开多个面板
        widgetElement: "", //@interface 保存绑定组件元素的引用
        trigger: "oni-accordion-header", //@config 触发展开面板的dom节点对应class，比如mode为caret时想要只通过小图标展开隐藏panel时可以设置为"oni-accordion-trigger"
        triggerType: 'click', //@config 触发展开面板的事件类型，可以是：click|mouseenter
        currentIndex: -1, //@interface 组件最新展开的面板序号，不可配置
        direction: "vertical", //@config 组件的展开方向，默认为垂直展开，也可以水平展开("horizontal")
        /**
         * @config {Function} 组件面板展开前回调函数
         * @param index {Number} 面板序号
         * @param header {Object} 标题区域节点对象
         * @param panel {Object} 面板区域节点对象
         * @returns {Boolean| Undefined} 若返回false则不展开面板 
         */
        onBeforeSwitch: avalon.noop, //@config
        /**
         * @config {Function} 组件面板展开后的回调函数
         * @param index {Number} 面板序号
         * @param header {Object} 标题区域节点对象
         * @param panel {Object} 面板区域节点对象
         */
        onSwitch: avalon.noop, //@config
        /**
         * @config {Function} 远程更改数据
         * @param vmodel {Object} 组件自身vmodel
         * @param options {Object} 组件的配置对象
         * @param vmodels {Array} 组件的祖先vmodel组成的数组链
         */
        onInit: function (e) {
            var vmodel = e.vmodel
            vmodel.$watch("currentIndex", function (newVal, oldVal) {
                
            })

        }, //@config
        triggerCallback: function(e, index){
            this.currentIndex = index
        }
        
    }
})


module.exports = avalon

