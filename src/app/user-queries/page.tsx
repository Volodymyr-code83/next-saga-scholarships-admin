"use client";
import * as React from "react";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { usePagination } from "@table-library/react-table-library/pagination";
import * as XLSX from "xlsx";

type DataType = {
  id: string;
  createDate: string;
  lastName: string;
  email: string;
  country: string;
};

const tableData: DataType[] = [
  {
    id: "188274",
    createDate: "10/20/16 12:09 PM",
    lastName: "Smith",
    email: "jsmith@jsmithfamily.com",
    country: "USA",
  },
  {
    id: "188234",
    createDate: "10/20/16 12:09 PM",
    lastName: "Smith",
    email: "jsmith@jsmithfamily.com",
    country: "USA",
  },
  {
    id: "188254",
    createDate: "10/20/16 12:09 PM",
    lastName: "Smith",
    email: "jsmith@jsmithfamily.com",
    country: "USA",
  },
  {
    id: "188244",
    createDate: "10/20/16 12:09 PM",
    lastName: "Smith",
    email: "jsmith@jsmithfamily.com",
    country: "USA",
  },
];

const Page = () => {
  const LIMIT = 15;
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [data, setData] = React.useState({
    nodes: tableData,
    pageInfo: {
      totalPages: 1,
    },
  });

  const theme = useTheme({
    Row: `
    &:nth-of-type(odd) {
      background-color: #ffff;
    }

    &:nth-of-type(even) {
      background-color:#F9F9F9;
    }
  `,
    Cell: `
    border: 1px solid rgba(175, 175, 175, 0.67);
    padding: 10px;
  `,
    HeaderCell: `
  background-color:#F9F9F9;
  border: 1px solid rgba(175, 175, 175, 0.67);
  padding: 10px;
`,
  });
  const doGet = React.useCallback(async (params: any) => {
    ///async get data from server
  }, []);

  React.useEffect(() => {
    doGet({
      offset: 0,
      limit: LIMIT,
    });
  }, [doGet]);

  // features

  const pagination = usePagination(
    data,
    {
      state: {
        page: 0,
        size: LIMIT,
      },
      onChange: onPaginationChange,
    },
    {
      isServer: true,
    },
  );

  function onPaginationChange(action: any, state: any) {
    doGet({
      offset: state.page * LIMIT,
      limit: LIMIT,
    });
  }
  function exportToCsv() {
    setDropdownOpen(!dropdownOpen);
    const csvData = data.nodes.map((item) => ({
      id: item.id,
      createDate: item.createDate,
      lastName: item.lastName,
      email: item.email,
      country: item.country,
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map((item) => Object.values(item).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "table_data.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportToExcel() {
    setDropdownOpen(!dropdownOpen);
    const excelData = data.nodes.map((item) => ({
      "Account ID": item.id,
      "Contact Created Datetime": item.createDate,
      "Contact Last Name": item.lastName,
      "Contact Email": item.email,
      Country: item.country,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    /* generate XLSX file and trigger download */
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });

    function s2ab(s: any) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }

    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "table_data.xlsx";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function printPage() {
    setDropdownOpen(!dropdownOpen);
    if (window) {
      window.print();
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5">
      <div className="flex w-full items-center justify-between pr-[40px]">
        <div className="relative">
          <button
            className="flex items-center justify-start gap-2 text-[15px] font-medium text-textBlack"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Export page
            <span className="flex h-[42px] w-[29px] items-center justify-center rounded-[10px] bg-blue">
              <svg
                width="16"
                height="9"
                viewBox="0 0 16 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 9C7.68433 8.9912 7.39572 8.87671 7.16122 8.63014L0.306652 1.77887C0.108231 1.58513 1.1702e-07 1.33855 9.16143e-08 1.04795C4.0803e-08 0.466733 0.468997 1.35776e-06 1.06426 1.30572e-06C1.35287 1.28049e-06 1.63247 0.114483 1.83991 0.317027L7.99098 6.49022L14.1601 0.317026C14.3675 0.123288 14.6381 1.19061e-07 14.9357 9.30407e-08C15.531 4.1001e-08 16 0.466732 16 1.04795C16 1.33855 15.8918 1.58513 15.6933 1.77887L8.82976 8.63014C8.58625 8.87671 8.31567 9 8 9Z"
                  fill="white"
                />
              </svg>
            </span>
          </button>
          {dropdownOpen && (
            <ul
              className=" absolute left-[100%]  z-10 min-w-[200px] overflow-hidden bg-white py-1.5"
              style={{
                borderRadius: "20px",
                background: "#FFF",
                boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <li
                onClick={exportToCsv}
                className="flex cursor-pointer items-end justify-start gap-4 px-4 py-2 text-[16px] font-normal text-textBlack hover:bg-bgGrey"
              >
                Export to CSV
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.86523 19.0459H12.2344C14.124 19.0459 15.0996 18.0527 15.0996 16.1543V8.17383C15.0996 6.94336 14.9414 6.38086 14.1768 5.59863L9.58008 0.931641C8.83301 0.175781 8.21777 0 7.11035 0H2.86523C0.984375 0 0 0.993164 0 2.90039V16.1543C0 18.0527 0.984375 19.0459 2.86523 19.0459ZM3.01465 17.2881C2.1709 17.2881 1.74902 16.8486 1.74902 16.04V3.00586C1.74902 2.20605 2.1709 1.75781 3.02344 1.75781H6.75V6.53906C6.75 7.81348 7.37402 8.42871 8.63965 8.42871H13.3506V16.04C13.3506 16.8486 12.9287 17.2881 12.0762 17.2881H3.01465ZM8.80664 6.89062C8.4375 6.89062 8.2793 6.73242 8.2793 6.37207V1.98633L13.1133 6.89062H8.80664ZM8.32324 10.1426C8.32324 9.71191 7.97168 9.39551 7.5498 9.39551C7.12793 9.39551 6.77637 9.71191 6.77637 10.1426V12.7969L6.84668 14.1504L6.16992 13.4473L5.51074 12.7705C5.37891 12.6299 5.17676 12.5332 4.99219 12.5332C4.58789 12.5332 4.28906 12.8232 4.28906 13.21C4.28906 13.4297 4.37695 13.5967 4.54395 13.7461L6.96094 15.9609C7.16309 16.1455 7.33008 16.2334 7.5498 16.2334C7.76953 16.2334 7.93652 16.1455 8.13867 15.9609L10.5557 13.7461C10.7227 13.5967 10.8105 13.4297 10.8105 13.21C10.8105 12.8232 10.5117 12.5332 10.1074 12.5332C9.92285 12.5332 9.7207 12.6299 9.58887 12.7705L8.92969 13.4473L8.25293 14.1504L8.32324 12.7969V10.1426Z"
                    fill="#1C1C1E"
                  />
                </svg>
              </li>
              <li
                onClick={exportToExcel}
                className="flex cursor-pointer items-end justify-start gap-4 px-4 py-2 text-[16px] font-normal text-textBlack hover:bg-bgGrey"
              >
                Export to Excel
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 16.2334C0 18.0527 1.00195 19.0459 2.8916 19.0459H17.9121C19.8193 19.0459 20.8125 18.0615 20.8125 16.1807V2.86523C20.8125 0.984375 19.8193 0 17.9121 0H6.91699C5.00977 0 4.02539 0.984375 4.02539 2.86523V6.77637H2.0918C0.782227 6.77637 0 7.51465 0 8.77148V16.2334ZM5.51953 17.2881C5.68652 16.9717 5.77441 16.5938 5.77441 16.1631V3.02344C5.77441 2.17969 6.21387 1.75781 7.03125 1.75781H17.7979C18.624 1.75781 19.0547 2.17969 19.0547 3.02344V16.0225C19.0547 16.8662 18.624 17.2881 17.7979 17.2881H5.51953ZM8.00684 5.49316H16.8398C17.1738 5.49316 17.4287 5.22949 17.4287 4.89551C17.4287 4.57031 17.1738 4.31543 16.8398 4.31543H8.00684C7.65527 4.31543 7.40039 4.57031 7.40039 4.89551C7.40039 5.22949 7.66406 5.49316 8.00684 5.49316ZM8.00684 8.52539H16.8398C17.1738 8.52539 17.4287 8.27051 17.4287 7.94531C17.4287 7.61133 17.1738 7.34766 16.8398 7.34766H8.00684C7.66406 7.34766 7.40039 7.61133 7.40039 7.94531C7.40039 8.27051 7.65527 8.52539 8.00684 8.52539ZM1.74902 16.1367V9.0791C1.74902 8.73633 1.96875 8.52539 2.32031 8.52539H4.02539V16.1367C4.02539 16.8135 3.5332 17.2881 2.8916 17.2881C2.25 17.2881 1.74902 16.7959 1.74902 16.1367ZM8.49902 14.625H10.6787C11.3643 14.625 11.7861 14.2119 11.7861 13.5264V11.4873C11.7861 10.8105 11.3643 10.3887 10.6787 10.3887H8.49902C7.81348 10.3887 7.3916 10.8105 7.3916 11.4873V13.5264C7.3916 14.2119 7.81348 14.625 8.49902 14.625ZM13.3418 11.5664H16.8398C17.1738 11.5664 17.4287 11.3115 17.4287 10.9863C17.4287 10.6523 17.1738 10.3887 16.8398 10.3887H13.3418C12.9902 10.3887 12.7441 10.6523 12.7441 10.9863C12.7441 11.3115 12.999 11.5664 13.3418 11.5664ZM13.3418 14.625H16.8398C17.1738 14.625 17.4287 14.3701 17.4287 14.0449C17.4287 13.7109 17.1738 13.4473 16.8398 13.4473H13.3418C12.999 13.4473 12.7441 13.7109 12.7441 14.0449C12.7441 14.3701 12.9902 14.625 13.3418 14.625Z"
                    fill="#1C1C1E"
                  />
                </svg>
              </li>
              <li
                onClick={printPage}
                className="flex cursor-pointer items-end justify-start gap-4 px-4 py-2 text-[16px] font-normal text-textBlack hover:bg-bgGrey"
              >
                Print page
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.76855 16.6289H3.67383V17.4463C3.67383 18.7559 4.29785 19.3359 5.56348 19.3359H14.5459C15.8027 19.3359 16.4355 18.7559 16.4355 17.4463V16.6289H17.3408C19.1338 16.6289 20.1094 15.6885 20.1094 13.8867V5.81836C20.1094 4.02539 19.1338 3.07617 17.3408 3.07617H16.541V2.60156C16.541 0.817383 15.6445 0 13.9219 0H6.1875C4.53516 0 3.56836 0.817383 3.56836 2.60156V3.07617H2.76855C1.0459 3.07617 0 4.02539 0 5.81836V13.8867C0 15.6885 0.975586 16.6289 2.76855 16.6289ZM5.20312 2.47852C5.20312 1.82812 5.53711 1.49414 6.1875 1.49414H13.9219C14.5723 1.49414 14.9062 1.82812 14.9062 2.47852V3.07617H5.20312V2.47852ZM14.5459 8.66602H5.56348C4.3418 8.66602 3.67383 9.24609 3.67383 10.5557V15.0469H2.76855C2.04785 15.0469 1.66992 14.6689 1.66992 13.957V5.75684C1.66992 5.03613 2.04785 4.6582 2.76855 4.6582H17.3408C18.0615 4.6582 18.4307 5.03613 18.4307 5.75684V13.957C18.4307 14.6689 18.0615 15.0469 17.3408 15.0469H16.4355V10.5557C16.4355 9.24609 15.8027 8.66602 14.5459 8.66602ZM14.1855 6.67969C14.1855 7.32129 14.7041 7.82227 15.3369 7.81348C15.9521 7.81348 16.4707 7.3125 16.4707 6.67969C16.4707 6.06445 15.9521 5.53711 15.3369 5.53711C14.7129 5.53711 14.1855 6.06445 14.1855 6.67969ZM5.92383 17.7979C5.50195 17.7979 5.29102 17.5957 5.29102 17.165V10.8369C5.29102 10.4062 5.50195 10.2041 5.92383 10.2041H14.1943C14.6162 10.2041 14.8184 10.4062 14.8184 10.8369V17.165C14.8184 17.5957 14.6162 17.7979 14.1943 17.7979H5.92383ZM7.16309 13.1133H12.9639C13.3066 13.1133 13.5615 12.8496 13.5615 12.5068C13.5615 12.1816 13.3066 11.918 12.9639 11.918H7.16309C6.81152 11.918 6.55664 12.1816 6.55664 12.5068C6.55664 12.8496 6.81152 13.1133 7.16309 13.1133ZM7.16309 16.0928H12.9639C13.3066 16.0928 13.5615 15.8379 13.5615 15.5039C13.5615 15.1699 13.3066 14.8975 12.9639 14.8975H7.16309C6.81152 14.8975 6.55664 15.1699 6.55664 15.5039C6.55664 15.8379 6.81152 16.0928 7.16309 16.0928Z"
                    fill="#1C1C1E"
                  />
                </svg>
              </li>
            </ul>
          )}
        </div>
        <div className="flex items-center justify-start gap-5 text-[20px] text-textBlack ">
          <span className="text-[16px] font-medium text-textBlack">
            Page {pagination.state.page + 1} of {data.pageInfo.totalPages}
          </span>
          <button
            className="cursor-pointer"
            type="button"
            disabled={pagination.state.page === 0}
            onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}
          >
            {"<"}
          </button>
          <button
            className="cursor-pointer"
            type="button"
            disabled={pagination.state.page + 1 === data.pageInfo.totalPages}
            onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className=" border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark ">
        <Table data={data} theme={theme}>
          {(tableList: any) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>Account ID</HeaderCell>
                  <HeaderCell>Contact Created Datetime</HeaderCell>
                  <HeaderCell>Contact Last Name</HeaderCell>
                  <HeaderCell>Contact Email</HeaderCell>
                  <HeaderCell>Country</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item: any) => (
                  <Row key={item.id} item={item}>
                    <Cell>{item.id}</Cell>
                    <Cell>{item.createDate}</Cell>
                    <Cell>{item.lastName}</Cell>
                    <Cell>{item.email}</Cell>
                    <Cell>{item.country}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Page;
