import RegistrationForm from "@/components/Registration/registrationForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationForm />
    </Suspense>
  );
}
