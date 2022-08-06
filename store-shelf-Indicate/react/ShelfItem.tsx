import React from "react"
import { useCssHandles } from 'vtex.css-handles'
import { formatPrice } from '../react/helpers/Helper'



const CSS_HANDLES = [

    "shelfItem",
    "shelfLink",
    "shelfImage",
    "shelfImages",
    "shelfImage__img",
    "shelfProductName",
    "shelfPrice",
    "shelfSellingPrice",
    "shelfBestPrice",
    "shlefButtonAddToCard",
    "shelfPlus",
    "shelfItems",
    "shelfMeddle",
    "shelfCombo",
    "shelfBestPriceCombo"


]

const ShelfItem = ({ id, linkURL, imageURL, name, price, sellingPrice, addToCard, addToCardCombo }: any) => {

    const handles = useCssHandles(CSS_HANDLES)

    return (
        <>

            <div className={`${handles.shelfItems}`}>

                <div key={id} className={`${handles.shelfItem}`}>
                    <a href={`${linkURL}`} className={`${handles.shelfLink}`}>
                        <div className={`${handles.shelfImages}`}>
                            <img src={`${imageURL}`} alt={`${name}`} className={`${handles.shelfImage}`} />
                        </div>
                    </a>
                    <h2 className={`${handles.shelfProductName}`}>{`${name}`}</h2>
                    <div className={`${handles.shelfPrice}`}>
                        <p className={`${handles.shelfSellingPrice}`}>
                            {formatPrice(sellingPrice)}
                        </p>
                        <p className={`${handles.shelfBestPrice}`}>
                            {formatPrice(price)}
                        </p>
                    </div>
                    <button className={`${handles.shlefButtonAddToCard}`} id={id} onClick={addToCard}>
                        Adicione ao carrinho
                    </button>

                </div>
                <div className={`${handles.shelfMeddle}`}>
                    <h1 className={`${handles.shelfPlus}`}>+</h1>
                </div>
                <div key={id} className={`${handles.shelfItem}`}>
                    <a href={`${linkURL}`} className={`${handles.shelfLink}`}>
                        <div className={`${handles.shelfImages}`}>
                            <img src={`${imageURL}`} alt={`${name}`} className={`${handles.shelfImage}`} />
                        </div>
                    </a>
                    <h2 className={`${handles.shelfProductName}`}>{`${name}`}</h2>
                    <div className={`${handles.shelfPrice}`}>
                        <p className={`${handles.shelfSellingPrice}`}>
                            {formatPrice(sellingPrice)}
                        </p>
                        <p className={`${handles.shelfBestPrice}`}>
                            {formatPrice(price)}
                        </p>
                    </div>

                    <button className={`${handles.shlefButtonAddToCard}`} id={id} onClick={addToCard}>
                        Adicione ao carrinho
                    </button>

                </div>

            </div>
            <div className={`${handles.shelfMeddle}`}>
                <h1 className={`${handles.shelfPlus}`}>=</h1>
            </div>

            <div className={`${handles.shelfCombo}`}>

                <p className={`${handles.shelfBestPriceCombo}`}>
                    {formatPrice(price + price)}
                </p>

                <button className={`${handles.shlefButtonAddToCard}`} id={id} onClick={addToCardCombo}>
                    Adicionar este <br/> combo ao carrinho
                </button>
            </div>

        </>
    )
}

export default ShelfItem