ServerEvents.recipes(event => {
    function replace(i, r) {
        event.replaceInput({input:i}, i, r)
        event.replaceOutput({output:i}, i, r)
    }
    replace('coffee_delight:coffee_berries', 'createcafe:coffee_fruit')
    replace('coffee_delight:coffee_flour', 'createcafe:coffee_grounds')
    replace('coffee_delight:coffee_beans', 'createcafe:coffee_beans')
    replace('coffee_delight:coffee_beans_cooked', 'createcafe:roasted_coffee_beans')

    event.remove({id:'createcafe:smoking/coffee_roasting'})
    event.remove({id:'coffee_delight:cutting/coffee_beans'})
    event.remove({id:'coffee_delight:cutting/coffee_beans_using_deployer'})
    event.shapeless('createcafe:coffee_fruit', ['coffee_delight:coffee_berries'])
})