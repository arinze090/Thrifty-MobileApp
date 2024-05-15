export const trackingPrecedence = propss => {
  const trackingStep = propss?.is_sent_out
    ? 1
    : propss?.is_delivered
    ? 3
    : propss?.is_received
    ? 3
    : 0;

  return trackingStep;
};

export const checkIfItemDeliveredAndSentOutIsNotTrue = propss => {
  const showValue = !propss?.is_sent_out && !propss?.is_delivered;
  console.log('showValue', showValue);
  return showValue;
};
