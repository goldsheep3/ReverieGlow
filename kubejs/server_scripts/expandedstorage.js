/**
 * "@vanilla"
 * @Bugfix
 */
ServerEvents.recipes(event => {
    event.remove({ id: 'expandedstorage:obsidian_to_netherite_conversion_kit' });
    event.smithing(
        'expandedstorage:obsidian_to_netherite_conversion_kit',
        'minecraft:netherite_upgrade_smithing_template',
        'minecraft:obsidian',
        'minecraft:netherite_ingot'
    ).id('expandedstorage:obsidian_to_netherite_conversion_kit')
})
