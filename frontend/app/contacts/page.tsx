import { getContacts } from '../../lib/contactUtils';

export default function contacts() {
  return (
    <div>
      {getContacts()}
    </div>
  );
}