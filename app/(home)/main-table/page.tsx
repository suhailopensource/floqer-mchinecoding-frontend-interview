"use client";

import React, { useEffect, useMemo, useState } from "react";
import TableHOC from "@/app/components/tableHOC";
import { Column } from "react-table";
import '@/app/gls.scss'
import Link from "next/link";

interface DataType {
    work_year: number;
    job_title: string;
    salary_in_usd: number;
    salary: number;
}

interface AggregatedDataType {
    year: number;
    total_jobs: number;
    average_salary_usd: number;
}

const columns: Column<AggregatedDataType>[] = [
    {
        Header: 'Year',
        accessor: 'year',
    },
    {
        Header: 'Number of Total Jobs',
        accessor: 'total_jobs',
    },
    {
        Header: 'Average Salary (USD)',
        accessor: 'average_salary_usd',
    },
];

const Orders = () => {
    const [data, setData] = useState<DataType[] | null>(null);
    const [rows, setRows] = useState<AggregatedDataType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://floqermachinecoding-interview-api.onrender.com/data");
                const data1 = await response.json();
                setData(data1);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            const dataByYear: { [key: number]: { total_jobs: number; total_salary: number } } = {};

            data.forEach((item: DataType) => {
                const { work_year, salary_in_usd } = item;
                if (!dataByYear[work_year]) {
                    dataByYear[work_year] = { total_jobs: 0, total_salary: 0 };
                }
                dataByYear[work_year].total_jobs += 1;
                dataByYear[work_year].total_salary += salary_in_usd;
            });

            const finalData = Object.entries(dataByYear).map(([year, { total_jobs, total_salary }]) => ({
                year: Number(year),
                total_jobs,
                average_salary_usd: total_salary / total_jobs,
            }));

            setRows(finalData);
        }
    }, [data]);

    if (!data) return <div>Loading...</div>;

    const Table = TableHOC<AggregatedDataType>(
        columns,
        rows,
        'table-box',
        '',
        rows.length > 10
    );

    return (
        <div className="container">
            <h1 className="text-xl font-bold">The Second table contains all the aggregated values from the huge data from kaggle it contains column sorting as well as pagination. IT is RESPONSIVE ALSO. CLick on the column name to sort from ascending to descending and vice versa</h1>
            <Link href={"/"}> <button className="h-full text-white p-4 rounded-lg bg-black m-2">GO BACK</button></Link>
            <h1 className="text-4xl font-bold">MAIN TABLE</h1>
            <Table />
        </div>
    );
};

export default Orders;
