import React , { useState } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios'

import Product from "./compnents/product/product";

import './App.css';


function App() {

	const [{ souqitems , noonitems , jumiaitems }, setShopsProducts] = useState({souqitems:[],noonitems:[],jumiaitems:[]});
	const [loading , setLoading] = useState(false);

	const handleSearch = function (ev) {
		const searchString = ev.target.value;
		console.log(`Pressed keyCode ${ev.key}`);
		if (ev.key === 'Enter' && searchString && !loading) {
			setShopsProducts({souqitems:[],noonitems:[],jumiaitems:[]})
			setLoading(true);
			ev.preventDefault();
			const apiUrl = 'http://127.0.0.1:3000/api/v1/products?searchString=' + searchString;
			axios.get(apiUrl)
			.then((res) => {
			  setLoading(false);
			  console.log(res.data)
			  setShopsProducts(res.data)
			})
			.catch((err)=>{
				setLoading(false);
				console.log(err)
			});
	
		}
	};

	return (
		<div id="wrapper" class="">
			<div class="row">
				{/* header */}
				<header class="">
					<div class="container">
						<div class="col-7">
							<div id="search">
								<div class="searchbox">
									<div id="divSearchSuggestions" style={{ display: "none" }}>
										<ul>
											<li id="searchsuggestionsloading"></li>
										</ul> <i class="clear-search"></i>
									</div>
									<span>
										<input id="s"
											type="text"
											autocomplete="off"
											placeholder="ابحث في 3.0 مليون منتج من 73 متجر في مصر "
											onKeyPress={handleSearch}></input>
									</span>
								</div> <span id="btnSearch"> <i></i></span> <input type="hidden" id="hdnInCategory"
									value=""></input>
							</div>
						</div>
					</div>
				</header>

				{/* body */}
				<div class="container">
					<div class="row">
						<div class="col-9-half search-page">
							<div class="white-page">
								<div class="search-result">
									<div id="sectionresults" class="result ">
										<div class="overlay-results hidden">
											<div class="spinner"></div>
										</div>
										<div class="rows pull-left list" id="results">
										{loading && <ReactLoading type={"cylon"} color={"blue"} />}
											{
											souqitems && souqitems.map(element => 
												<Product name={element.name}
													img={element.img}
													href={element.href}
													shop={"element.shop"}
													price={element.price.replace(/[^\d|.|,]/g, "")}
													shopImg={"https://eg.pricenacdn.com/images/stores/souqAmazon-logo-v2-X2.png"}>

												</Product>
											)}
											{
											noonitems && noonitems.map(element => 
												<Product name={element.name}
													img={element.img}
													href={element.href}
													shop={"element.shop"}
													price={element.price.replace(/[^\d|.|,]/g, "")}
													shopImg={"https://eg.pricenacdn.com/images/stores/noon-logo.png"}>

												</Product>
											)
											}
											{
											jumiaitems && jumiaitems.map(element => 
												<Product name={element.name}
													img={element.img}
													href={element.href}
													shop={"element.shop"}
													price={element.price.replace(/[^\d|.|,]/g, "")}
													shopImg={"https://eg.pricenacdn.com/images/stores/jumia_2.png"}>

												</Product>
											)}



										</div>
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>




			</div>
		</div>
	);
}

export default App;
