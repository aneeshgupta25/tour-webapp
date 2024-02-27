import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51Oo9h5SIQEALH44LImzaYKFFDLJywJuST8nINk8U30DsGq0mZpcEqCKG45Dr17AHZzSovTVqM2SaFk7DIoooSwny00KRacDBQl',
    );
    // 1. Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`,
    );
    // console.log(session);

    // 2. Create checkout form + Charge the Credit Card
    // await stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });
    window.location.replace(session.data.session.url);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
