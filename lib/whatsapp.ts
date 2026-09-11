/**
 * WhatsApp URL builder.
 * Generates wa.me links with pre-filled, contextual messages.
 */

const WHATSAPP_NUMBER = '919496818237';

interface WhatsAppMessageOptions {
  reference?: string;
  name?: string;
  mobile?: string;
  equipment?: string;
  brand?: string;
  problem?: string;
  product?: string;
  module?: string;
  orgName?: string;
  customerType?: string;
  siteLocation?: string;
  cameraCount?: string;
  timeline?: string;
  service?: string;
  notes?: string;
  area?: string;
  dateFrom?: string;
  destination?: string;
  travellers?: string;
}

/**
 * Build a WhatsApp URL with a pre-filled message.
 */
export function buildWhatsAppUrl(options: WhatsAppMessageOptions = {}): string {
  let message = '';

  if (options.reference) message += `Reference: ${options.reference}\n`;
  if (options.name) message += `Name: ${options.name}\n`;
  if (options.mobile) message += `Mobile: ${options.mobile}\n`;
  if (options.orgName) message += `Organisation: ${options.orgName}\n`;
  if (options.customerType) message += `Customer Type: ${options.customerType}\n`;
  if (options.service) message += `Service: ${options.service}\n`;
  if (options.equipment) message += `Equipment: ${options.equipment}\n`;
  if (options.brand) message += `Brand: ${options.brand}\n`;
  if (options.product) message += `Product: ${options.product}\n`;
  if (options.problem) message += `Problem: ${options.problem}\n`;
  if (options.siteLocation) message += `Location: ${options.siteLocation}\n`;
  if (options.area) message += `Area: ${options.area}\n`;
  if (options.cameraCount) message += `Cameras: ${options.cameraCount}\n`;
  if (options.timeline) message += `Timeline: ${options.timeline}\n`;
  if (options.dateFrom) message += `Travel Date: ${options.dateFrom}\n`;
  if (options.destination) message += `Destination: ${options.destination}\n`;
  if (options.travellers) message += `Travellers: ${options.travellers}\n`;
  if (options.notes) message += `Notes: ${options.notes}\n`;

  if (!message) {
    // Default contextual messages per module
    switch (options.module) {
      case 'service': message = 'Hi, I need help with a repair. Can you assist?'; break;
      case 'security': message = 'Hi, I would like to discuss a security installation.'; break;
      case 'travel': message = 'Hi, I have a travel enquiry.'; break;
      case 'technology': message = 'Hi, I have a product enquiry.'; break;
      case 'online-services': message = 'Hi, I need help with an online or government service.'; break;
      default: message = 'Hi, I have an enquiry for Hitech.';
    }
  }

  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Build a WhatsApp URL for a service request confirmation.
 */
export function buildServiceWhatsAppUrl(data: {
  reference: string;
  name: string;
  equipment: string;
  brand: string;
  problem: string;
}): string {
  return buildWhatsAppUrl({
    reference: data.reference,
    name: data.name,
    equipment: data.equipment,
    brand: data.brand,
    problem: data.problem,
  });
}

/**
 * Build a WhatsApp URL for a product enquiry.
 */
export function buildProductWhatsAppUrl(
  productName: string,
  brand: string
): string {
  return buildWhatsAppUrl({
    product: `${brand} ${productName}`,
    module: 'technology',
  });
}

export { WHATSAPP_NUMBER };
