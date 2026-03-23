import { useController } from "react-hook-form";
import { Input } from "@/components/ui/input.jsx";
import { Field, FieldLabel, FieldError } from "@/components/ui/field.jsx";

const InputField = ({
  control,
  label,
  name,
  labelAction,
  children,
  ...InputProps
}) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    control,
    name,
  });

  return (
    <Field data-invalid={invalid}>
      <div className="flex items-center justify-between mb-1">
        <FieldLabel htmlFor={name}>
          {invalid ? error?.message : label}
        </FieldLabel>
        {labelAction && <div className="text-sm">{labelAction}</div>}
      </div>

      <Input id={name} {...field} {...InputProps} aria-invalid={invalid} />
      {children}
    </Field>
  );
};

export default InputField;
