import React from 'react';


const Product = props => {
    return (

        <div class="item desktop">

            <span class="fav"></span>


            <div class="product-thumbnail">
                <a
                    href={props.href}><img
                        src={props.img}
                        // class={props.img}
                        alt={props.name}></img>
                </a>
            </div>

            <div class="caption">

                <div class="name leftdirection">
                    <h2><a
                        href={props.href}>{props.name}</a></h2>
                </div>


            </div>

            <div class="suggested-offer " data-numofstores="1">

                <div class="title notitle"></div>
                <div class="so-row">

                    <div class="so-image">
                        <img width="100"
                            src={props.shopImg}
                            alt={props.shop} style={{ display: "inline" }}></img>
                    </div>


                    <div class="so-shop">

                        <span class="suggested-store-name">{props.shop}</span>

                        <span class="go hidden"></span>

                    </div>

                    <div class="so-price">

                        <div class="price"><span class="price-val"><span
                            class="value">{props.price}</span> جنيه</span>
                        </div>

                    </div>
                    <a href={props.href}>
                        <div class="so-button ">
                            <button class="green-button"
                                data-productname={props.name}
                                data-storename={props.shop}
                                data-ref="" data-ref2="" data-gclid="" data-ref3="search"
                                data-targeturl="" data-numofstores="1" data-nearbyref=""
                                data-suggestedclick="true"
                                data-price={props.price} data-srank="1" data-featured="0">
                                اذهب للمتجر<span></span>
                            </button>
                            <span class="go hidden"></span>
                        </div>
                    </a>
                </div>
                <span class="product-seo hidden"
                    alt="protective-case-cover-for-galaxy-note-9-red-price-in-Egypt-8503662"></span>
            </div>




        </div>


    );
};

export default Product;
