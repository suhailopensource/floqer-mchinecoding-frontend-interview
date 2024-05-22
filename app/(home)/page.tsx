// use tablehoc to create table

// sample for creating table using table hoc
"use client"
import { ReactElement, useEffect, useMemo, useState } from "react";

import { Column } from "react-table";
import TableHOC from "../components/tableHOC";



import '../gls.scss'
import { GiConsoleController } from "react-icons/gi";
import Link from "next/link";





type DataType = {

  work_year: number;
  salary_in_usd: number;
  job_title: string;
  salary: number;
};

const column: Column<DataType>[] = [
  {
    Header: "YEAR",
    accessor: "work_year",
  },
  {
    Header: "Job Title",
    accessor: "job_title",
  },
  {
    Header: "Salary(USD)",
    accessor: "salary_in_usd",
  },
  {
    Header: "Salary",
    accessor: "salary",
  }
];

const Table = () => {

  const [data3, setData3] = useState<DataType[]>()



  useEffect(() => {

    const query = async () => {
      try {
        const response = await fetch("https://floqermachinecoding-interview-api.onrender.com/data")

        const jsonData = await response.json()


        setData3(jsonData)


      } catch (error) {
        console.log(error)
      }
    }

    query()

  }, [])



  const [rows, setRows] = useState<DataType[]>([]);



  useEffect(() => {
    if (data3)
      setRows(
        data3.map((i: DataType) => ({
          work_year: i.work_year,
          job_title: i.job_title,
          salary_in_usd: i.salary_in_usd,
          salary: i.salary,
        }))
      );
  }, [data3]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "table-box",
    "TABLE WITH ALL THE VALUES",
    rows.length > 6
  )();
  return (
    <div className="container">

      <h1 className="text-xl font-bold">The first table contains all the values from the api data provided from kaggle it contains column sorting as well as pagination. IT is RESPONSIVE ALSO. CLick on the column name to sort from ascending to descending  and vice versa</h1>
      <h1 className="text-3xl">Click on the button below to get the main Table</h1>
      <Link href={"/main-table"}> <button className="h-full text-white p-4 rounded-lg bg-black m-2">GO TO MAIN TABLE</button></Link>

      Note: loading the values might take time
      <hr></hr>
      {Table}
    </div>
  );
};

export default Table;





