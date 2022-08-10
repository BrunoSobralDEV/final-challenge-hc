import React, { FC, useEffect, useState} from 'react'
import { Layout, PageBlock } from 'vtex.styleguide'
import getAllCombinations from './interfaces/getAllCombinations'

const styles = {
  center: {
    textAlign: 'center',
  },
} as const;
const ListCombination: FC = () => {

  const [getCombination, setUser] = useState<getAllCombinations>();


      //pegar o array do dynamonDb
      useEffect(() => {
        fetch('https://zpgwunqvzc.execute-api.us-east-1.amazonaws.com/getAllCombination')
            .then((response) => response.json())
            .then((json) => setUser(json))
        }, []);

  return (
    <Layout>
      <PageBlock
        title="Fase 2 - Administração
        Em um segundo momento, deve ser iniciada a criação da parte administrativa que
        deve representar as combinações processadas da fase anterior."
        subtitle="Aqui, pegamos as dupla de produtos mais vendidos e exibidos para o proprietário o que o sistema está sugestionando, baseado em compras já realizadas."
        variation="full"
      >
        <div className="p-2">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className='w-10 center' scope="col">ID</th>
            <th className='w-10 center' scope="col">Quantity</th>
            <th className='w-10 center' scope="col">Sku 1</th>
            <th className='w-10 center' scope="col ">Quantity 1</th>
            <th className='w-10 center' scope="col">Sku 2</th>
            <th className='w-10 center' scope="col">Quantity 2</th>
          </tr>
        </thead>
        <tbody>
          {getCombination?.Items.map((item) => (
            <tr style={styles.center}>
              <th style={styles.center} scope="row">{item.id}</th>
              <td style={styles.center}>{item?.quantity}</td>
              <td style={styles.center}>{item?.skus[0].skuId}</td>
              <td style={styles.center}>{item?.skus[0].quantitySku}</td>
              <td style={styles.center}>{item?.skus[1].skuId}</td>
              <td style={styles.center}>{item?.skus[1].quantitySku}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </PageBlock>


    </Layout>
  )
}

export default ListCombination