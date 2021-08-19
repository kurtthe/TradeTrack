import React from 'react';
import Invoice from '@custom-elements/Invoice';
import { Text } from 'galio-framework';

const ListInvoices = (props)=>{

  const putContent = ()=> {
    if(props.invoices.length === 0){
      return <Text>Loading...</Text>
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