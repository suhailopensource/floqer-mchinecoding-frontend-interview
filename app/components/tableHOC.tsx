




import React from 'react';
import {
    AiOutlineSortAscending,
    AiOutlineSortDescending,
} from "react-icons/ai";
import {
    Column,
    usePagination,
    useSortBy,
    useTable,
    TableOptions,
    HeaderGroup,
    Row,
    Cell,
} from "react-table";

function TableHOC<T extends Object>(
    columns: Column<T>[],
    data: T[],
    containerClassname: string,
    heading: string,
    showPagination: boolean = false
) {
    return function HOC() {
        const options: TableOptions<T> = {
            columns,
            data,
            initialState: {
                pageSize: 10,
            },
        };

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            prepareRow,
            nextPage,
            pageCount,
            state: { pageIndex },
            previousPage,
            canNextPage,
            canPreviousPage,
        } = useTable(options, useSortBy, usePagination);

        return (
            <div className={containerClassname}>
                <h2 className="heading">{heading}</h2>

                <table className="table" {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup: HeaderGroup<T>) => {
                            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
                            return (

                                <tr key={key}{...restHeaderGroupProps}>
                                    {headerGroup.headers.map((column) => {
                                        const { key, ...restColumn } = column.getHeaderProps(column.getSortByToggleProps())
                                        return (
                                            <th key={key} {...restColumn}>
                                                {column.render("Header")}
                                                {column.isSorted && (
                                                    <span>
                                                        {" "}
                                                        {column.isSortedDesc ? (
                                                            <AiOutlineSortDescending />
                                                        ) : (
                                                            <AiOutlineSortAscending />
                                                        )}
                                                    </span>
                                                )}
                                            </th>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row: Row<T>) => {
                            prepareRow(row);
                            const { key, ...restRowProps } = row.getRowProps()
                            return (
                                <tr key={key} {...restRowProps}>
                                    {row.cells.map((cell: Cell<T>) => {
                                        const { key, ...restCellProps } = cell.getCellProps();
                                        return (
                                            <td key={key}{...restCellProps}>{cell.render("Cell")}</td>
                                        )
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {showPagination && (
                    <div className="table-pagination">
                        <button disabled={!canPreviousPage} onClick={previousPage}>
                            Prev
                        </button>
                        <span>{`${pageIndex + 1} of ${pageCount}`}</span>
                        <button disabled={!canNextPage} onClick={nextPage}>
                            Next
                        </button>
                    </div>
                )}
            </div>
        );
    };
}

export default TableHOC;
