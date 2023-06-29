import React from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

const MessageComponent: React.FC = () => {
  return (
    <div>
      <FloatingWhatsApp
        phoneNumber="09036114805"
        accountName="Fleeks"
        statusMessage="welcome to fleeks grocery store"
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
    </div>
  );
};

export default MessageComponent;
