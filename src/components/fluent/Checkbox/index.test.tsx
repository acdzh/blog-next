import { Checkbox } from './index';
export const CheckboxGallery = () => {
  return (
    <>
      <Checkbox label="husbuvyt" checked={false} />
      <Checkbox label="husbuvyt" checked={true} />
      <Checkbox label="husbuvyt" checked={false} disabled={true} />
      <Checkbox label="husbuvyt" checked={true} disabled={true} />
    </>
  );
}