import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { AuthButtonGroup } from "./AuthButtonGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/Schemas";

export function SignupForm() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <InputField
              control={control}
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Doe"
            />
            <InputField
              control={control}
              label="Email"
              name="email"
              type="email"
              placeholder="m@example.com"
            >
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </InputField>

            <InputField
              control={control}
              label="Password"
              name="password"
              type="password"
            />
            <InputField
              control={control}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <AuthButtonGroup mode="signup" />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
