import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  onValueChange: (...event: any[]) => void;
  defaultValue: LicenseType;
};

const SelectLicenseFormItem = ({ onValueChange, defaultValue }: Props) => {
  return (
    <FormItem>
      <FormLabel>License</FormLabel>
      <Select onValueChange={onValueChange} defaultValue={defaultValue}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a license to display" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="exclusive">Exclusive</SelectItem>
          <SelectItem value="non_commercial">Non Commercial</SelectItem>
          <SelectItem value="exclusive_non_commercial">
            Exclusive Non Commercial
          </SelectItem>
        </SelectContent>
      </Select>
      <FormDescription>
        Carefully choose how you want your work to be used. It is irrevocable!
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default SelectLicenseFormItem;
