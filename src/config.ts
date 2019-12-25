export const targetDir = '.'
//_______________________________________________________
//
export const constants = {}
//_______________________________________________________
//
export const config = () => ({
  errorThrethold: 0,
  targetDir,
  constants
})
//_______________________________________________________
//
export type Constants = typeof constants
export type Config = ReturnType<typeof config>
