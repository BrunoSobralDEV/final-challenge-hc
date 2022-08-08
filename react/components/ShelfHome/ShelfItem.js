import React from "react"
import { formatPrice } from '../helpers/Helper'
import style from "./styles.css";




const ShelfItem = ({ id, linkURL, imageURL, name, price, addToCard}) => {

    const handles = style

    return (
        <>
        <div className={handles.container}>

            <div className={`${handles.shelfItems}`}>

                <div key={id} className={`${handles.shelfItem}`}>
                    <a href={`${linkURL}`} className={`${handles.shelfLink}`}>
                        <div className={`${handles.shelfImages}`}>
                            <img src={`${imageURL}`} alt={`${name}`} className={`${handles.shelfImage}`} />
                        </div>
                    </a>
                    <h2 className={`${handles.shelfProductName}`}>{`${name}`}</h2>
                    <div className={`${handles.shelfPrice}`}>
                        <p className={`${handles.shelfBestPrice}`}>
                            {formatPrice(price)}
                        </p>
                    </div>
                    <button className={`${handles.shlefButtonAddToCard}`} id={id} onClick={addToCard}>
                        Adicione ao carrinho
                    </button>

                </div>

            </div>

            </div>
            
        </>
    )
}

export default ShelfItem