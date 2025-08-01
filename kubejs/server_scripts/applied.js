/**
 * "@vanilla"
 */
ServerEvents.recipes(event => {
  // 应用能源2初期合成-必然要先探索陨石的限制
  event.replaceInput(
    { id: 'ae2:network/blocks/inscribers' },
    'minecraft:copper_ingot',
    'ae2:certus_quartz_crystal'
  )
  event.replaceInput(
    { id: 'ae2:network/blocks/crystal_processing_charger' },
    'minecraft:copper_ingot',
    'ae2:certus_quartz_crystal'
  )

  // 【没那么神秘的方块】的通用压印设置
  function ae2_inscribe_inscriber(bottom, middle, top, output) {
    const result = {
      "type": "ae2:inscriber",
      "ingredients": {
        "middle": {
          "item": middle
        }
      },
      "mode": "inscribe",
      "result": {
        "item": output
      }
    }
    if (bottom) { result.ingredients.bottom = { item: bottom }; }
    if (top) { result.ingredients.top = { item: top }; }
    return event.custom(result);
  }
  ae2_inscribe_inscriber(null, 'minecraft:gold_ingot', 'ae2:not_so_mysterious_cube', 'ae2:printed_logic_processor').id('kubejs:ae2/inscriber/universal_logic_processor');
  ae2_inscribe_inscriber(null, 'minecraft:diamond', 'ae2:not_so_mysterious_cube', 'ae2:printed_engineering_processor').id('kubejs:ae2/inscriber/universal_engineering_processor');
  ae2_inscribe_inscriber(null, 'ae2:certus_quartz_crystal', 'ae2:not_so_mysterious_cube', 'ae2:printed_calculation_processor').id('kubejs:ae2/inscriber/universal_calculation_processor');
  ae2_inscribe_inscriber(null, 'ae2:silicon', 'ae2:not_so_mysterious_cube', 'ae2:printed_silicon').id('kubejs:ae2/inscriber/universal_silicon');
})

/**
 * "@create"
 */
ServerEvents.recipes(event => {
  // 电路板压印
  event.recipes.create.deploying('ae2:printed_logic_processor', ['minecraft:gold_ingot', 'ae2:logic_processor_press']).keepHeldItem().id('kubejs:create/deploying/logic_processor_press');
  event.recipes.create.deploying('ae2:printed_calculation_processor', ['ae2:certus_quartz_crystal', 'ae2:calculation_processor_press']).keepHeldItem().id('kubejs:create/deploying/calculation_processor_press');
  event.recipes.create.deploying('ae2:printed_engineering_processor', ['minecraft:diamond', 'ae2:engineering_processor_press']).keepHeldItem().id('kubejs:create/deploying/engineering_processor_press');
  event.recipes.create.deploying('ae2:printed_silicon', ['ae2:silicon', 'ae2:silicon_press']).keepHeldItem().id('kubejs:create/deploying/silicon_press');
  // 电路板通用压印
  event.recipes.create.deploying('ae2:printed_logic_processor', ['minecraft:gold_ingot', 'ae2:not_so_mysterious_cube']).keepHeldItem().id('kubejs:create/deploying/universal_logic_processor_press');
  event.recipes.create.deploying('ae2:printed_calculation_processor', ['ae2:certus_quartz_crystal', 'ae2:not_so_mysterious_cube']).keepHeldItem().id('kubejs:create/deploying/universal_calculation_processor_press');
  event.recipes.create.deploying('ae2:printed_engineering_processor', ['minecraft:diamond', 'ae2:not_so_mysterious_cube']).keepHeldItem().id('kubejs:create/deploying/universal_engineering_processor_press');
  event.recipes.create.deploying('ae2:printed_silicon', ['ae2:silicon', 'ae2:not_so_mysterious_cube']).keepHeldItem().id('kubejs:create/deploying/universal_silicon_press');
  // 处理器压印
  event.recipes.createSequencedAssembly([
    'ae2:logic_processor'
  ], 'ae2:printed_logic_processor', [
    event.recipes.createDeploying('ae2:printed_logic_processor', ['ae2:printed_logic_processor', 'minecraft:redstone']),
    event.recipes.createDeploying('ae2:printed_logic_processor', ['ae2:printed_logic_processor', 'ae2:printed_silicon']),
    event.recipes.createPressing('ae2:printed_logic_processor', 'ae2:printed_logic_processor')
  ]).transitionalItem('ae2:printed_logic_processor').loops(1).id('kubejs:create/sequenced_assembly/logic_processor');
  event.recipes.createSequencedAssembly([
    'ae2:calculation_processor'
  ], 'ae2:printed_calculation_processor', [
    event.recipes.createDeploying('ae2:printed_calculation_processor', ['ae2:printed_calculation_processor', 'minecraft:redstone']),
    event.recipes.createDeploying('ae2:printed_calculation_processor', ['ae2:printed_calculation_processor', 'ae2:printed_silicon']),
    event.recipes.createPressing('ae2:printed_calculation_processor', 'ae2:printed_calculation_processor')
  ]).transitionalItem('ae2:printed_calculation_processor').loops(1).id('kubejs:create/sequenced_assembly/calculation_processor');
  event.recipes.createSequencedAssembly([
    'ae2:engineering_processor'
  ], 'ae2:printed_engineering_processor', [
    event.recipes.createDeploying('ae2:printed_engineering_processor', ['ae2:printed_engineering_processor', 'minecraft:redstone']),
    event.recipes.createDeploying('ae2:printed_engineering_processor', ['ae2:printed_engineering_processor', 'ae2:printed_silicon']),
    event.recipes.createPressing('ae2:printed_engineering_processor', 'ae2:printed_engineering_processor')
  ]).transitionalItem('ae2:printed_engineering_processor').loops(1).id('kubejs:create/sequenced_assembly/engineering_processor');

  // 线缆清洗
  event.recipes.create.splashing(['ae2:fluix_smart_cable'], ['#ae2:smart_cable']).id('kubejs:create/splashing/fluix_smart_cable');
  event.recipes.create.splashing(['ae2:fluix_covered_cable'], ['#ae2:covered_cable']).id('kubejs:create/splashing/fluix_covered_cable');
  event.recipes.create.splashing(['ae2:fluix_glass_cable'], ['#ae2:glass_cable']).id('kubejs:create/splashing/fluix_glass_cable');
  event.recipes.create.splashing(['ae2:fluix_covered_dense_cable'], ['#ae2:covered_dense_cable']).id('kubejs:create/splashing/fluix_covered_dense_cable');
  event.recipes.create.splashing(['ae2:fluix_smart_dense_cable'], ['#ae2:smart_dense_cable']).id('kubejs:create/splashing/fluix_smart_dense_cable');
})