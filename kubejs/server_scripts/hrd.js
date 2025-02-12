ServerEvents.recipes(event => {
    // 应用能源2的难度加强
    event.replaceInput(
        {id:'ae2:network/blocks/inscribers'},
        'minecraft:copper_ingot',
        'ae2:certus_quartz_crystal'
    )

    // 加速火把的限制
    event.remove({input:'torcherino:compressed_torcherino'})
    event.remove({input:'torcherino:double_compressed_torcherino'})
    event.remove({output:'torcherino:compressed_torcherino'})
    event.remove({output:'torcherino:double_compressed_torcherino'})
    event.remove({id:'torcherino:torcherino'})
    event.shaped(
        'torcherino:torcherino',
        [
          'BAB',
          'ACA',
          'BAB'
        ],
        {
          A: 'tiab:time_in_a_bottle',
          B: '#amendments:sets_on_fire',
          C: 'minecraft:nether_star'
        }
      )
    event.shaped(
        'torcherino:compressed_torcherino',
        ['   ',' A ','   '],
        {A: 'minecraft:barrier'})
    event.shaped(
        'torcherino:double_compressed_torcherino',
        ['   ',' A ','   '],
        {A: 'minecraft:barrier'})
})