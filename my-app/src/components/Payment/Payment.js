import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";


const Payment = () => {
  const publishableKey = "pk_test_ZU3mlTy0q00DATc9EyF9A8jX";
   
  const onToken = token => {
    const body = {
      amount: 999,
      token: token
  };

  axios
  .post("http://localhost:8000/payment", body)
  .then(response => {

    // axios
    //   .post(`http://localhost:8080/subscriptions/subscribe`, {
    //     trainer_id: id,
    //     student_id: props.studentData.id,
    //     student_name: props.studentData.name
    //   })
    //   .then(res => {
    //     alert("Thank you for your Subscription ");
    //   });
    console.log(response);
    alert("Payment Success");
  })
  .catch(error => {
    console.log("Payment Error: ", error);
    alert("Payment Error");
  });
};

return (
  <StripeCheckout
    label="Subscribe" //Component button text
    name="Custom Fitness" //Modal Header
    description="Upgrade to a premium account today."
    panelLabel="Subscribe to trainer" //Submit button in modal
    amount={999} //Amount in cents $9.99
    token={onToken}
    stripeKey={publishableKey}
    image="https://www.vidhub.co" //Pop-in header image
    billingAddress={false}
  />
);
};

export default Payment;