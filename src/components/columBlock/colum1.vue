<template>
  <div>
    <div  v-for="(item,index) of productList" :key="index">
      <table border="0" cellspacing="0" cellpadding="0" width="100%">
        <tbody>
          <tr>
            <td>
              <div  style="display: table; width: 100%;">
                <div  style="display: table-row;">
                  <!--[if (mso)|(IE)]><table border="0" cellspacing="0" cellpadding="0" width="100%"><tr><td style="vertical-align: top; margin: 0 auto; width: 300px;" width="300"><![endif]-->
                  <table border="0" cellpadding="0" cellspacing="0" width="290" style="width: 290px;" >
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
                                        <td style="padding:10px">
                                          <table border="0" cellpadding="0" cellspacing="0" width="" style="">
                                            <tbody>
                                              <tr>
                                                <td style="font-size: 0; line-height: 0; text-align: center;">
                                                  <a target="_blank" :href="item.url">
                                                    <img  v-if="item.img" :src="item.img" width='268' height='270' alt="">
                                                    <span v-else class="image-placeholder" style="">
                                                      <span class="placeholder-style" style="width: 268px; height: 270px;">
                                                        <span class="placeholder-inner">
                                                         <img class="placeholder-img-medium" src="https://sources.aopcdn.com/edm/images//20211020/1634722588624.png" width="100">
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </a>
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
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--[if (mso)|(IE)]></td><td style="width: 20px; vertical-align: top;" width="20"><![endif]-->
                  <div  style="display: table-cell; width: 20px; vertical-align: top;"></div>
                  <!--[if (mso)|(IE)]></td><td style="vertical-align: middle; width: 300px;" width="300"><![endif]-->
                  <div style="display: table-cell; vertical-align: middle; width: 300px;">
                    <table border="0" cellspacing="0" cellpadding="0" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <table border="0" cellspacing="0" cellpadding="0" width="100%">
                              <tbody>
                                <tr>
                                  <td style="padding-top: 15px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="text-align: center;"><a class="webfont-fallback-1" target="_blank" :style="fontStyleData.describe" :href="item.url"><span class="webfont-fallback-1">{{item.goods_name}}</span></a></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <!-- <tr>
																	<td class="webfont-fallback-1" style="color:#999999;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;line-height:157%;padding-top:15px;text-align:center;text-decoration:none;">
																		<p data-inner-style="description_paragraph" data-title="Description paragraph" data-uneditable-style="margin" style="margin:0;"><a data-inner-style="description_link" data-style-queue="5" data-title="Description link" style="color:#999999;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;line-height:157%;text-decoration:underline;" target="_blank">Enter a text</a>. Use the tools from the toolbox to format it according to your preferences.</p>
																	</td>
																</tr> -->
                                <tr>
                                  <td style="padding-top: 15px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="text-align:center;"><span  :style="fontStyleData.price">{{item.price}}</span><span> / </span><span  :style="fontStyleData.marketPrice">{{item.market_price}}</span></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding-top: 15px;">
                                    <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto; border-collapse: separate !important;">
                                      <tbody>
                                        <tr>
                                          <td >
                                            <!--[if (mso)|(IE) ]><table border="0" cellpadding="0" cellspacing="0"><tr><td style="line-height: 17px;text-align: center;"><![endif]-->
                                            <!--[if !mso]><!-->
                                            <div :style="fontStyleData.button.border">
                                              <!--<![endif]--><a :href="item.url"  target="_blank" :style="fontStyleData.button.text">SHOP NOW</a>
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
                  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'colum1',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    fontStyle:{
      type:Object,
    }
  },
  data() {
    return {
      isData: false,
      demoImg: require('../../assets/images/placeholder-img200.png'),
      fontStyleData:{}
    };
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
        return this.list;
      } else {
        return [
          {
            goods_name: 'for example product info  list',
            url: 'https://www.berrylook.com/en/Products/short-high-collar-brief-plain-long-sleeve-t-shirt-232100.html',
            img: this.demoImg,
            price: '$20.74',
            market_price: '$51.85',
          },
        ];
      }
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