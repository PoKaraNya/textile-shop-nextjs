import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props {
  label: string
  value: {
    name: string,
    title: string
  }[]
}

export function RadioButtons({ value, label }: Props) {
  const randString = Math.random().toString(36);
  return (
    <div className="grid gap-2">
      <Label className="text-base" htmlFor={randString}>
        {label}
      </Label>
      <RadioGroup className="flex items-center gap-2" defaultValue={value[0].name} id={randString}>
        {value.map(({ name, title }) => (
          <Label
            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
            htmlFor={`${randString}-${name}`}
          >
            <RadioGroupItem id={`${randString}-${name}`} value={name} />
            {title}
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
