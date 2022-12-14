import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingContext";
import { formatCurrency } from "../utilities/formatCurrency" 

type StoreItemProps = {
    id:number,
    name:string,
    price:number,
    imgUrl:string
}

export function StoreItem({id, name, price, imgUrl}:StoreItemProps){

    const {
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeQuantity
    } = useShoppingCart()
    const quantity = getItemQuantity(id);
    return(
        <Card className='h-100'>
      <Card.Img
      variant='top'
      src={imgUrl}
      height='200px'
      style={{objectFit:'cover'}}/>
      <Card.Body className='d-flex flex-column'>
          <Card.Title className='d-flex 
          justify-content-between align-items-baseline mb-4'>
          <span className='fs-2'>{name}</span>
          <span className='ms-2 text-muted'>{formatCurrency(price)}</span>

          </Card.Title>
          <div className="mt-auto">
          {quantity=== 0 ? <Button className='w-100' onClick={()=>increaseQuantity(id)}>Add to cart</Button> : 
          <div className='d-flex align-items-center flex-column' style={{gap:'.5rem'}}>
              <div className='d-flex align-items-center justify-content-center'>
                  <Button onClick = {()=>decreaseQuantity(id)}>-</Button>
                  <div>
                  <span className='fs-3'>{quantity}</span>
                 </div>
                  <Button onClick={()=>increaseQuantity(id)}>+</Button>
              </div>
              <Button variant='danger' size='sm' onClick={()=>removeQuantity(id)}>Remove</Button>
              </div>}
          </div>
      </Card.Body>
        </Card>
    )
}