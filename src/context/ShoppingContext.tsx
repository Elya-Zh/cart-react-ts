import { createContext, ReactNode, useContext,useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
    openCart: ()=> void
    closeCart: ()=> void
    getItemQuantity: (id:number) => number
    increaseQuantity: (id:number) => void
    decreaseQuantity: (id:number) => void
    removeFromCart: (id:number) => void
    cartQuantity:number
    cartItems:CartItems[]
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){
    const [cartItems,setItems] = useLocalStorage<CartItems[]>('shopping-cart',[])
    const [isOpen,setIsOpen] = useState(false)

    const cartQuantity = cartItems.reduce((quantity,item)=>
    item.quantity + quantity, 0)

    const openCart = () =>setIsOpen(true);
    const closeCart = () =>setIsOpen(false)

    
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

function removeFromCart(id:number){
  setItems(currItems =>
    currItems.filter(item=> item.id !== id)
  )
}
    
    return (<ShoppingCartContext.Provider value={{
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart}}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>)
}