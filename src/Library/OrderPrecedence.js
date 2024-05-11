export function refundPrecedence(props) {
  if (props?.is_refunded) {
    return props?.is_refunded;
  } else if (props?.is_cancelled) {
    return props?.is_cancelled;
  } else if (props?.is_completed) {
    return props?.is_completed;
  } else {
    return null;
  }
}

export const orderColorPrecedence = (
  propss,
  canceledColor,
  completedColor,
  pendingColor,
) => {
  const colorPrecedence = propss?.is_refunded
    ? canceledColor
    : propss?.is_cancelled
    ? canceledColor
    : propss?.is_completed
    ? completedColor
    : pendingColor;

  return colorPrecedence;
};

export const orderDetailsTextPrecedence = propss => {
  const textPreference = propss?.is_refunded
    ? 'Refunded'
    : propss?.is_rejected
    ? 'Cancelled'
    : propss?.is_sent_out
    ? 'Dispatched'
    : propss?.is_delivered
    ? 'Delivered'
    : propss?.is_settled
    ? 'Completed'
    : 'In Progress';

  return textPreference;
};

export const orderDetailsColorPrecedence = (
  propss,
  canceledColor,
  sentOutColor,
  deliveredColor,
  completedColor,
  pendingColor,
) => {
  const colorPrecedence = propss?.is_refunded
    ? canceledColor
    : propss?.is_rejected
    ? canceledColor
    : propss?.is_sent_out
    ? sentOutColor
    : propss?.is_delivered
    ? deliveredColor
    : propss?.is_settled
    ? completedColor
    : pendingColor;

  return colorPrecedence;
};

export const showOrderDetailsTimer = propss => {
  const showTimer =
    !propss?.is_completed && !propss?.is_refunded && !propss?.is_cancelled;
  console.log('showTimer', showTimer);
  return showTimer;
};

export const showNotificationText = propss => {
  const showText =
    !propss?.is_completed && !propss?.is_refunded && !propss?.is_cancelled;
  console.log('showText', showText);
  return showText;
};

export const ifCompletedAndRefundedAndCancelledIsNotTrue = propss => {
  const showValue =
    !propss?.is_completed && !propss?.is_refunded && !propss?.is_cancelled;
  console.log('showValue', showValue);
  return showValue;
};

export const ifCompletedAndRefundedIsNotTrue = propss => {
  const showValueX = !propss?.is_completed && !propss?.is_refunded;
  console.log('showValueX', showValueX);
  return showValueX;
};
