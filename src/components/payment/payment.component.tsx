import { useState } from 'react';
import { StripeCardElement } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import Button from 'components/button/button.component';
import { useAppSelector } from 'store/hooks';

import './payment.styles.scss';
import { selectTotalPrice } from 'store/cart/cart.selectors';
import { selectCurrentUser } from 'store/user/user.selectors';

const Payment = ({}: PaymentProps) => {
  const amount = useAppSelector(selectTotalPrice);
  const currentUser = useAppSelector(selectCurrentUser);

  const [isProcessing, setIsProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Stripe.js has not yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const cardDetails = elements.getElement(CardElement);

    if (!isValidCardElement(cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    });

    setIsProcessing(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful');
      }
    }
  };

  return (
    <div className="payment-container ">
      <form className="payment-form-container" onSubmit={paymentHandler}>
        <h2 style={{ marginBottom: '20px' }}>Credit Card Payment: </h2>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '18px',
                '::placeholder': { color: '#87bbfd  ' },
              },
              invalid: { color: '#f87171', iconColor: '#f87171' },
            },
            hidePostalCode: true,
          }}
        />
        <Button
          buttonType="inverted"
          type="submit"
          isLoading={isProcessing}
          style={{ marginTop: '20px', marginLeft: 'auto' }}
        >
          Pay now
        </Button>
      </form>
    </div>
  );
};

export default Payment;

/* Types */
export type PaymentProps = {};

/* Helper Function */
const isValidCardElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null;
