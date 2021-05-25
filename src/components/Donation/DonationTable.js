import React, { useRef, useState, Component, useEffect } from "react";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import address from "../utils/address";
import axios from "axios";

import Preload from "../preload";

import i18n from "i18next";
import { withTranslation } from "react-i18next";

import { map } from "jquery";

 function DonationTable(props){
  const { t, i18n } = useTranslation();
    const [table,setTable]=useState([]);
    const [desc,setDesc]=useState([]);
    const [loading, setLoading] = useState(true);
    const style = i18n.dir() === "rtl" ? "pl-0" : "pr-0";
    const styleMr = i18n.dir() === "rtl" ? " ml-5" : " mr-5";
   const [data,setData]=useState([])

    async function fetchTable() {
   const fetcher = await window.fetch(`${address()}donation-description`,
   {headers: {'accept-language': `${i18n.language}`}
  });
  const response = await fetcher.json();
  setTable(response);
  console.log("the fetched table...",response.description)


}

useEffect(() => {
  fetchTable();

},[i18n.language])



     return(

        <div className="col-xs-12 col-sm-12 col-md-7 ${style}">
        <h3 class="mt-0 line-bottom">{t('Donate Through Banks')}</h3>
        <div class="table-responsive">

        {

          table.length !=0 ?
  <div >
   { parse(`${table.description}`)}

  </div>
  :
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>{t('Bank')}</th>
                <th>{t('Branch')}</th>
                <th>{t('Account No')}</th>
              </tr>
            </thead>
                <tbody>
                  <tr>
                    <td scope="col">{t('Khartoum Bank')}</td>
                    <td>{t('Reyadh')}</td>
                    <td>1290129</td>
                  </tr>
                  <tr>
                 <td scope="row">{t('Abu- Dhabi National Bank')}</td>
                    <td>{t('Headquarters')}</td>
                    <td>891624</td>
                  </tr>
                  <tr>
                  <td scope="row">{t('Export Developing Bank')}</td>
                    <td>{t('Al-Sajana')}</td>
                    <td>4765</td>
                  </tr>
                  <tr>
                  <td scope="row">{t('Al-Neelain Bank')}</td>
                    <td>{t('Al-Namozaji')}</td>
                    <td>5032</td>
                  </tr>
                  <tr>
                  <td scope="row">{t('Al-Salam Bank')}</td>
                    <td>{t('Al-Matar')}</td>
                    <td>305250</td>
                  </tr>
                  <tr>
                  <td scope="row">{t('Al-Nile Bank')}</td>
                    <td>{t('Al-Amaraat')}</td>
                    <td>2654</td>
                  </tr>
                  <tr>
                  <td scope="row">{t('Al-Saudi Bank')}</td>
                    <td>{t('Al-Amaraat')}</td>
                    <td>14195</td>
                  </tr>
                  <tr>
                  <td scope="row">{t('Faisal Islamic Bank')}</td>
                    <td>{t('Barlaman')}</td>
                    <td>12300123</td>
                  </tr>
                </tbody>
          </table>

 }




      </div>
    </div>


     )
 }export default withTranslation()(DonationTable);