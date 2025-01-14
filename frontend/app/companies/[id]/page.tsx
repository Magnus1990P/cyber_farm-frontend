import CompanyInfo from './companyinfo';

export default function Page() {
  return (
    <div  className='grid grid-cols-4 mx-20'
          key='CompanyPanel' >
        <CompanyInfo />
    </div>
  )
}