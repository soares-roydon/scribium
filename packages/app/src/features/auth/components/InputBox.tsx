import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignupInput {
   text: string;
   placeholder: string;
}

const InputBox = ({ text, placeholder }: SignupInput) => {
   return (
      <div className="flex flex-col gap-2 my-1">
         <Label className="font-normal">{text}</Label>
         <Input placeholder={placeholder} />
      </div>
   );
};

export default InputBox;
