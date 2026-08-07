export const inquiryTypes = [
  "General Question",
  "Sales Inquiry",
  "Technical Support",
  "Billing and Subscription",
  "Partnership",
  "Other",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export type ContactFormData = {
  fullName: string;
  mobile: string;
  email: string;
  inquiryType: string;
  subject: string;
  message: string;
  website: string;
  startedAt: number;
};

export type ContactField =
  | "fullName"
  | "mobile"
  | "email"
  | "inquiryType"
  | "subject"
  | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeBangladeshMobile(value: string) {
  const digits = value.replace(/\D/g, "");
  if (/^01[3-9]\d{8}$/.test(digits)) return `+88${digits}`;
  if (/^8801[3-9]\d{8}$/.test(digits)) return `+${digits}`;
  return null;
}

export function cleanContactText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
        .trim()
        .slice(0, maxLength)
    : "";
}

export function validateContactForm(data: ContactFormData) {
  const errors: ContactErrors = {};
  const fullName = data.fullName.trim();
  const email = data.email.trim();
  const subject = data.subject.trim();
  const message = data.message.trim();

  if (fullName.length < 2 || fullName.length > 100) {
    errors.fullName = "Enter your full name.";
  }
  if (data.mobile && !normalizeBangladeshMobile(data.mobile)) {
    errors.mobile = "Enter a valid Bangladesh mobile number.";
  }
  if (email && !emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.mobile.trim() && !email) {
    errors.mobile = "Enter a mobile number or email address.";
    errors.email = "Enter an email address or mobile number.";
  }
  if (!inquiryTypes.includes(data.inquiryType as InquiryType)) {
    errors.inquiryType = "Select an inquiry type.";
  }
  if (subject.length < 3 || subject.length > 150) {
    errors.subject = "Enter a subject between 3 and 150 characters.";
  }
  if (message.length < 10) {
    errors.message = "Please provide a little more detail about your question.";
  }
  if (message.length > 3000) {
    errors.message = "Keep your message within 3,000 characters.";
  }

  return errors;
}
