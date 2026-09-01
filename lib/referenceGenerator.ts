/**
 * Generate a reference number for form submissions.
 * Format: HT-{MODULE}-YYMMDD-NNN
 *
 * Module codes:
 *   SR = Service Request
 *   SS = Security / Site Survey
 *   IN = Institutions
 *   TR = Travel
 *   OS = Online Services
 *   GE = General Enquiry
 *   OR = Order
 */

type ModuleCode = 'SR' | 'SS' | 'IN' | 'TR' | 'OS' | 'GE' | 'OR';

let counter = 0;

export function generateReference(module: ModuleCode): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');

  // In production, this counter would come from a backend.
  // For v1 client-side generation, we use a random suffix.
  counter++;
  const nnn = String(
    Math.floor(Math.random() * 900) + 100 + counter
  )
    .slice(-3)
    .padStart(3, '0');

  return `HT-${module}-${yy}${mm}${dd}-${nnn}`;
}
