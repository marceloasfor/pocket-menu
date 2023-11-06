import { incrementQuantity, decrementQuantity, removeItem} from '@/redux/features/cart-slice'
import { useDispatch } from 'react-redux'

function CartItem({id, title, price, quantity=0}) {
  const dispatch = useDispatch()

  return (
    <>
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
        <div className="flex w-2/5">
            <div className="flex flex-col justify-between ml-4 flex-grow">
                <span className="font-bold text-sm">{title}</span>
                <button
                    className='font-semibold hover:text-red-500 text-gray-500 text-xs' 
                    onClick={() => dispatch(removeItem(id))}
                >Remove</button>
            </div>
        </div>
        <div className="flex justify-center w-1/5">
            <button className="fill-current text-gray-600 w-3" onClick={() => dispatch(decrementQuantity(id))}>-</button>
            <p className="mx-2 border text-center w-8">{quantity}</p>
            <button className="fill-current text-gray-600 w-3" onClick={() => dispatch(incrementQuantity(id))}>+</button>
        </div>
        <span className="text-center w-1/5 font-semibold text-sm">${price}</span>
        <span className="text-center w-1/5 font-semibold text-sm">${price * quantity}</span>
    </div>
    </>
  )
}

export default CartItem