/**
 * Compute the D&D ability score modifier from a raw score.
 * Standard 5e formula: floor((score - 10) / 2).
 *
 * Returns a string formatted with sign, e.g. "+3", "+0", "-1".
 */
export const getAbilityModifier = (score) => {
  const modifier = Math.floor((score - 10) / 2)
  return modifier >= 0 ? `+${modifier}` : `${modifier}`
}