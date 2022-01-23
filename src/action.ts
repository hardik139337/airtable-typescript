import axios from "axios";
import { AppDispatch, Istudentdata } from "./redux";

export function getData(name: string) {
  return async (dispatch: AppDispatch): Promise<void> => {
    let { data } = await axios.get<{
      records: {
        id: string;
        fields: {
          Name: string;
          Classes: string[];
        };
        createdTime: string;
      }[];
    }>(
      `https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students?filterByFormula=Name='${name}'`,
      {
        headers: {
          Authorization: "Bearer keyzEOi9xKwbhrIoW",
        },
      }
    );

    let temp = "";

    data.records[0].fields.Classes.forEach(
      (i) => (temp += `RECORD_ID()='${i}',`)
    );

    let classdata = await axios.get<{
      records: {
        id: string;
        fields: {
          Students: string[];
          Name: string;
        };
        createdTime: string;
      }[];
    }>(
      `https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Classes?filterByFormula=OR(${temp.slice(
        0,
        -1
      )})`,
      {
        headers: {
          Authorization: "Bearer keyzEOi9xKwbhrIoW",
        },
      }
    );

    let temparr = classdata.data.records.map((i) => i.fields.Students).flat(1);
    let totalstudent = Array.from(new Set(temparr));

    let tempofstudent = "";
    totalstudent.forEach((i) => (tempofstudent += `RECORD_ID()='${i}',`));

    let studentdata = await axios.get<{
      records: {
        id: string;
        fields: {
          Name: string;
          Classes: string[];
        };
        createdTime: string;
      }[];
    }>(
      `https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students?filterByFormula=OR(${tempofstudent.slice(
        0,
        -1
      )})`,

      {
        headers: {
          Authorization: "Bearer keyzEOi9xKwbhrIoW",
        },
      }
    );
    let studentdatajson: { [key: string]: string } = {};

    for (let i of studentdata.data.records) {
      studentdatajson[i.id] = i.fields.Name;
    }
    let studentdatajsonarr = studentdata.data.records.map((i) => ({
      id: i.id,
      name: i.fields.Name,
    }));

    let classdatajsonarr: Istudentdata[] = classdata.data.records.map((i) => ({
      name: i.fields.Name,
      arr: i.fields.Students.map((i) =>
        studentdatajsonarr.find((j) => j.id == i)
      ),
    }));

    dispatch({ type: "getdata", data: classdatajsonarr });
  };
}
