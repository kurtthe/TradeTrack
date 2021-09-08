export function validateEmptyField(data=""){
  
  const value = data?.trim();
  
  if(!value || value === '' || value === null || value === undefined){
    return 'N/A';
  }
  return value;
}