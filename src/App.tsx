import { useState } from 'react';

import './App.css';

import { BasicTable, ColumnDefinition } from './BasicTable/BasicTable';

type User = {
    name: string;
    age: number;
    country: string;
};

const columns: ColumnDefinition<User>[] = [
    {
        key: 'name',
        title: 'Full Name',
        columnStyle: { flex: 4 },
    },
    {
        key: 'age',
        title: 'Age',
        columnStyle: { textAlign: 'center', flex: 1 },
    },
    {
        key: 'country',
        title: 'Comes from',
        columnStyle: { textAlign: 'end' },
        render: (data) => {
            return <div>{data.currentCell}</div>;
        },
    },
];

function App() {
    const [usersData] = useState<User[]>([
        { name: 'Pavle', age: 32, country: 'Serbia' },
        { name: 'Ana', age: 41, country: 'Montenegro' },
        {
            name: 'Marko',
            age: 11,
            country: 'North Macedonia',
        },
        { name: 'Nemanja', age: 45, country: 'Slovakia' },
        { name: 'Jakov', age: 98, country: 'Slovenia' },
        { name: 'Stasa', age: 27, country: 'Romania' },
        { name: 'Valentina', age: 34, country: 'Bulgaria' },
    ]);

    return (
        <div className="container">
            <BasicTable colDefs={columns} tableData={usersData} className="my-table" />
        </div>
    );
}

export default App;
