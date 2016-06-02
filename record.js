->gulp合并工具使用

npm install gulp

npm install gulp-concat
查看gulp中文网使用API

->windos
MSConfig设置启动项

->nodejs
http://www.runoob.com/nodejs/nodejs-http-server.html

->git 

删除远程分支
git branch -r -d origin/branch-name
不成功，只删除本地对该远程分支的track
正确的
git push origin :branch-name

推送本地分支到远程
git push origin branch-name

拉取远程分支到本地
git checkout origin


->game 游戏名称寻路者


->js 起源 Infinity (无穷)

->$创造对象

生存环境 :浏览器对象模型(BOM-Browser Object Model)尚无正式标准

Browser包括：
Window 
Navigator
Screen
History
Location
五大部分

-> window:Window 表示浏览器中的窗口 没有应用于此类公开标准
window对象集合
frames[] 返回窗口中所有命中的框架。

所有js全局对象、函数以及变量均自动成为window对象的成员。

全局对象是window的属性。
全局函数是window的方法。

window基本属性20个包括：……

window基本方法20个包括：……

-> navigator:Navigator 包含浏览器的信息 没有应用于此类的公开标准
Navigator对象集合
plugins[] 返回对文档中所有嵌入式对象的引用。
Navigator对象属性
appCodeName	返回浏览器的代码名。
appMinorVersion	返回浏览器的次级版本。
appName	返回浏览器的名称。
appVersion	返回浏览器的平台和版本信息。
browserLanguage	返回当前浏览器的语言。
cookieEnabled	返回指明浏览器中是否启用 cookie 的布尔值。
cpuClass	返回浏览器系统的 CPU 等级。
onLine	返回指明系统是否处于脱机模式的布尔值。
platform	返回运行浏览器的操作系统平台。
systemLanguage	返回 OS 使用的默认语言。
userAgent	返回由客户机发送服务器的 user-agent 头部的值。
userLanguage	返回 OS 的自然语言设置。
Navigator 对象方法
javaEnabled()	规定浏览器是否启用 Java。
taintEnabled()	规定浏览器是否启用数据污点 (data tainting)。

Navigator 对象描述
Navigator 对象包含的属性描述了正在使用的浏览器。可以使用这些属性进行平台专用的配置。
虽然这个对象的名称显而易见的是 Netscape 的 Navigator 浏览器，但其他实现了 JavaScript 的浏览器也支持这个对象。
Navigator 对象的实例是唯一的，可以用 Window 对象的 navigator 属性来引用它。