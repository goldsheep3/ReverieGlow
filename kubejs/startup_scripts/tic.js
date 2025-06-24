StartupEvents.registry('fluid', event => {
    [
        ['molten_ironwood', '熔融骑士金属', 0xA1B18F],
        ['molten_steeleaf', '熔融炽铁', 0x47261F],
        ['molten_knightmetal', '熔融钢叶', 0x518539],
        ['molten_fiery', '熔融铁木', 0x817549],
        ['molten_void_steel', '熔融虚空钢', 0x258273],
    ].forEach(f => {
        event.create(f[0])
             .displayName(f[1])
             .thickTexture(f[2])
             .bucketColor(f[2])
    })
})