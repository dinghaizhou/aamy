import _ from 'lodash'
document.querySelector('h1').style.color = 'red'
function component() {
    var element = document.createElement('div');

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack', 'watch a '], ' ');
    return element;
}

document.body.appendChild(component());