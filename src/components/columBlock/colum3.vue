<template>
	<div>
		<div class="cbvariant cbvariant-3_columns" v-for="(item,index) of productList" :key="index">
			<div class="mobile-product-listing-table" style="display: table; width: 100%;">
				<div class="mobile-product-listing-row" style="display: table-row;">
										<!--[if (mso)|(IE)]><table border="0" cellspacing="0" cellpadding="0" width="600" style="width: 600px;"><tr><![endif]-->
					<!--[if (mso)|(IE)]><td style="width: 186px; vertical-align: top;"><![endif]-->
						<div class="mobile-product-listing-3-cell" style="display: table-cell; width: 186px; vertical-align: top;">
							<table border="0" cellspacing="0" cellpadding="0" width="100%">
								<tbody>
									<tr>
										<td style="padding-top: 15px; padding-bottom: 15px;">
											<table border="0" cellpadding="0" cellspacing="0" width="100%">
												<tbody>
													<tr>
														<td>
															<table border="0" cellpadding="0" cellspacing="0" align="center" style=" margin: 0 auto;">
																<tbody>
																	<tr>
																		<td :style="fontStyleData.backgroundImage">
																			<table border="0" cellpadding="0" cellspacing="0" width="100%">
																				<tbody>
																					<tr>
																						<td :style="fontStyleData.imagePadding">
																							<table border="0" cellpadding="0" cellspacing="0">
																								<tbody>
																									<tr>
																										<td class="mobile-product-listing-3-image-cell" style="font-size: 0; line-height: 0; text-align: center;">
																											<a target="_blank" :href="item[0].url">
																												<img v-if ="item[0] && item[0].img" v-lazy="item[0] && item[0].img" width="100%" alt="">
																												<span v-else class="image-placeholder" style="">
																													<span class="placeholder-style" style="width: 164px; height: 166px;">
																														<span class="placeholder-inner">
																															<img class="placeholder-img-medium" src="https://sources.aopcdn.com/edm/images//20211020/1634722588624.png" width="60">
																														</span>
																													</span>
																												</span>
																											</a></td>
																									</tr>
																								</tbody>
																							</table>
																						</td>
																					</tr>
																				</tbody>
																			</table>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
													<tr>
														<td :style="fontStyleData.describe.padTopAndBottom">
															<table border="0" cellpadding="0" cellspacing="0" width="100%">
																<tbody>
																	<tr>
																		<td style="text-align: center;"><a :style="fontStyleData.describe" :href="item[0].url"><span :title="item[0].goods_name"  :style="fontStyleData.describe.span">{{item[0].goods_name}}</span></a></td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
													<tr>
														<td :style="fontStyleData.price.padTopAndBottom">
															<table border="0" cellpadding="0" cellspacing="0" width="100%">
																<tbody>
																	<tr>
																		<td style="text-align:center;"><span  :style="fontStyleData.price">{{item[0].price}}</span><span v-if="item[0].market_price"> / </span><span v-if="item[0].market_price"  :style="fontStyleData.marketPrice">{{item[0].market_price}}</span></td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
													<tr>
														<td :style="fontStyleData.button.padTopAndBottom">
															<table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto; border-collapse: separate !important;">
																<tbody>
																	<tr>
																		<td>
																			<!--[if (mso)|(IE) ]><table border="0" cellpadding="0" cellspacing="0"><tr><td style="line-height: 17px;text-align: center;"><![endif]-->
																			<!--[if !mso]><!-->
																			<div :style="fontStyleData.button.border">
																				<!--<![endif]--><a :href="item[0].url"  target="_blank" :style="fontStyleData.button.text">{{btnText.value}}</a>
																				<!--[if !mso]><!-->
																			</div>
																			<!--<![endif]-->
																			<!--[if (mso)|(IE) ]></td></tr></table><![endif]-->
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					<!--[if (mso)|(IE)]></td><![endif]-->
					<!--[if (mso)|(IE)]><td style="width: 21px; vertical-align: top;"><![endif]-->
					<div class="mobile-product-listing-3-cell mobile-product-listing-3-separator" style="display: table-cell; width: 21px; vertical-align: top;"></div>
					<!--[if (mso)|(IE)]></td><![endif]-->
					<!--[if (mso)|(IE)]><td style="width: 186px; vertical-align: top;"><![endif]-->
					<div class="mobile-product-listing-3-cell" style="display: table-cell; width: 186px; vertical-align: top;">
						<table border="0" cellspacing="0" cellpadding="0" width="100%">
							<tbody>
								<tr>
									<td style="padding-top: 15px; padding-bottom: 15px;">
										<table border="0" cellpadding="0" cellspacing="0" width="100%">
											<tbody>
												<tr>
													<td>
														<table border="0" cellpadding="0" cellspacing="0" align="center" style=" margin: 0 auto;">
															<tbody>
																<tr>
																	<td :style="fontStyleData.backgroundImage">
																		<table border="0" cellpadding="0" cellspacing="0" width="100%">
																			<tbody>
																				<tr>
																					<td :style="fontStyleData.imagePadding">
																						<table border="0" cellpadding="0" cellspacing="0">
																							<tbody>
																								<tr>
																									<td class="mobile-product-listing-3-image-cell" style="font-size: 0; line-height: 0; text-align: center;">
																										<a target="_blank" :href="item[1].url">
																											<img v-if="item[1] && item[1].img" width="100%" v-lazy="item[1] && item[1].img" alt="">
																											<span v-else class="image-placeholder" style="">
																												<span class="placeholder-style" style="width: 164px; height: 166px;">
																													<span class="placeholder-inner">
																														<img class="placeholder-img-medium" src="https://sources.aopcdn.com/edm/images//20211020/1634722588624.png" width="60">
																													</span>
																												</span>
																											</span>
																										</a></td>
																								</tr>
																							</tbody>
																						</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
												<tr>
													<td :style="fontStyleData.describe.padTopAndBottom">
														<table border="0" cellpadding="0" cellspacing="0" width="100%">
															<tbody>
																<tr>
																	<td style="text-align: center;" :title="item[1].goods_name">
																	<a class="webfont-fallback-1" target="_blank" :style="fontStyleData.describe" :href="item[1].url">
																		<span :style="fontStyleData.describe.span" >{{item[1].goods_name}}</span>
																	</a></td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
										
												<tr>
													<td :style="fontStyleData.price.padTopAndBottom">
														<table border="0" cellpadding="0" cellspacing="0" width="100%">
															<tbody>
																<tr>
																	<td style="text-align:center;"><span  :style="fontStyleData.price">{{item[1].price}}</span><span v-if="item[1].market_price"> / </span><span v-if="item[1].market_price" :style="fontStyleData.marketPrice">{{item[1].market_price}}</span></td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
												<tr>
													<td :style="fontStyleData.button.padTopAndBottom">
														<table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto; border-collapse: separate !important;">
															<tbody>
																<tr>
																	<td>
																		<!--[if (mso)|(IE) ]><table border="0" cellpadding="0" cellspacing="0"><tr><td style="line-height: 17px;text-align: center;"><![endif]-->
																		<!--[if !mso]><!-->
																		<div :style="fontStyleData.button.border">
																			<!--<![endif]--><a :href="item[1].url"  target="_blank" :style="fontStyleData.button.text"><span>{{btnText.value}}</span></a>
																			<!--[if !mso]><!-->
																		</div>
																		<!--<![endif]-->
																		<!--[if (mso)|(IE) ]></td></tr></table><![endif]-->
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!--[if (mso)|(IE)]></td><![endif]-->
					<!--[if (mso)|(IE)]><td style="width: 21px; vertical-align: top;"><![endif]-->
					<div class="mobile-product-listing-3-cell mobile-product-listing-3-separator" style="display: table-cell; width: 21px; vertical-align: top;"></div>
					<!--[if (mso)|(IE)]></td><![endif]-->
					<!--[if (mso)|(IE)]><td style="width: 186px; vertical-align: top;"><![endif]-->
					<div class="mobile-product-listing-3-cell" style="display: table-cell; width: 186px; vertical-align: top;">
						<table border="0" cellspacing="0" cellpadding="0" width="100%">
							<tbody>
								<tr>
									<td style="padding-top: 15px; padding-bottom: 15px;">
										<table border="0" cellpadding="0" cellspacing="0" width="100%">
											<tbody>
												<tr>
													<td>
														<table border="0" cellpadding="0" cellspacing="0" align="center" style=" margin: 0 auto;">
															<tbody>
																<tr>
																	<td :style="fontStyleData.backgroundImage">
																		<table border="0" cellpadding="0" cellspacing="0" width="100%">
																			<tbody>
																				<tr>
																					<td :style="fontStyleData.imagePadding">
																						<table border="0" cellpadding="0" cellspacing="0">
																							<tbody>
																								<tr>
																									<td class="mobile-product-listing-3-image-cell" style="font-size: 0; line-height: 0; text-align: center;">
																										<a target="_blank" :href="item[2].url">
																											<img v-if ="item[2] && item[2].img" v-lazy="item[2] && item[2].img" width="100%" alt="">
																											<span v-else class="image-placeholder" style="">
																												<span class="placeholder-style" style="width: 164px; height: 166px;">
																													<span class="placeholder-inner">
																														<img class="placeholder-img-medium" src="https://sources.aopcdn.com/edm/images//20211020/1634722588624.png" width="60">
																													</span>
																												</span>
																											</span>
																										</a></td>
																								</tr>
																							</tbody>
																						</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
												<tr>
													<td :style="fontStyleData.describe.padTopAndBottom">
														<table border="0" cellpadding="0" cellspacing="0" width="100%">
															<tbody>
																<tr>
																	<td style="text-align: center;">
																		<a :style="fontStyleData.describe" :href="item[2].url"><span :title="item[2].goods_name" :style="fontStyleData.describe.span">{{item[2].goods_name}}</span>
																		</a>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
												<tr>
													<td :style="fontStyleData.price.padTopAndBottom">
														<table border="0" cellpadding="0" cellspacing="0" width="100%">
															<tbody>
																<tr>
																	<td style="text-align:center;"><span  :style="fontStyleData.price">{{item[2].price}}</span><span v-if="item[2].market_price"> / </span><span v-if="item[2].market_price"  :style="fontStyleData.marketPrice">{{item[2].market_price}}</span></td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
												<tr>
													<td :style="fontStyleData.button.padTopAndBottom">
														<table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto; border-collapse: separate !important;">
															<tbody>
																<tr>
																	<td>
																		<!--[if (mso)|(IE) ]><table border="0" cellpadding="0" cellspacing="0"><tr><td style="line-height: 17px;text-align: center;"><![endif]-->
																		<!--[if !mso]><!-->
																		<div :style="fontStyleData.button.border">
																			<!--<![endif]--><a :href="item[2].url"  target="_blank" :style="fontStyleData.button.text">{{btnText.value}}</a>
																			<!--[if !mso]><!-->
																		</div>
																		<!--<![endif]-->
																		<!--[if (mso)|(IE) ]></td></tr></table><![endif]-->
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!--[if (mso)|(IE)]></td><![endif]-->
					<!--[if (mso)|(IE)]></tr></table><![endif]-->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'colum3',
	props: {
		list: {
			type: Array,
			default: () => [],
		},
		fontStyle:{
           type:Object,
    },
	btnText:{
      type:Object
    }
	},
	data () {
		return {
			defaultImg:'',
			demoImg:require('../../assets/images/placeholder-img200.png'),
			fontStyleData:{}
		}
	},
	watch: {
    fontStyle:{
      handler(nval){
        this.fontStyleData = nval
      },
      deep:true,
      immediate:true
    }
  },
	computed: {
		productList() {
			if (this.list.length > 0) {
				return this.group(this.list, 3);
			} else {
				return [
					[
						{
							productName: 'for example product info  list',
							url:
								'https://www.berrylook.com/en/Products/short-high-collar-brief-plain-long-sleeve-t-shirt-232100.html',
							img:this.demoImg,
							price: '$20.74',
							market_price: '$51.85',
						},
						{
							productName: 'for example product info  list',
							url:
								'https://www.berrylook.com/en/Products/short-high-collar-brief-plain-long-sleeve-t-shirt-232100.html',
								img:this.demoImg,
							price: '$20.74',
							market_price: '$51.85',
						},
						{
							productName: 'for example product info  list',
							url:
								'https://www.berrylook.com/en/Products/short-high-collar-brief-plain-long-sleeve-t-shirt-232100.html',
								img:this.demoImg,
							price: '$20.74',
							market_price: '$51.85',
						},
					],
				];
			}
		},
	},
	methods: {
		group(array, subGroupLength) {
			let index = 0;
			let newArray = [];
			let num = 0;
			while (index < array.length) {
				newArray.push(array.slice(index, (index += subGroupLength)));
				if (newArray[num].length < subGroupLength) {
					let len = subGroupLength - newArray[num].length;
					for (let i = 0; i < len; i++) {
						newArray[num].push({
							goods_name: 'for example product info  list',
							url: 'https://www.berrylook.com/en/Products/short-high-collar-brief-plain-long-sleeve-t-shirt-232100.html',
							productImg: this.demoImg,
							price: '$00.00',
							market_price: '$00.00',
						})
					}
				} num++;
			} return newArray;
		},
	},
};
</script>
<style scoped>
.image-placeholder{
	display: inline-block;
}
.placeholder-style{
	background-color: #f2f2f2;
    color: #b6b6b6;
    font-family: Arial,sans-serif;
    text-align: center;
    font-size: 12px;
    position: relative;
    min-width: 40px;
    min-height: 40px;
    display: inline-block;
    vertical-align: top;
}
.placeholder-inner{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    margin: auto;
    width: 100%;
}
</style>