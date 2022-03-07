class ProxyFactory {
    static create (objeto, props, armadilha) {
        const proxy = new Proxy(objeto, {
            get(target, prop, receiver) {
                if (ProxyFactory._ehFuncao(target[prop]) && props.includes(prop)) {
                    return function () {
                        console.log(`"${prop}" disparou a armadilha`);
                        target[prop].apply(target, arguments)
                        armadilha(target)
                    }
                }
                return target[prop]
            },

            set (target, prop, value, receiver) {
                const updated = Reflect.set(target, prop, value)

                if (props.includes(prop)) {
                    armadilha(target)
                }

                return updated
            }
        })

        armadilha(proxy)
        return proxy
    }

    static _ehFuncao (func) {
        return typeof(func) === typeof(Function)
    }
}
