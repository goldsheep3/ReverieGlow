// 应用能源2

// 需求：Kubejs Create模组
ServerEvents.recipes(event => {
    // 电路板压印
    event.recipes.create.deploying('ae2:printed_logic_processor', ['minecraft:gold_ingot', 'ae2:logic_processor_press']).keepHeldItem()
    event.recipes.create.deploying('ae2:printed_calculation_processor', ['ae2:certus_quartz_crystal', 'ae2:calculation_processor_press']).keepHeldItem()
    event.recipes.create.deploying('ae2:printed_engineering_processor', ['minecraft:diamond', 'ae2:engineering_processor_press']).keepHeldItem()
    event.recipes.create.deploying('ae2:printed_silicon', ['ae2:silicon', 'ae2:silicon_press']).keepHeldItem()
    // 处理器压印
    event.recipes.createSequencedAssembly([
        'ae2:logic_processor'
    ], 'ae2:printed_logic_processor', [
        event.recipes.createDeploying('ae2:printed_logic_processor', ['ae2:printed_logic_processor', 'minecraft:redstone']),
        event.recipes.createDeploying('ae2:printed_logic_processor', ['ae2:printed_logic_processor', 'ae2:printed_silicon']),
        event.recipes.createPressing('ae2:printed_logic_processor', 'ae2:printed_logic_processor')
    ]).transitionalItem('ae2:printed_logic_processor').loops(1)
    event.recipes.createSequencedAssembly([
        'ae2:calculation_processor'
    ], 'ae2:printed_calculation_processor', [
        event.recipes.createDeploying('ae2:printed_calculation_processor', ['ae2:printed_calculation_processor', 'minecraft:redstone']),
        event.recipes.createDeploying('ae2:printed_calculation_processor', ['ae2:printed_calculation_processor', 'ae2:printed_silicon']),
        event.recipes.createPressing('ae2:printed_calculation_processor', 'ae2:printed_calculation_processor')
    ]).transitionalItem('ae2:printed_calculation_processor').loops(1)
    event.recipes.createSequencedAssembly([
        'ae2:engineering_processor'
    ], 'ae2:printed_engineering_processor', [
        event.recipes.createDeploying('ae2:printed_engineering_processor', ['ae2:printed_engineering_processor', 'minecraft:redstone']),
        event.recipes.createDeploying('ae2:printed_engineering_processor', ['ae2:printed_engineering_processor', 'ae2:printed_silicon']),
        event.recipes.createPressing('ae2:printed_engineering_processor', 'ae2:printed_engineering_processor')
    ]).transitionalItem('ae2:printed_engineering_processor').loops(1)

    // 线缆清洗
    event.recipes.create.splashing(['ae2:fluix_smart_cable'], ['#ae2:smart_cable'])
    event.recipes.create.splashing(['ae2:fluix_covered_cable'], ['#ae2:covered_cable'])
    event.recipes.create.splashing(['ae2:fluix_glass_cable'], ['#ae2:glass_cable'])
    event.recipes.create.splashing(['ae2:fluix_covered_dense_cable'], ['#ae2:covered_dense_cable'])
    event.recipes.create.splashing(['ae2:fluix_smart_dense_cable'], ['#ae2:smart_dense_cable'])

      // 应用能源2初期合成-必然要先探索陨石的限制
    event.replaceInput(
        { id: 'ae2:network/blocks/inscribers' },
        'minecraft:copper_ingot'  ,
        'ae2:certus_quartz_crystal'
    )
    event.replaceInput(
        { id: 'ae2:network/blocks/crystal_processing_charger' },
        'minecraft:copper_ingot'  ,
        'ae2:certus_quartz_crystal'
    )
})