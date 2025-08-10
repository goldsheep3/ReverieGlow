/**
 * "@vanilla"
 */
ServerEvents.recipes(event => {

  event.shaped('botania:gaia_pylon',
    [
      ' A ',
      'BCB',
      ' A '
    ],
    {
      A: 'botania:pixie_dust',
      B: 'botania:elementium_ingot',
      C: 'botania:natura_pylon'
    }
  ).id('reglow:botania/gaia_pylon')

  event.remove({ id: 'mythicbotany:gaia_pylon' })

})