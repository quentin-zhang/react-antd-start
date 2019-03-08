var static_resource_version = "20190221113838"; // new Date().getTime();

window.ISYHTLiteVersion = false;


var locationUrl = window.location.protocol + "//" + window.location.host;
var apptenantUrl = "https://apcenter.yonyoucloud.com";
var yycloudUrl = "http://www.yyuap.com";
var yycloudMarketUrl = "https://apcenter.yonyoucloud.com";

if (window.location.host && (window.location.host.indexOf("idtest.yyuap.com") === -1)) {
	if (window.location.host.indexOf('diwork.com') !== -1) {
		apptenantUrl = "https://apcenter.diwork.com";
		yycloudUrl = "https://www.diwork.com";
		yycloudMarketUrl = "https://market.diwork.com";
		
	} else {
		apptenantUrl = "https://apcenter.yonyoucloud.com";
		yycloudUrl = "https://www.yonyoucloud.com";
		yycloudMarketUrl = "https://market.yonyoucloud.com";
	}
}

window.LocationUrl = locationUrl;
window.AppTenantLocationUrl = apptenantUrl;
window.YonyouCloudUrl = yycloudMarketUrl;
window.marketLocationUrl = yycloudMarketUrl;
var baseCDNPath = "https://cdn.yonyoucloud.com/pro/yht";
if (window.localStorage && (window.localStorage.loadFromLocal == 'true')) {
	baseCDNPath = '..';
}
/****  chanpayurl****/
//weijianchao 20170601
window.applyEntry = "https://ecos.yonyoucloud.com/assist/doc/help.html";
window.ChanPayUrl = "https://ypay.chanpay.com/personaly/wallet.htm";
//gaosong 20170615
//window.ChanPayUrl = "https://cpay.chanpay.com/personaly/wallet.htm";
window.CloudDataAppList = "https://apcenter.yonyoucloud.com/apptenant/pages/CloudDataCenter/zh_CN/CloudDataAppList.html" + "?ts=" + new Date().getTime();
window.UserCenterIndexPage = '';


try {
	require.config({
		//urlArgs: 'ver=' + static_resource_version,
		paths: {
			'jquery': baseCDNPath + '/jslib/jquery.min',
			// 'extendPagination': basePath + '/jslib/extendPagination',
			'pubsub': baseCDNPath + '/jslib/pubsub',
			'bootstrap': baseCDNPath + '/jslib/bootstrap.min',
			'webuploader': baseCDNPath + '/jslib/webuploader',
			// 'browser':  '../jslib/browser.min',
			// 'react':  '../jslib/react.min',
			// 'react-dom':  '../jslib/react-dom.min',
			// 'browser':'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min',
			//'JSXTransformer': basePath + 'jslib/JSXTransformer',
			// 'cookies': basePath + '/jslib/jquery.cookies',
			'json': baseCDNPath + '/jslib/jquery.json.min',
			'blockUI': baseCDNPath + '/jslib/jquery.blockUI',
			'md5': baseCDNPath + '/jslib/jquery.md5',
			//'sha1': 'jslib/sha1',
			'security': baseCDNPath + '/jslib/security',
			//dll
			//'vendor': basePath + 'build/dll/vendor.dll',
			'vendor1': baseCDNPath + '/build/dll/vendor1.dll',
			'vendor2': baseCDNPath + '/build/dll/vendor2.dll',
			'vendor3': baseCDNPath + '/build/dll/vendor3.dll',
			'vendor4': baseCDNPath + '/build/dll/vendor4.dll',
			// 'vendor5': baseCDNPath + '/build/dll/vendor5.dll',
			// 'antd':'../jslib/antd',
			// 'moment':'../jslib/moment.min',
			'bundle': '../build/bundle.' + static_resource_version,
			//json
			// 'LOCZH': basePath + '/js/json/LOCZH',
			// 'LOCEN': basePath + '/js/json/LOCEN',
			// 'INDUSTRY': basePath + '/js/json/INDUSTRY',
			// 'INDUSTRY_EN': basePath + '/js/json/INDUSTRY_EN',
			'resize': baseCDNPath + '/js/common/resize',
			'toolbar': '../toolbar/toolbar',
			'jquery.basictool': '../js/common/jquery.basictool',
			//css_hack

			'css_hack_placeholder': baseCDNPath + '/css_hack/placeholder'
		},
		shim: {
			'jquery': {
				exports: '$'
			},
			'bootstrap': {
				deps: ['jquery']
			},

			'jquery.basictool': {
				deps: ['jquery']
			},
			'webuploader': {
				deps: ['jquery']
			},
			// 'cookies': {
			// 	deps: ['jquery']
			// },
			'json': {
				deps: ['jquery']
			},
			'security': {
				deps: ['jquery']
			},
			'md5': {
				deps: ['jquery']
			},
			'blockUI': {
				deps: ['jquery']
			},
			'vendor1': {
				deps: ['jquery']
			},
			'vendor2': {
				deps: ['jquery']
			},
			'vendor3': {
				deps: ['jquery']
			},
			'vendor4': {
				deps: ['jquery']
			},
			// 'antd': {
			// 	deps: ['react','react-dom','browser','moment']
			// },
			// 'vendor5': {
			// 	deps: ['jquery']
			// },
			'bundle': {
				deps: ['vendor1', 'vendor2', 'vendor3', 'vendor4']
			},
			// 'LOCZH': {
			// 	deps: ['jquery']
			// },
			// 'LOCEN': {
			// 	deps: ['jquery']
			// },
			// 'INDUSTRY': {
			// 	deps: ['jquery']
			// },
			// 'INDUSTRY_EN': {
			// 	deps: ['jquery']
			// },
			'resize': {
				deps: ['jquery']
			},
			'css_hack_placeholder': {
				deps: ['jquery']
			}
		}
	});

	// require(['jquery', 'bootstrap', 'pubsub', 'resize', 'webuploader', 'cookies', 'json', 'md5', 'security', 'bundle',
	// 	'jquery.basictool', 'css_hack_placeholder', 'blockUI', 'toolbar'
	var _initArray = ['jquery', 'pubsub'];
	var _delayArray = ['bootstrap', 'json', 'resize', 'webuploader','bundle',
		'jquery.basictool', 'css_hack_placeholder', 'md5', 'security', 'blockUI'
	];
	if (window.location.pathname && (window.location.pathname != '/')) {
		_initArray = ['jquery', 'bootstrap', 'json', 'resize', 'webuploader','bundle',
			'jquery.basictool', 'pubsub', 'css_hack_placeholder'
		]
		_delayArray = ['md5', 'security', 'blockUI'];
	}
	require(_initArray, function() {

		if (arguments.length > 4) {
			window.WebUploader = arguments[4].Webuploader;
		}
		window.console && console.log("jslib loaded success.");
		require(_delayArray, function() {}, function() {
			if (arguments.length > 4) {
				window.WebUploader = arguments[3].Webuploader;
			}
			window.console && console.log("jslib loaded failed.");
		});
	}, function() {
		window.console && console.log("jslib loaded failed.");
	});
} catch (e) {
	window.console && console.log(e);
}