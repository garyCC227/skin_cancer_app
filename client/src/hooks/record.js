
import React from 'react'

export const StoreContext = React.createContext(null)

export default ({ children }) => {
  const [index, setIndex] = React.useState(0)

  return <StoreContext.Provider value={{index, setIndex}}>{children}</StoreContext.Provider>
}