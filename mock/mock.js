const Mock = require('mockjs');
module.exports = function(app){
    app.get('/api/querySiteInfo',function(req,res){
        // res.json({
        //     meSystem:[
        //         "orderplus",
        //         "calladream",
        //         "fashionmia",
        //         "fashionme",
        //         "berrylook",
        //         "comfybub",
        //     ],
        //     cloud:[
        //         "blogladi",
        //         "funluc",
        //         "skybomiu",
        //         "anystylish",
        //         "popopieshop",
        //         "cathybuy",
        //         "selaros",
        //         "onlyyo",
        //         "omnifever",
        //         "trendysuper",
        //         "sebellamore",
        //     ],
        //     shopify:[
        //         "verywear",
        //         "techwearclub",
        //         "rollangel",
        //         "netlumi",
        //         "aqilabuy",
        //         "lululike",
        //         "stylishplus",
        //         "mumetaz",
        //         "hellocloth",
        //     ],
        //     Independence:[
        //         "ng-style",
        //         "kokorou"
        //     ],
        //     api:{
        //         blogladi:[
        //             "blogladi",
        //             "http://cloud-api.orderplus.com/api/goods/list?siteId=41758&lang=ar&processCurrency=true&spu=",
        //             "SLang",
        //         ],
        //         berrylook: ["BERRY", "https://websolr.berrylook.com/dla?insku=", "bl."],
        //         airytops :[
        //             "airytops ",
        //             "http://api.opmall.com/api/Product/shoplazzaEdm?pid=7714&spus=",
        //         ],
        //         rollangel:[
        //             "rollangel",
        //             "http://lms.orderplus.com/api/bamboo/siteProduct/getPDMSpdSpuInfoList?siteId=24660&spus="
        //         ],
        //         techwearclub:[
        //             "techwearclub",
        //             "http://lms.orderplus.com/api/bamboo/siteProduct/getPDMSpdSpuInfoList?siteId=33968&spus="
        //         ],
        //         verywear:[
        //             "verywear",
        //             "http://lms.orderplus.com/api/bamboo/siteProduct/getPDMSpdSpuInfoList?siteId=24646&spus="
        //         ]
        //     }
        // });
        res.json([

            {
                api:'http://cloud-api.orderplus.com/api/goods/list?siteId=41758&processCurrency=true&spu=',
                name:'blogladi',
                platform:'shopify',
                site_id:'41758'
            },
           {
                api:'http://lms.orderplus.com/api/bamboo/siteProduct/getPDMSpdSpuInfoList?siteId=24646&spus=',
                name:'verywear',
                platform:'shopify',
                site_id:'24646'
            },
           {
                api:'https://websolr.berrylook.com/dla?insku=',
                name:'berrylook',
                platform:'meSystem',
                site_id:'1'
            },
            {
                api:'http://cloud-api.orderplus.com/api/goods/list?siteId=41758&lang=ar&processCurrency=true&spu=',
                name:'blogladi',
                platform:'cloud',
                site_id:'41758'
            }
        ]
        )
    })
} 