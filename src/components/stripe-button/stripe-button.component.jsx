import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JfCedLsUVr0vuHrTjpIFEmNUtibIpazyAiTKGEdjAXlQ8FmlD7OGDu61J6ZIMsr5TYY7XgKBYKjLpqxETJR4Byc00wBZYoaG6';


    const onToken = token => {
        console.log(token);
        alert('Payement Successful');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;