// Custom event for cart updates
export const CART_UPDATED_EVENT = 'cartUpdated';

// Function to dispatch cart update event
export const dispatchCartUpdate = () => {
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}; 