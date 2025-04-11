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
  unit?: string; // Added unit prop
}

function InputField({
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
  unit,
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

  const rightSection = tooltip ? (
    <Group style={{ gap: '5px' }} align="center">
      {unit && <Text size="sm" color="dimmed">{unit}</Text>}
      {tooltip}
    </Group>
  ) : (
    unit && <Text size="sm" color="dimmed" mr="xs">{unit}</Text>
  );

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
        value={value as string | null}
        rightSection={rightSection} // Apply unit to Select as well if needed
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
};

export function FormComponent() {
  const [substrateUsage, setSubstrateUsage] = useState<string[]>(['ownCultivation']);
  const [substrateName, setSubstrateName] = useState('');
  const [peatCContent, setPeatCContent] = useState('');
  const [nContent, setNContent] = useState('');
  const [pContent, setPContent] = useState('');
  const [kContent, setKContent] = useState('');
  const [limestoneContent, setLimestoneContent] = useState('');
  const [dolomiteContent, setDolomiteContent] = useState('');
  const [ureaContent, setUreaContent] = useState('');
  const [moistureContent, setMoistureContent] = useState('');
  const [ph, setPh] = useState('');
  const [cec, setCec] = useState('');
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
        label="Peat C-content"
        placeholder="Enter a value in kg/m3"
        tooltipLabel="Enter the Peat C-content (kg/m3)"
        mt="md"
        value={peatCContent}
        onChange={setPeatCContent}
      />

<InputField
        label="N-content"
        placeholder="Enter a value in kg/m3"
        tooltipLabel="Enter the N-content (kg/m3)"
        mt="md"
        value={nContent}
        onChange={setNContent}
      />

      <InputField
        label="P-content"
        placeholder="Enter a value in kg/m3"
        tooltipLabel="Enter the P-content (kg/m3)"
        mt="md"
        value={pContent}
        onChange={setPContent}
      />

      <InputField
        label="K-content"
        placeholder="Enter a value in kg/m3"
        tooltipLabel="Enter the K-content (kg/m3)"
        mt="md"
        value={kContent}
        onChange={setKContent}
      />

      <InputField
        label="Limestone content"
        placeholder="Enter a value in kg/m3"
        tooltipLabel="Enter the Limestone content (kg/m3)"
        mt="md"
        value={limestoneContent}
        onChange={setLimestoneContent}
      />

      <InputField
        label="Dolomite content"
        placeholder="Enter a value in kg/m3"
        tooltipLabel="Enter the Dolomite content (kg/m3)"
        mt="md"
        value={dolomiteContent}
        onChange={setDolomiteContent}
      />

      <InputField
        label="Urea content"
        placeholder="Enter a value in kg/m3"
        tooltipLabel="Enter the Urea content (kg/m3)"
        mt="md"
        value={ureaContent}
        onChange={setUreaContent}
      />

      <InputField
        label="Moisture content"
        placeholder="Enter a value in liter/m3"
        tooltipLabel="Enter the Moisture content (liter/m3)"
        mt="md"
        value={moistureContent}
        onChange={setMoistureContent}
      />

      <InputField
        label="pH"
        placeholder="Enter a pH value"
        tooltipLabel="Enter the pH value"
        mt="md"
        value={ph}
        onChange={setPh}
      />

      <InputField
        label="CEC"
        placeholder="Enter a value in cmol/kg"
        tooltipLabel="Enter the CEC value (cmol/kg)"
        mt="md"
        value={cec}
        onChange={setCec}
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
    </>
  );
}
  