
/*
the react-navigation uses the highest level component to get it's 'navigationOptions',
since the main component will not be the highest level after running composeComponent,
we need to save the "navigationOptions" and reapply them to the final component
*/
export function composeComponent(ServerInput) {
  return (wrappers = []) => {
    let { navigationOptions } = ServerInput
    let ComposedEl = ServerInput
    for (let wrapper of wrappers) {
      ComposedEl = wrapper(ComposedEl)
    }
    ComposedEl.navigationOptions = navigationOptions
    return ComposedEl
  }
}

export function isValidIp(ip) {
  if (!ip) return false
  let hasMatch = ip.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm)
  return !!hasMatch
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
