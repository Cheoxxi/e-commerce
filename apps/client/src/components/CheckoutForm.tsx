"use client"

import { ShippingFormInputs } from "@repo/types"
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js"
import { FormEvent, useState } from "react";

const CheckoutForm = ({
    shippingForm,
}:{
    shippingForm:ShippingFormInputs; 
}) =>{

    const checkout = useCheckout();
    const [loading,setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        try {
            await checkout.updateEmail(shippingForm.email)
            await checkout.updateShippingAddress({
                name: shippingForm.name,
                address:{
                    line1:shippingForm.address,
                    city:shippingForm.city,
                    country: "VN",                
                },
            });
            
            const res = await  checkout.confirm();
            if(res.type==="error"){
                setErrorMessage(res.error.message || "Unable to confirm payment.");
            }
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Unable to confirm payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
    <form onSubmit={handleSubmit}>
        <PaymentElement options={{layout: 'accordion'}}/>
        <button type="submit" disabled={loading}>
            {loading ? "Loading...":"Thanh Toán"}
        </button>
        {errorMessage &&<div className="">{errorMessage}</div>}
    </form>
    );

};

export default CheckoutForm
