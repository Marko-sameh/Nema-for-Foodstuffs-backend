export interface AddressData {
  id: string;
  user_id: string;
  label: string;
  full_name: string;
  phone: string;
  street: string;
  city: string;
  governorate: string;
  postal_code: string | null;
  is_default: boolean;
}
