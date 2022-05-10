import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Shipping from "@modules/checkout/components/shipping"
import { useCart } from "medusa-react"

const CheckoutForm = () => {
  const { cart } = useCart()

  const email = watch("email")

  useEffect(() => {
    const isValid = validateEmail(email)

    if (isValid) {
      setShowInit(true)
    } else {
      setShowInit(false)
    }
  }, [email])
  //setPaymentSession("razorpay")
  return (
    <div>
      <div className="w-full grid grid-cols-1 gap-y-8">
        <div>
          <Addresses />
        </div>

        <div>
          <Shipping cart={cart} />
        </div>

        <div>
          <Payment />
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
