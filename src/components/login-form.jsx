import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";
import { signInSchema } from "@/Schemas";
import { AuthButtonGroup } from "./AuthButtonGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => console.log(data);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn("flex flex-col gap-6")}
        >
          <FieldGroup>
            <InputField
              control={control}
              label="Email"
              name="email"
              type="email"
            />

            <InputField
              control={control}
              label="Password"
              name="password"
              type="password"
              labelAction={
                <a
                  href="/forgot-password"
                  className="ml-auto text-white inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              }
            />
            <AuthButtonGroup mode="signin" isSubmitting={isSubmitting} />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
