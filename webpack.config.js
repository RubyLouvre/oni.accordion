var webpack = require('webpack');

var path = require('path');
var fs = require('fs')
var json = require('./package.json')

var version = json.version.split('.')
var v = (version.shift() + '.' + version.join('')).replace(/0+$/,"0")
var text = fs.readFileSync('./index.js', 'utf8')
text = text.replace(/version\s*\:\s*([^,]+)/, function (a, b) {
    return 'version: ' +JSON.stringify( v )
})

fs.writeFileSync('./index.js', text, 'utf8')
var now = new Date
var snow = now.getFullYear()+'-'+ (now.getMonth()+1) + 
        '-'+ now.getDate()+':'+ now.getHours()
module.exports = {
    entry: {
        ex1: './ex1.js', //我们开发时的入口文件
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'avalon'
    }, //页面引用的文件
    plugins: [
      new webpack.BannerPlugin('built in '+snow+' version '+ v+' by 司徒正美')
    ],
    module: {
        
     
    },
   
    resolve: {
        extensions: ['.js', '', '.css'],
        alias: {
          //  avalon: './src/avalon',
          //  'vars': path.join(process.cwd(), './src/base/builtin')
        }
    }
}
