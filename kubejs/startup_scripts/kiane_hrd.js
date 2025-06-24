StartupEvents.registry('item', event => {
    event.create('time_core')
        .displayName('时间核心')
    event.create('compressed_time_core')
        .displayName('压缩时间核心')
    event.create('double_compressed_time_core')
        .displayName('两倍压缩时间核心')
})