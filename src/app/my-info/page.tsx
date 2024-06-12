import DeliveryStatus from './_components/DeliveryStatus/DeliveryStatus';
import UserProfile from './_components/UserProfile/UserProfile';

export default function MyInfo() {
  return (
    <section>
      <UserProfile />
      <DeliveryStatus />
    </section>
  );
}
