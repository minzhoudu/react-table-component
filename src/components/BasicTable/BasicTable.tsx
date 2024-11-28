import { CSSProperties, ReactNode } from 'react';

import './BasicTable.css';

type RenderFunctionAttributes<T> = { currentRow: T; currentCell: T[keyof T] };

export type ColumnDefinition<T> = {
    key: keyof T;
    title: string;
    columnStyle?: CSSProperties;
    cellStyle?: CSSProperties;
    render?: (data: RenderFunctionAttributes<T>) => ReactNode;
};

type TableProps<T> = {
    colDefs: ColumnDefinition<T>[];
    tableData: T[];
    styles?: {
        table?: CSSProperties;
        headerRow?: CSSProperties;
        row?: CSSProperties;
        cell?: CSSProperties;
    };
    className?: string;
};

export const BasicTable = <T,>({ colDefs, tableData, styles = {}, className }: TableProps<T>) => {
    return (
        <div className={`${className} basic-table`} style={{ ...styles.table }}>
            <div className="header-row" style={{ ...styles.headerRow }}>
                {colDefs.map((col) => (
                    <div
                        key={col.key as string}
                        className="header-row-cell"
                        style={{
                            flex: 1,
                            fontWeight: 'bold',
                            ...styles.cell,
                            ...col.columnStyle,
                        }}
                    >
                        {col.title}
                    </div>
                ))}
            </div>

            {tableData.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className="table-data-row"
                    style={{
                        ...styles.row,
                    }}
                >
                    {colDefs.map((col) => (
                        <div
                            key={col.key as string}
                            className="table-data-cell"
                            style={{
                                ...styles.cell,
                                ...col.columnStyle,
                                ...col.cellStyle,
                            }}
                        >
                            {!col.render && (row[col.key] as ReactNode)}
                            {col.render &&
                                col.render({ currentRow: row, currentCell: row[col.key] })}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
