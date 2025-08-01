/**
 * "@vanilla"
 */
ServerEvents.recipes(event => {

  const mek = global.mekanismLib(event);

  event.remove({ id: 'mekanism:metallurgic_infusing/dirt_to_mycelium' })
  mek.infusing('10mb mekanism:fungi', 'minecraft:dirt', 'minecraft:mycelium');

})

ServerEvents.tags('item', event => {
  event.remove('mekanism:infuse_type', 'mekanism:fungi');
})