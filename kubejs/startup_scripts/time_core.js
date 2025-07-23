StartupEvents.registry('item', event => {

    event.create('time_core')
        .displayName('时间核心')
        .tooltip('§7潜行右击，可以增加快捷栏中时间之瓶的 §a1 §7小时时间。')

    event.create('compressed_time_core')
        .displayName('压缩时间核心')
        .tooltip('§7潜行右击，可以增加快捷栏中时间之瓶的 §a10 §7小时时间。')

    event.create('double_compressed_time_core')
        .displayName('二重压缩时间核心')
        .tooltip('§7潜行右击，可以增加快捷栏中时间之瓶的 §a100 §7小时时间。')

    event.create('dragon_egg_fragment')
        .displayName('龙蛋碎片')
        .tooltip('§7用于合成二重压缩时间核心。不可食用。')
})