import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  type?: "input" | "textarea";
  props?: any;
  placeholder?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = "input",
  placeholder,
  className,
}) => (
  <div className="flex flex-col items-start gap-y-2 pb-4">
    <Label htmlFor={id}>{label}</Label>
    {type === "input" ? (
      <Input
        id={id}
        name={id}
        value={value}
        onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void}
        placeholder={placeholder}
        className={className}
      />
    ) : (
      <Textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void}
        placeholder={placeholder}
        className={className}
      />
    )}
  </div>
);

export default FormField;
