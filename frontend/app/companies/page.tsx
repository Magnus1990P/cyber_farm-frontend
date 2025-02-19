"use client";
import {CompanyGrid} from './companygrid'
import NewCompany from './company_create'

export default function Page() {
  return (
    <>
      <NewCompany />
      <CompanyGrid />
    </>
  );
}