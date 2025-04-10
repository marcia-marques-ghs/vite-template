import { Stepper } from '@mantine/core';

export function ProgressBar() {
  return (
    <Stepper color="#056734" active={1}>
      <Stepper.Step label="Step 1" description="Set up" />
      <Stepper.Step label="Step 2" description="Components" />
      <Stepper.Step label="Step 3" description="Additives" />
      <Stepper.Step label="Step 3" description="Primary Packaging" />
    </Stepper>
  );
}