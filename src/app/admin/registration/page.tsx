import RegistrationForm from "@/src/components/registration/registrationForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationForm />
    </Suspense>
  );
}
