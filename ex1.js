var avalon = require('./index')

var vm = avalon.define({
    $id: 'test',
    name: 'accordion example',
    data: [{title: "1321", content: "1111"},
         {title: "1232", content: "2222"},
         {title: "23432", content: "3333"}]
    
})
window.vm = vm
module.exports = avalon