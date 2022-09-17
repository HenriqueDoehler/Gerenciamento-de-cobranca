import * as React from 'react'
import GlobalContext from '../contexts/globalContext'

function useGlobalContext(){
    return React.useContext(GlobalContext)
}
export default useGlobalContext