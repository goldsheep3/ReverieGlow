ServerEvents.recipes(event => {

  // 时间核心的合成配方
  event.shaped(
    'kubejs:time_core',
    [
      'AAA',
      'BCB',
      'DED'
    ],
    {
      A: 'minecraft:gold_ingot',
      B: 'minecraft:diamond',
      C: 'minecraft:clock',
      D: 'minecraft:lapis_lazuli',
      E: 'minecraft:snowball'
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
      B: 'kubejs:dragon_egg_fragment'
    }
  ).id('kubejs:double_compressed_time_core')
  // 龙蛋碎片
  event.shapeless(
    '4x kubejs:dragon_egg_fragment', ['minecraft:dragon_egg']
  ).id('kubejs:dragon_egg_to_fragment')

  // 时间之瓶的合成修改
  event.remove({ id: 'tiab:time_in_a_bottle' })  // 删除原有的时间之瓶配方，因为雪球的关系多了点难度
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

// 时间核心补充时间之瓶时间 
ItemEvents.rightClicked(event => {
  const ONE_HOUR = 72000;
  const { player, item, hand } = event

  // 时间核心配置
  const timeCoreConfig = {
    'kubejs:time_core': { hours: 1 },
    'kubejs:compressed_time_core': { hours: 10 },
    'kubejs:double_compressed_time_core': { hours: 100 }
  };

  // 检查是否是支持的时间核心
  const coreConfig = timeCoreConfig[item.id];
  if (player.isCrouching() && coreConfig) {
    let foundBottle = false

    // 获取物品数组
    const hotbarItems = player.inventory.getAllItems()
    for (let i = 0; i < hotbarItems.length; i++) {
      const slotItem = hotbarItems[i]
      if (slotItem.id === 'tiab:time_in_a_bottle') {
        foundBottle = true

        // 获取或初始化 NBT
        const nbt = slotItem.nbt || {}
        const storedTimeValue = nbt.storedTime || 0
        const totalAccumulatedTimeValue = nbt.totalAccumulatedTime || 0

        // 增加时间值
        const timeToAdd = coreConfig.hours * ONE_HOUR;
        nbt.storedTime = storedTimeValue + timeToAdd
        nbt.totalAccumulatedTime = totalAccumulatedTimeValue + timeToAdd

        // 更新物品，给予提示
        player.inventory.setItem(i, Item.of('tiab:time_in_a_bottle', 1).withNBT(nbt))
        const bottleName = player.inventory.getItem(i).getDisplayName().getString()
        const hours = Math.floor(nbt.storedTime / ONE_HOUR)
        const minutes = Math.floor((nbt.storedTime % ONE_HOUR) / 1200) // 1200 ticks = 1 minute
        const seconds = Math.floor((nbt.storedTime % 1200) / 20) // 20 ticks = 1 second
        const remainingTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        player.tell(Text.green(`[TimeCore] ${bottleName} 时间增长了 ${coreConfig.hours} 小时! 当前剩余 ${remainingTime}`))

        // 消耗时间核心
        const newCount = item.count - 1
        if (newCount <= 0) {
          player.setItemInHand(hand, Item.of('minecraft:air'))
        } else {
          player.setItemInHand(hand, item.withCount(newCount))
        }

        break
      }
    }

    if (!foundBottle) {
      player.tell(Text.red(`[TimeCore] 未找到时间之瓶。`))
    }
    event.cancel()
  }
})