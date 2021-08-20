import React from 'react';
import Invoice from '@custom-elements/Invoice';

import InvoicesSkeleton from '@custom-sections/skeletons/Invoices'


const ListInvoices = (props)=>{

  const putContent = ()=> {
    if(props.invoices.length === 0){
      return( 
        <>
          <InvoicesSkeleton />
          <InvoicesSkeleton />
          <InvoicesSkeleton />
        </>
      )
    }

    return props.invoices.map((item, index)=>(
      <Invoice key={index} invoice={item} />
    ))
  }

  return (
    <>
      {putContent()}
    </>
  )
}

export default ListInvoices;