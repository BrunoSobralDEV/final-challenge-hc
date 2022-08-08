interface getAllCombinations {
  map(arg0: (item: any) => JSX.Element): import('react').ReactNode;
  Items:{
    id: string;
    quantity: number;
    skus:
      {
        quantitySku: number,
        skuId: string
      }[]
  }[]
}


export default getAllCombinations
