import { PaymentSession } from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import clsx from "clsx"
import React from "react"
import PaymentStripe from "../payment-stripe"
import PaymentRazorpay from "../payment-razorpay"
import PaymentTest from "../payment-test"

type PaymentContainerProps = {
  paymentSession: PaymentSession
  selected: boolean
  setSelected: () => void
  disabled?: boolean
}

const PaymentInfoMap: Record<string, { title: string; description: string }> = {
  stripe: {
    title: "Credit card",
    description: "Secure payment with credit card",
  },
  paypal: {
    title: "PayPal",
    description: "Secure payment with PayPal",
  },
  razorpay: {
    title: "Razorpay",
    description: "Test payment using medusa-payment-razorpay",
  },
  manual: {
    title: "Test payment",
    description: "Test payment using medusa-payment-manual",
  },
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selected,
  setSelected,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-y-4 border-t border-gray-200">
      <button
        className={clsx("col-span-2 flex items-start gap-x-4 px-2 py-4", {
          "bg-gray-50": selected,
        })}
        onClick={setSelected}
        disabled={disabled}
      >
        <Radio checked={selected} />
        <div className="flex flex-col text-left">
          <h3 className="text-base-semi text-gray-900">
            {PaymentInfoMap[paymentSession.provider_id].title}
          </h3>
          <span className="text-gray-700 text-small-regular">
            {PaymentInfoMap[paymentSession.provider_id].description}
          </span>
        </div>
      </button>
      {selected && (
        <div className="pl-11 pb-8">
          <PaymentElement paymentSession={paymentSession} />
        </div>
      )}
    </div>
  )
}

const PaymentElement = ({
  paymentSession,
}: {
  paymentSession: PaymentSession
}) => {
  switch (paymentSession.provider_id) {
    case "stripe":
      return (
        <div className="pt-8 pr-7">
          <PaymentStripe />
        </div>
      )
    case "razorpay":
        return (
          <div className="pt-8 pr-7">
            <PaymentRazorpay paymentSession={paymentSession} /> 
          </div>
        )
      
    case "manual":
      // We only display the test payment form if we are in a development environment
      return process.env.NODE_ENV === "development" ? <PaymentTest /> : null
    default:
      return null
  }
}

export default PaymentContainer
