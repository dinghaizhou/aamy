### Proxy 代理（拦截）重载点运算符
    var proxy = new Proxy(target, handler);

#### 如何拦截？拦截什么？
    var obj = new Proxy({}, {
        get: function(target, propKey, receiver) {
            console.log(`getting ${propKey}`, target)
            return Reflect.get(target, propKey, receiver);
        },
        set: function(target, propKey, value, receiver) {
            console.log(`setting ${propKey}`, target)
            return Reflect.set(target, propKey, value, receiver);
        }
    })

#### Proxy 实例也可以作为其他对象的原型对象
    如果对象不含有该属性，返回‘没有该属性’
    var proxy = new Proxy({}, {
        get: function(target, propKey) {
            if(!target.hasOwnProperty(propKey)) {
                return '没有该属性';
            } else {
                return Reflect.get(target, propKey, receiver);
            }
        }
    });

    let obj = Object.create(proxy);
    obj.time // 35

#### 13种拦截方法  set get apply
    let day = new Date()

    let day1 = {
        getDate_: () => {
            console.log(this)
            return day.getDate.bind(day)
        }
    }
    console.log(day1.getDate_()())

#### 代理数组

    let arr = [1,2,3,4]
    let proxy = new Proxy(arr, {
        get(target, propKey, receiver) {
            console.log(target, propKey)
            return target[propKey]
        }
    })
    arr[1]


### Reflect 未来的新方法将只部署在Reflect对象上，从Reflect对象上可以拿到语言内部的方法。
    let person = {
        name: '海舟',
        age: 18
    }
    let proxy = new Proxy(person, {
        set: function(target, name, value, receiver) {
            if(name == 'name') {
                var success = Reflect.set(target, name, value, receiver);
                if (success) {
                    console.log('property ' + name + ' on ' + target + ' set to ' + value);
                }
            } else {
                console.log(111)
                target[name] = value
            }
        }
    });
    proxy.name = '花花'
    proxy.name




