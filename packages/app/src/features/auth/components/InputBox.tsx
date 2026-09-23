import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ChangeEventHandler } from 'react';

interface Props {
   text: string;
   placeholder: string;
   onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}

const InputBox = ({ text, placeholder, onChange }: Props) => {
   return (
      <div className="flex flex-col gap-2 my-1">
         <Label className="font-normal">{text}</Label>
         <Input placeholder={placeholder} onChange={onChange} />
      </div>
   );
};

export default InputBox;
