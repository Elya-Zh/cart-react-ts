import { createContext, ReactNode, useContext,useState } from "react";

const ShoppingCartContext = createContext({} as ShoppingCartContext)
export function useShoppingCart(){
return useContext(ShoppingCartContext)
}

type ShoppingCartProviderProps = {
    children:ReactNode
}
type CartItems = {
id:number,
quantity:number
}

type ShoppingCartContext = {
    getItemQuantity: (id:number) => number
    increaseQuantity: (id:number) => void
    decreaseQuantity: (id:number) => void
    removeQuantity: (id:number) => void
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){
    const [cartItems,setItems] = useState<CartItems[]>([])
    
 function getItemQuantity(id:number){
   return cartItems.find(item => item.id === id)?.quantity || 0
    }
  function increaseQuantity(id:number){
      setItems(currItems => {
          if(currItems.find(item => item.id === id) == null){
              return [...currItems,{id,quantity:1}]
          }else{
              return currItems.map(item =>{
                  if(item.id=== id){
                      return {...item,quantity:item.quantity+1}
                  }else{
                      return item;
                  }
              })
          }
      })
  }  

  function decreaseQuantity(id:number){
    setItems(currItems => {
        if(currItems.find(item => item.id === id)?.quantity===1){
            return currItems.filter(item=>item.id !== id)
        }else{
            return currItems.map(item =>{
                if(item.id=== id){
                    return {...item,quantity:item.quantity -1}
                }else{
                    return item;
                }
            })
        }
    })
} 

function removeQuantity(id:number){
  setItems(currItems =>
    currItems.filter(item=> item.id !== id)
  )
}
    
    return (<ShoppingCartContext.Provider value={{
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeQuantity}}>
        {children}
    </ShoppingCartContext.Provider>)
}