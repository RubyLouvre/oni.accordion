var avalon = require('avalon2')
var accordion = require('./index')

var vm = avalon.define({
    $id: 'test',
    name: 'accordion example',
    data: [{title: "aaa", content: "1111"},
         {title: "bbb", content: "2222"},
         {title: "ccc", content: "3333"}],
    getBg: function(){
      return '#'+Math.floor(Math.random()*16777215).toString(16);
    },
    updateData:function(){
         this.data = [
         {title: "面板1", content: "<div style='width:100%;height:100%' ms-css='{background:@getBg()}'>内容一<br><br></div>"},
         {title: "面板2", content: "<div style='width:100%;height:100%' ms-css='{background:@getBg()}'>内容二<br><br></div>"},
         {title: "面板3", content: "<div style='width:100%;height:100%' ms-css='{background:@getBg()}'>内容三<br><br></div>"},
         {title: "面板4", content: "<div style='width:100%;height:100%' ms-css='{background:@getBg()}'>内容四<br><br></div>"}]
    }
    
    
})
window.vm = vm
module.exports = avalon