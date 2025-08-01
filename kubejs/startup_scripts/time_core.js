StartupEvents.registry('item', event => {

    event.create('time_core')
        .displayName('时间核心')
        .tooltip('§7在快捷栏第一格持有§4时间之瓶§7时，手持时间核心潜行右击可以增加时间之瓶的§a1§7小时时间。')

    event.create('compressed_time_core')
        .displayName('压缩时间核心')
        .tooltip('§7在快捷栏第一格持有§4时间之瓶§7时，手持压缩时间核心潜行右击可以增加时间之瓶的§a10§7小时时间。')

    event.create('double_compressed_time_core')
        .displayName('二重压缩时间核心')
        .tooltip('§7在快捷栏第一格持有§4时间之瓶§7时，手持二重压缩时间核心潜行右击可以增加时间之瓶的§a100§7小时时间。')

    event.create('dragon_egg_fragment')
        .displayName('龙蛋碎片')
        .tooltip('§7用于合成二重压缩时间核心。§4不可食用§7。')

    })