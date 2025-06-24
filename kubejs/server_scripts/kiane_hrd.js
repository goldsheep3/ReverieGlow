ServerEvents.recipes(event => {
  // 应用能源2初期合成-必然要先探索陨石的限制
  event.replaceInput(
    { id: 'ae2:network/blocks/inscribers' },
    'minecraft:copper_ingot',
    'ae2:certus_quartz_crystal'
  )

  // 时间核心的合成配方
  event.shaped(
    'kubejs:time_core',
    [
      'AAA',
      'BCB',
      'D D'
    ],
    {
      A: 'minecraft:gold_ingot',
      B: 'minecraft:diamond',
      C: 'minecraft:clock',
      D: 'minecraft:lapis_lazuli'
    }
  ).id('kubejs:time_core')
  event.shaped(
    'kubejs:compressed_time_core',
    [
      'AAA',
      'ABA',
      'AAA'
    ],
    {
      A: 'kubejs:time_core',
      B: 'minecraft:ender_eye'
    }
  ).id('kubejs:compressed_time_core')
  event.shaped(
    'kubejs:double_compressed_time_core',
    [
      'AAA',
      'ABA',
      'AAA'
    ],
    {
      A: 'kubejs:compressed_time_core',
      B: 'minecraft:dragon_egg'
    }
  ).id('kubejs:double_compressed_time_core')

  // 时间之瓶的合成修改
  event.remove({ id: 'tiab:time_in_a_bottle' })  // 删除原有的时间之瓶配方
  event.shapeless(
    'tiab:time_in_a_bottle', ['kubejs:time_core', 'minecraft:glass_bottle']
  ).id('kubejs:time_core_into_bottle')
  event.shapeless(
    'kubejs:time_core',
    ['tiab:time_in_a_bottle']
  ).replaceIngredient({ item: 'tiab:time_in_a_bottle' }, Item.of('minecraft:glass_bottle')).id('kubejs:time_core_from_bottle')

  // 加速火把的合成修改
  event.remove({ id: 'torcherino:torcherino' })
  event.shaped(
    '2x torcherino:torcherino',
    [
      'BAB',
      'ACA',
      'BAB'
    ],
    {
      A: 'kubejs:time_core',
      B: '#amendments:sets_on_fire',
      C: 'minecraft:nether_star'
    }
  ).id('kubejs:torcherino')
  event.remove({ id: 'torcherino:compressed_torcherino' })
  event.remove({ id: 'torcherino:compressed_torcherino_to_single' })
  event.shaped(
    'torcherino:compressed_torcherino',
    [
      'BAB',
      'ACA',
      'BAB'
    ],
    {
      A: 'kubejs:compressed_time_core',
      B: 'torcherino:torcherino',
      C: 'minecraft:nether_star'
    }
  ).id('kubejs:compressed_torcherino')
  event.remove({ id: 'torcherino:double_compressed_torcherino' })
  event.remove({ id: 'torcherino:double_compressed_torcherino_to_compressed' })
  event.shaped(
    'torcherino:double_compressed_torcherino',
    [
      'BAB',
      'ACA',
      'BAB'
    ],
    {
      A: 'kubejs:double_compressed_time_core',
      B: 'torcherino:compressed_torcherino',
      C: 'minecraft:nether_star'
    }
  ).id('kubejs:double_compressed_torcherino')
})
