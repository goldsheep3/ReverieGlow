// MEK报错修复
ServerEvents.tags('fluid', event => {
    event.add('forge:brine', 'mekanism:brine')
})
ServerEvents.tags('chemical', event => {
    event.add('mekanism:bio', 'mekanism:bio')
})