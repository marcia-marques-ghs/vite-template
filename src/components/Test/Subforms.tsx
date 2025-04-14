import React, { useState, useCallback } from 'react';
import { Table,  Button, TextInput, Select, Text } from '@mantine/core';
import { Plus } from 'tabler-icons-react';

// --- Generic Table Form Component ---
interface TableFormProps<T extends Record<string, any>> {
    headers: string[];
    data: T[];
    onDataChange: (newData: T[]) => void;
    columnTypes?: Partial<Record<keyof T, 'text' | 'number' | 'select' | 'percentage'>>;
    selectOptions?: Partial<Record<keyof T, string[]>>;
    title: string;
    description?: string;
}

const TableForm = <T extends Record<string, any>>({
    headers,
    data,
    onDataChange,
    columnTypes = {},
    selectOptions = {},
    title,
    description
}: TableFormProps<T>) => {
    const handleInputChange = useCallback(
        (index: number, field: keyof T, value: any) => {
            const newData = [...data];
            newData[index] = { ...newData[index], [field]: value };
            onDataChange(newData);
        },
        [data, onDataChange]
    );

    const handleAddRow = useCallback(() => {
        const newRow: Partial<T> = {};
        headers.forEach(header => {
            const field = header.toLowerCase().replace(/ /g, '') as keyof T;
            if (columnTypes?.[field] === 'number') {
                newRow[field] = 0 as any;
            } else if (columnTypes?.[field] === 'select' && selectOptions?.[field]?.length) {
                newRow[field] = selectOptions[field][0] as any;
            }
            else {
                newRow[field] = '' as any; 
            }

        });
        onDataChange([...data, newRow as T]);
    }, [data, onDataChange, headers, columnTypes, selectOptions]);

    const renderInput = useCallback(
        (index: number, field: keyof T, type: 'text' | 'number' | 'select' | 'percentage') => {
            const value = data[index][field];

            switch (type) {
                case 'number':
                    return (
                        <TextInput
                            type="number"
                            value={value}
                            onChange={(event) => handleInputChange(index, field, Number(event.currentTarget.value) || 0)}
                            min={0}
                        />
                    );
                case 'select':
                    return (
                        <Select
                            data={selectOptions?.[field] || []}
                            value={value}
                            onChange={(newValue) => handleInputChange(index, field, newValue)}
                            searchable
                        />
                    );
                case 'percentage':
                    return (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <TextInput
                                type="number"
                                value={value}
                                onChange={(event) => handleInputChange(index, field, Number(event.currentTarget.value) || 0)}
                                style={{ flex: 1, marginRight: '5px' }}
                                min={0}
                                max={100}
                            />
                            <Text>%</Text>
                        </div>
                    );
                default:
                    return (
                        <TextInput
                            value={value}
                            onChange={(event) => handleInputChange(index, field, event.currentTarget.value)}
                        />
                    );
            }
        },
        [data, handleInputChange, selectOptions]
    );

    return (
        <div>
            <Text fw={500} mb="sm">
                {title}
            </Text>
            {description && <Text size="sm" color="dimmed" mb="md">{description}</Text>}
            <Table striped>
                <Table.Thead>
                    <Table.Tr>
                        {headers.map((header) => (
                            <Table.Th key={header}>{header}</Table.Th>
                        ))}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data.map((row, index) => (
                        <Table.Tr key={index}>
                            {headers.map((header) => {
                                const field = header.toLowerCase().replace(/ /g, '') as keyof T;
                                const columnType = columnTypes?.[field] || 'text';
                                return <Table.Td key={header}>{renderInput(index, field, columnType)}</Table.Td>
                            })}
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            <Button mt="sm" onClick={handleAddRow}>
                <Plus size={16} style={{ marginRight: 5 }} />
                Add New
            </Button>
        </div>
    );
};

// --- Specific Subform Components ---
interface ComponentRow {
    ingredient: string;
    origin: string;
    locationsupplier: string;
    constituent: string;
    percentage: number;
}

const ComponentsSubform = () => {
    const [componentsData, setComponentsData] = useState<ComponentRow[]>([]);
    const constituentOptions = ['Select', 'Option 1', 'Option 2'];

    return (
        <TableForm<ComponentRow>
            title="Components"
            headers={['Ingredient', 'Origin', 'Location supplier', 'Constituent', 'Percentage']}
            data={componentsData}
            onDataChange={setComponentsData}
            columnTypes={{
                percentage: 'percentage',
                constituent: 'select',
            }}
            selectOptions={{
                constituent: constituentOptions,
            }}
        />
    );
};

interface AdditiveRow {
    additive: string;
    unit: 'liter' | 'g' | 'kg';
    amountperm3: number;
}

const AdditivesSubform = () => {
    const [additivesData, setAdditivesData] = useState<AdditiveRow[]>([]);
    const unitOptions = ['liter', 'g', 'kg'];

    return (
        <TableForm<AdditiveRow>
            title="Additives"
            headers={['Additive', 'Unit', 'Amount per m3']}
            data={additivesData}
            onDataChange={setAdditivesData}
            columnTypes={{
                unit: 'select',
                amountperm3: 'number',
            }}
            selectOptions={{
                unit: unitOptions,
            }}
        />
    );
};

interface PackagingRow {
    packaging: string;
    unit: 'g' | 'kg';
    amountperm3: number;
}

const PrimaryPackagingSubform = () => {
    const [packagingData, setPackagingData] = useState<PackagingRow[]>([]);
    const unitOptions = ['g', 'kg'];

    const description = "Select the amount of packaging per m3 of substrate. This only applies to primary packaging (what is in direct contact), such as wrapping foil or big bags. Pallets are excluded.";

    return (
        <TableForm<PackagingRow>
            title="Primary packaging"
            headers={['Packaging', 'Unit', 'Amount per m3']}
            data={packagingData}
            onDataChange={setPackagingData}
            columnTypes={{
                unit: 'select',
                amountperm3: 'number',
            }}
            selectOptions={{
                unit: unitOptions,
            }}
            description={description}
        />
    );
};

// --- Main Form Component ---
const Subforms = () => {
    return (
        <div>
            <ComponentsSubform />
            <div style={{ marginTop: '30px' }}>
                <AdditivesSubform />
            </div>
            <div style={{ marginTop: '30px' }}>
                <PrimaryPackagingSubform />
            </div>
        </div>
    );
};

export default Subforms;
