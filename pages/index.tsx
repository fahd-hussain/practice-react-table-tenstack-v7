import type { NextPage } from "next";
import Head from "next/head";
import { CellProps } from "react-table";
import CustomReactTable from "../components/react-tables";
import styles from "../styles/Home.module.css";
import makeData from "../utils/makeData";

const columns = [
  {
    Header: "Name",
    id: "name",
    columns: [
      {
        Header: "First Name",
        id: "firstName",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        id: "lastName",
        accessor: "lastName",
      },
    ],
  },
  {
    Header: "Info",
    id: "info",
    columns: [
      {
        Header: "Age",
        id: "age",
        accessor: "age",
      },
      {
        Header: "Visits",
        id: "visits",
        accessor: "visits",
      },
      {
        Header: "Status",
        id: "status",
        accessor: "status",
      },
      {
        Header: "Profile Progress",
        id: "progress",
        accessor: "progress",
      },
    ],
  },
];

type HomeProps = {
  data: any;
};

const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>React Tables Tenstack V7</title>
      </Head>

      <main className={styles.main}>
        <CustomReactTable
          columns={columns}
          data={data}
          handleEdit={(cell: CellProps<any>) => {
            console.log(cell);
          }}
        />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export async function getServerSideProps() {
  const data = makeData(20);

  return {
    props: {
      data,
    },
  };
}

export default Home;
