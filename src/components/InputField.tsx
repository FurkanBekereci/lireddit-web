import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
    textarea?: boolean;
  };

const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  const InputOrTextArea = textarea ? Textarea : Input;

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={props.id ? props.id : undefined}>{label}</FormLabel>
      <InputOrTextArea
        {...field}
        {...props}
        id={props.id ? props.id : undefined}
      />
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
