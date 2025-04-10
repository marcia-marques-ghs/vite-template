import { useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { Center, Text, TextInput, Tooltip, Select, Checkbox, Group } from '@mantine/core';

function CheckboxQuestion() {
    return (
      <Checkbox.Group
        defaultValue={['ownCultivation']}
        label="What is this substrate used for?"
        withAsterisk
      >
        <Group mt="xs">
          <Checkbox value="ownCultivation" label="My own cultivation" />
          <Checkbox value="purchasedStartingMaterials" label="Purchased starting materials" />
        </Group>
      </Checkbox.Group>
    );
  }

function TooltipIcon() {
  const rightSection = (
    <Tooltip
      label="Fill in your substrate name here"
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
  );

  return (
    <TextInput
      rightSection={rightSection}
      label="Substrate name"
      placeholder="e.g. Steenwool"
    />
  );
}

function Dropdown() {
    return (
      <>
        <Select
          withAsterisk
          label="Supplier"
          placeholder="Choose a supplier"
          data={['Supplier 1', 'Supplier 2', 'Supplier 3', 'Supplier 4']}
          allowDeselect
          mt="md"
        />
      </>
    );
  }


export function TextInputTooltip() {
  return (
    <>
      <CheckboxQuestion />
      <TooltipIcon />
      <Dropdown />
    </>
  );
}