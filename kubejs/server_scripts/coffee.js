ServerEvents.recipes(event => {
    // 对咖啡乐事和机械动力：咖啡的模组重复作物进行合并（以咖啡乐事为标）

    // 对合成配方进行替换
    function replace(i, r) {
        event.replaceInput({input:i}, i, r)
        event.replaceOutput({output:i}, i, r)
    }
    replace('coffee_delight:coffee_berries', 'createcafe:coffee_fruit')
    replace('coffee_delight:coffee_flour', 'createcafe:coffee_grounds')
    replace('coffee_delight:coffee_beans', 'createcafe:coffee_beans')
    replace('coffee_delight:coffee_beans_cooked', 'createcafe:roasted_coffee_beans')

    // 删除机械动力：咖啡的相关配方
    event.remove({id:'createcafe:smoking/coffee_roasting'})
    event.remove({id:'coffee_delight:cutting/coffee_beans'})
    event.remove({id:'coffee_delight:cutting/coffee_beans_using_deployer'})

    // 机械动力：咖啡的咖啡果的手动合成转化
    // todo 尚未找到删除机械动力：咖啡中咖啡植株的方案
    event.shapeless('createcafe:coffee_fruit', ['coffee_delight:coffee_berries'])
})