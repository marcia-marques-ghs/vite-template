import React, { useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { Center, Text, TextInput, Tooltip, Select, Checkbox, Group, MantineSize } from '@mantine/core';

interface InputFieldProps {
  label: string;
  placeholder?: string;
  tooltipLabel?: string;
  withAsterisk?: boolean;
  type?: 'text' | 'number' | 'email' | 'password';
  data?: string[];
  allowDeselect?: boolean;
  defaultValue?: string | string[];
  checkboxOptions?: { value: string; label: string }[];
  mt?: MantineSize;
  onChange?: (value: any) => void;
  value?: any;
}


//define form input fields from mantine ui library
export function InputField({
  label,
  placeholder,
  tooltipLabel,
  withAsterisk,
  type = 'text',
  data,
  allowDeselect,
  defaultValue,
  checkboxOptions,
  mt,
  onChange,
  value,
}: InputFieldProps) {
  const tooltip = tooltipLabel ? (
    <Tooltip
      label={tooltipLabel}
      position="top-end"
      withArrow
      transitionProps={{ transition: 'pop-bottom-right' }}
    >
      <Text component="div" c="dimmed" style={{ cursor: 'help' }}>
        <Center>
          <IconInfoCircle size={18} stroke={1.5} />
        </Center>
      </Text>
    </Tooltip>
  ) : null;

  const rightSection = tooltip;

  if (checkboxOptions && checkboxOptions.length > 0) {
    return (
      <Checkbox.Group
        defaultValue={defaultValue as string[]}
        label={label}
        withAsterisk={withAsterisk}
        onChange={onChange}
        value={value as string[]}
      >
        <Group mt={mt}>
          {checkboxOptions.map((option) => (
            <Checkbox key={option.value} value={option.value} label={option.label} />
          ))}
        </Group>
      </Checkbox.Group>
    );
  }

  if (data && data.length > 0) {
    return (
      <Select
        withAsterisk={withAsterisk}
        label={label}
        placeholder={placeholder}
        data={data}
        allowDeselect={allowDeselect}
        mt={mt}
        onChange={onChange}
        value={value as string}
      />
    );
  }

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      rightSection={rightSection}
      withAsterisk={withAsterisk}
      type={type}
      mt={mt}
      onChange={(event) => onChange?.(event.currentTarget.value)}
      value={value as string}
    />
  );
}

//export function with all needed components for substrate form, using props to change the label names
export function FormComponent() {
  const [substrateUsage, setSubstrateUsage] = useState<string[]>(['ownCultivation']);
  const [substrateName, setSubstrateName] = useState('');
  const [supplier, setSupplier] = useState<string | null>(null);

  return (
    <>
      <InputField
        label="What is this substrate used for?"
        withAsterisk
        defaultValue={substrateUsage}
        checkboxOptions={[
          { value: 'ownCultivation', label: 'My own cultivation' },
          { value: 'purchasedStartingMaterials', label: 'Purchased starting materials' },
        ]}
        onChange={setSubstrateUsage}
      />

      <InputField
        label="Substrate name"
        placeholder="e.g. Steenwool"
        tooltipLabel="Fill in your substrate name here"
        mt="md"
        value={substrateName}
        onChange={setSubstrateName}
      />

      <InputField
        label="Supplier"
        placeholder="Choose a supplier"
        data={['Supplier 1', 'Supplier 2', 'Supplier 3', 'Supplier 4']}
        allowDeselect
        mt="md"
        onChange={setSupplier}
        value={supplier}
      />

      {/* You can add more InputField components here for other form fields */}
    </>
  );
}