import React from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

const MessageComponent: React.FC = () => {
  return (
    <div>
      <FloatingWhatsApp
        phoneNumber="09036114805"
        accountName="Fleeks"
        statusMessage="welcome to fleeks grocery store"
        onSubmit={() => window.open('https://wa.me/+2349036114805')}
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
    </div>
  );
};

export default MessageComponent;
