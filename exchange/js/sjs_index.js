function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
var Request = new Object();
Request = GetRequest();



var scroll_flag = 1;
//左边pageSize
var pageSize="15";

jQuery(document).ready(function ($) {
	//分版块
	init_nav_tabs();
	//添加后续的随机数
	f_rand();
	// 获取头像/退出登录
	load_func();

	// 获取头像
	init_cookie();

	//更新接口,访问获取左边信息
	index_first_query('1',pageSize,'0','0','0');
	//
	$("#content_whole_inner").niceScroll({
		cursorcolor: "#999",
		cursoropacitymax: 1,
		touchbehavior: false,
		cursorwidth: "0px",
		cursorborder: "0",
		cursorborderradius: "5px"
	});

	$("#buy_sell_time_contaniner").niceScroll({
		cursorcolor: "#999",
		cursoropacitymax: 1,
		touchbehavior: false,
		cursorwidth: "2px",
		cursorborder: "0",
		cursorborderradius: "5px"
	});

	$("#personal_content_center,.sjs_content_right").niceScroll({
		cursorcolor: "#999",
		cursoropacitymax: 1,
		touchbehavior: false,
		cursorwidth: "3px",
		cursorborder: "0",
		cursorborderradius: "5px"
	});

	purchase_func();

	$('#buy_sell_time').scrollTop($('#buy_sell_time')[0].scrollHeight);

})

//分版块
function init_nav_tabs(){
	//
	$(".tab-content .sjs_content_inner").niceScroll({
		cursorcolor: "#999",
		cursoropacitymax: 1,
		touchbehavior: false,
		cursorwidth: "0px",
		cursorborder: "0",
		cursorborderradius: "5px"
	});
	//点击事件
	nav_filter_click();
	//上面nav点击事件
	nav_click_data();
	//
	foot_banner_click();
}
//页面脚点击事件
function foot_banner_click(){
	$("#xl_logo").on("click",function(){
		window.location.href="http://weibo.com/u/6054953907?is_hot=1";
	})
}
//导航点击事件
function nav_click_data(){
	$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
		var current_nav=e.target // 激活的标签页
		e.relatedTarget // 前一个激活的标签页
		which_nav_clicked(current_nav);
	});
}
//那个nav被点击过
var get_new_query_product_flag=0;
function which_nav_clicked(obj){
	//被选中的类型
	var type=$(obj).attr("data-type");
	//获取数据
	var container=$($(obj).attr("href"));
	//清空container
	$(container).empty();
	$(container).attr("data-page","1");
	//
	var page=$(container).attr("data-page");
	var timeType=$("#time_type").attr("data-click");
	var sort=$("#filter_data").attr("data-sort");
	//查询接口获取数据
	if(get_new_query_product_flag==0){
		get_new_query_product_flag=1;
		get_new_query_product(page,pageSize,timeType,sort,type);
		get_new_query_product_flag=0;	
	}
}
//过滤条件的点击事件
function nav_filter_click(){
	//时间秒小时切换
	$("#time_type").on("click",function(){
		var type=$(this).attr("data-click");
		if(type=="1"){
			$(this).attr("data-click","0");
			$(this).html("最新元/小时");
			$(this).css({
				"color":"#999999"
			});
		}
		if(type=="0"){
			$(this).attr("data-click","1");
			$(this).html("最新元/秒");
			$(this).css({
				"color":"#007AFF"
			});
		}
		load_data_after_click_filter();
	})
	//按照时间排序
	$("#time_type_arrow").on("click",function(){
		var type=$(this).attr("data-click");
		if(type=="2"){
			$("#time_type_arrow").css({
				'background':"url('img/sjs_index/sort_default.png') no-repeat",
				'background-size': 'contain',
    			'background-position': 'center',
			})
			$(this).attr("data-click","0");
			$("#filter_data").attr("data-sort","0");
		}
		if(type=="0"){
			$("#time_type_arrow").css({
				'background':"url('img/sjs_index/sort_max.png') no-repeat",
				'background-size': 'contain',
    			'background-position': 'center',
			})
			$(this).attr("data-click","1");
			$("#filter_data").attr("data-sort","1");
		}
		if(type=="1"){
			$("#time_type_arrow").css({
				'background':"url('img/sjs_index/sort_min.png') no-repeat",
				'background-size': 'contain',
    			'background-position': 'center',
			})
			$(this).attr("data-click","2");
			$("#filter_data").attr("data-sort","2");
		}
		load_data_after_click_filter();
	})
/////////////涨跌幅
	$("#sort_type,#sort_type_arrow").on("click",function(){
		var type=$("#sort_type").attr("data-click");
		if(type=="2"){
			$("#sort_type_arrow").css({
				'background':"url('img/sjs_index/sort_default.png') no-repeat",
				'background-size': 'contain',
    			'background-position': 'center',
			})
			$("#sort_type").css({
				"color":"#999999"
			})
			$("#sort_type").attr("data-click","0");
			$("#filter_data").attr("data-sort","0");
		}
		if(type=="0"){
			$("#sort_type_arrow").css({
				'background':"url('img/sjs_index/sort_max.png') no-repeat",
				'background-size': 'contain',
    			'background-position': 'center',
			})
			$("#sort_type").css({
				"color":"#007AFF"
			})
			$("#sort_type").attr("data-click","1");
			$("#filter_data").attr("data-sort","3");
		}
		if(type=="1"){
			$("#sort_type_arrow").css({
				'background':"url('img/sjs_index/sort_min.png') no-repeat",
				'background-size': 'contain',
    			'background-position': 'center',
			})
			$("#sort_type").css({
				"color":"#007AFF"
			})
			$("#sort_type").attr("data-click","2");
			$("#filter_data").attr("data-sort","4");
		}
		load_data_after_click_filter();
	})
}

function load_data_after_click_filter(){
	//重新请求一次数据
	var which_tab_showed=$("#index_tab").find("li.active").find("a");
	which_nav_clicked(which_tab_showed);
}


function f_rand() {
	rand = Math.random();
	$('a:not(.tab_btn)').each(function () {
		href = $(this).attr('href');
		if (href.length == 0 || href.indexOf('javascript') > -1) return;
		else if (href.indexOf('?') > -1) {
			$(this).attr('href', href + '&' + rand);
		} else {
			$(this).attr('href', href + '?' + rand);
		}
	});
};


function load_func() {
	$('#release_btn').on('click', function () {
		// alert(33)
		get_Logout();
	})

}

// 获取cookie
function init_cookie() {
	var avatar = getCookie('sjs_load_avatar');
	if (avatar != null && name != null) {
		show_load_data(avatar, name);
	}
}

// 登录注册隐藏  用户显示
function show_load_data(avatar, name) {
	//登录和注册消失
	$('#pc_user_load').parent('li').hide();
	$('#pc_user_register').parent('li').hide();
	//用户信息显示
	$('#user_avatar,#release_btn').show();
	load_message(avatar, name);
}


// 登录和注册显示 用户隐藏
function hide_load_data() {
	//登录和注册显示
	$('#pc_user_load').parent('li').show();
	$('#pc_user_register').parent('li').show();
	//用户隐藏
	$('#release_btn,#user_avatar').hide();
}


/////modal初始化结束,登录成功后函数
function load_message(avatar, name) {
	//头像avatar
	var avatar_png_url = allurl2 + avatar;
	//名字name
	if (name == '') {
		name = '小U';
	}
	var name_value = name;
	///
	var user_avatar_obj = document.getElementById('user_avatar');
	addAvatar(avatar_png_url, user_avatar_obj);
	///
	$('#user_name').html(name_value);

}


function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		return null;
	}
}


function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) {
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
		//init the unload;
		hide_load_data();
	}
}


function load_out_cookie() {
	//useravatar
	delCookie('sjs_load_avatar');
	delCookie('sjs_load_name');
	delCookie('sjs_load_tel');
	delCookie('sjs_stats_flag');
}


// 获取_ya图片
function addImg_ya(isrc, object, origin_src) {
	var origin_url = origin_src;
	var Img = new Image();
	Img.src = isrc;
	Img.onload = function () {
		object.src = isrc;
	}
	Img.onerror = function () {
		var url = add_url1 + origin_url.split('.')[0] + '_ya.jpg';
		addImg(url, object);
	}
}
// 设置图片
function addImg(isrc, object) {
	var Img = new Image();
	Img.src = isrc;
	Img.onload = function () {
		object.src = isrc;
	}
	Img.onerror = function () {
		object.src = 'img/default/rectangle.png';
	}
}

function addAvatar(isrc, object) {
	var Img = new Image();
	Img.src = isrc;
	Img.onload = function () {
		object.src = isrc;
	}
	Img.onerror = function () {
		object.src = 'img/default/default_avatar.png';
	}
}

// 退出登录
function get_Logout() {
	var tags_url = allurl1 + 'uusjs/userLogout.do';
	ajax(get_Logout_url(tags_url), function (data) {
		if (data.MSG = 'SUCCESS') {
			load_out_cookie();

			window.location = 'html/sjs_load.html';
		} else {
			alert(data.MSG);
		}
	});
}


//get url
function get_Logout_url(originurl, n1, n2, n3, n4, n5, m1, m2, m3, m4, m5) {
	var index_string = getresult(originurl, 'orderReservations', '', '', '', '', '', '', '', '', '', '');

	return index_string;
}

// 左上  搜索框
var $purchase_price_buy = null;
var $purchase_price_sell = null;
var $availableTags = null;
var $availableflag = 0;
var $quotation = '';
$(function () {
	var availableTags = [];
	if ($availableflag == 0) {
		$.ajax({
			url: allurl1 + 'uusjs/autoComplete.do',
			type: "POST",
			data: {
				investorsCode: $quotation
			},
			success: function (data) {
				//console.log(data);
				$.each($.parseJSON(data).LIST, function (index, el) {
					availableTags.push(el.investorsCode + '  ' + el.investorsName);
				});
			}
		});


		$availableflag = 1;
	}

	$('#code_ipt').autocomplete({
		source: availableTags,
		focus: function (event, ui) {
			$purchase_price_buy = ui.item.value.split(' ')[0];
		}
	})

	$('#sell_out_ipt').autocomplete({
		source: availableTags,
		focus: function (event, ui) {
			$purchase_price_sell = ui.item.value.split(' ')[0];
		}
	})

})


function purchase_func() {
	$('.sjs_purchase .btn-group button').each(function () {
		var index = $(this).index();
		$('.sjs_purchase .btn-group button').eq(index).on('click', function () {
			$(this).addClass('active').siblings().removeClass('active');
			$('.purchase_tab').eq(index).show().siblings('').hide();

		})
		$('#purchase_nav_modal .btn-group button').eq(index).on('click', function () {
			$(this).addClass('active').siblings().removeClass('active');
			$('.purchase_nav_tab').eq(index).show().siblings('').hide();

		})

	});

	$('.sjs_header_right li').eq(0).on('click', function () {
		$('#purchase_nav_modal .btn-group button').eq(0).addClass('active').siblings().removeClass('active');
		$('#purchase_nav_modal .purchase_nav_tab').eq(0).show().siblings('').hide();

	})


	$('.sjs_header_right li').eq(1).on('click', function () {
		$('#purchase_nav_modal .btn-group button').eq(1).addClass('active').siblings().removeClass('active');
		$('#purchase_nav_modal .purchase_nav_tab').eq(1).show().siblings('').hide();

	})

	// 搜索
	$('#nope').on('input propertychange', function () {
		if ($(this).val() == '') {
			$('#content_whole_inner').empty();
			// 查询股票行情
			//get_query_Product('1', '15', '0');
			index_first_query('1',pageSize,'0','0','0');
		}
	});

}


var clsflag = 0;
var hidflag = 0;
var rigflag = 0;

var new_flag = 0;
var ups_flag = 0;


function the_click() {
	$('.sjs_content_top span').eq(1).off('click');
	$('.sjs_content_top span').eq(2).off('click');


	$('.sjs_content_top span').eq(1).on('click', function () {
		$('#content_whole_inner').empty();
		if (new_flag == 0) {
			$('#content_whole_inner').empty();

			$('div.sjs_content_top span').eq(1).find('img').prop('src', 'img/sjs_index/hang.png');

			get_query_Product('1', '15', '1');
			new_flag = 1;
			ups_flag = 0;
		} else if (new_flag == 1) {
			$('#content_whole_inner').empty();

			$('div.sjs_content_top span').eq(1).find('img').prop('src', 'img/sjs_index/zang.png');

			get_query_Product('1', '15', '0');
			new_flag = 0;
		}

		$('div.sjs_content_top span').eq(2).find('img').prop('src', 'img/sjs_index/zang.png');
	});

	$('.sjs_content_top span').eq(2).on('click', function () {
		$('#content_whole_inner').empty();
		if (ups_flag == 0) {
			$('#content_whole_inner').empty();

			$('div.sjs_content_top span').eq(2).find('img').prop('src', 'img/sjs_index/hang.png');

			get_query_Product('1', '15', '2');
			ups_flag = 1;
			new_flag = 0;
		} else if (ups_flag == 1) {
			$('#content_whole_inner').empty();

			$('div.sjs_content_top span').eq(2).find('img').prop('src', 'img/sjs_index/zang.png');

			get_query_Product('1', '15', '0');

			ups_flag = 0;
		}

		$('div.sjs_content_top span').eq(1).find('img').prop('src', 'img/sjs_index/zang.png');
	});

	// 点击左边放大
	$('.right_price_num img').eq(0).click(function () {
		if (clsflag == 0) {
			$('.sjs_content_left').hide();

			if (rigflag == 0) {
				$('.sjs_content_center').css({
					'width': '80%',
				});
				$('.sjs_right_left_top').css('width', '60%');
			} else if (rigflag == 1) {
				$('.sjs_content_center').css({
					'width': '100%',

				});
				$('.sjs_right_left_top').css('width', '50%');
			}

			clsflag = 1;

		} else if (clsflag == 1) {
			$('.sjs_content_left').show();

			if (rigflag == 1 && clsflag == 0) {
				$('.sjs_content_center').css({
					'width': '60%',

				});
				$('.sjs_right_left_top').css('width', '100%');
			} else if (rigflag == 0) {
				$('.sjs_content_center').css({
					'width': '60%',

				});
				$('.sjs_right_left_top').css('width', '100%');
			} else if (rigflag == 1) {
				$('.sjs_content_center').css({
					'width': '80%',

				});
				$('.sjs_right_left_top').css('width', '70%');
			}

			clsflag = 0;
		}

		$("#main_chart").empty();
		init_chart(close_Price, uplowFlag, up_down_price);

		init_k_func();

	})
	// 点击右边放大
	$('.right_price_num img').eq(1).click(function () {
		if (rigflag == 0) {
			$('.sjs_content_right').hide();

			if (clsflag == 0) {
				$('.sjs_content_center').css({
					'width': '80%',

				});
				$('.sjs_right_left_top').css('width', '80%');
			} else if (clsflag == 1) {
				$('.sjs_content_center').css({
					'width': '100%',

				});
				$('.sjs_right_left_top').css('width', '60%');
			}

			rigflag = 1;

		} else if (rigflag == 1) {
			$('.sjs_content_right').show();

			if (clsflag == 1 && rigflag == 0) {
				$('.sjs_content_center').css({
					'width': '60%',

				});
				$('.sjs_right_left_top').css('width', '100%');
			} else if (clsflag == 0) {
				$('.sjs_content_center').css({
					'width': '60%',

				});
				$('.sjs_right_left_top').css('width', '100%');
			} else if (clsflag == 1) {
				$('.sjs_content_center').css({
					'width': '80%',

				});
				$('.sjs_right_left_top').css('width', '60%');
			}

			rigflag = 0;
		}

		$("#main_chart").empty();
		init_chart(close_Price, uplowFlag, up_down_price);

		init_k_func();


	})


}


// 获取行情
var Product_flag = 0;
var _investorsName = null;
var _investorscode = null;
var _price = null;

function get_query_Product(current, page, sort) {
	$.ajax({
		url: allurl1 + 'uusjs/queryAllProduct.do',
		type: 'POST',
		dataType: 'json',
		data: {
			currentPage: current,
			pageSize: page,
			sort: sort
		},
		success: function (data) {
			//
			var map = data.LIST;
			var get_routes_container = document.getElementById('content_whole_inner');
			if (map.length > 0) {
				for (var i = 0; i < map.length; i++) {
					var create_one_route = new query_product(map[i], get_routes_container);
					create_one_route.getclick();
				}

				if (Product_flag == 0) {

					// 买盘卖盘 个人信息 价格
					get_buy_disc_sell(map[0].investorsCode);

					_investorsName = map[0].investorsName;
					_investorscode = map[0].investorsCode;
					_price = map[0].newOrderPrice;

					Product_flag = 1;
				}

				$('.main_data').first().addClass('active').siblings().removeClass('active');


			} else {
				$('#content_whole_inner').off('scroll');
			}

		}
	})
}


// 中间左边信息
function query_product(map, parent) {
	this.img = document.createElement('img');
	addAvatar(allurl2 + map.investorsAvatar, this.img);

	this.dt = document.createElement('dt');
	this.dt.appendChild(this.img);

	this.b1 = document.createElement('b');
	this.b1.innerHTML = map.investorsName;

	this.br = document.createElement('br');

	this.b2 = document.createElement('b');
	this.b2.className = 'b2_investorsCode'
	this.b2.innerHTML = map.investorsCode;

	this.dd = document.createElement('dd');
	this.dd.appendChild(this.b1);
	this.dd.appendChild(this.br);
	this.dd.appendChild(this.b2);

	this.dl = document.createElement('dl');
	this.dl.appendChild(this.dt);
	this.dl.appendChild(this.dd);

	this.span1 = document.createElement('span');

	this.b3 = document.createElement('b');

	this.span2 = document.createElement('span');
	this.span2.className = 'span_last';
	this.span2.appendChild(this.b3);


	if (map.investorsStatus == 0) {
		this.span1.innerHTML = map.newOrderPrice;
		this.span1.className = 'ie_height red';

		this.b3.innerHTML = '申购中';
		this.b3.style.background = 'none'
	} else {
		this.span1.innerHTML = map.newOrderPrice;
		if (map.uplowStatus == 2) {
			this.span1.className = 'ie_height green';
			this.b3.className = 'back_green';
		} else if (map.uplowStatus == 1) {
			this.span1.className = 'ie_height red';
		}

		this.b3.innerHTML = map.uplowPrice;
	}


	this.div = document.createElement('div');
	this.div.className = 'main_data';

	this.div.appendChild(this.dl);
	this.div.appendChild(this.span1);
	this.div.appendChild(this.span2);

	parent.appendChild(this.div);

	this.investorsCode = map.investorsCode;
	this.map = map;
}
query_product.prototype.getclick = function () {
	var _this = this;
	this.div.onclick = function () {
		$('.main_data').removeClass('active');
		this.className += ' active';

		_investorsName = _this.map.investorsName;
		_investorscode = _this.map.investorsCode;
		_price = _this.map.newOrderPrice;

		get_buy_disc_sell(_this.investorsCode);
	}
}


// 右面买盘卖盘 个人资料
var mint_price = [];
var mint_min_time = [];
// 价格
var tArray = new Array();
// 涨跌幅
var aArray = new Array();
// 成交
var amount = new Array();
// 成交量
var mint_volume = [];
// 颜色
var mint_color = [];

var close_Price = null;

var uplowFlag = null;

var up_down_price = null;
//获取最大涨跌幅
var up_down_Array=new Array();


//k线
//成交额
var volume_amount = new Array();
//颜色
var volume_color = [];
//成交额
var volume_money = [];

//时间
var day_time = [];

//开盘  最高  最低  昨收  涨跌额  涨跌幅  成交量
var _open_price = [];
var _highest_price = [];
var _minimum_price = [];
var _today_collect = [];
var _yesterday_collect = [];
var _ups_down_price = [];
var _ups_down_picture = [];
var _volume_amount = [];

var k_data = [];


//
var _k_color = new Array();
function get_buy_disc_sell(code) {
	$.ajax({
		url: allurl1 + 'uusjs/publishInformation.do',
		type: 'POST',
		dataType: 'json',
		data: {
			pcode: code
		},
		success: function (data) {
			console.log(data);
			var obj = data.OBJECT;

			// 价格
			if (obj.baseInformation != null) {
				uplowFlag = obj.baseInformation.uplowFlag;
				up_down_price = obj.baseInformation.price;
				if (Number(obj.baseInformation.closePrice) > 0) {
					close_Price = obj.baseInformation.closePrice;
				} else {
					close_Price = obj.baseInformation.openPrice;
				}

				$('#personal_content_center').empty();
				var get_personal = new personal_information(obj.baseInformation, $('#personal_content_center'), close_Price, obj.investors);
				get_personal.getclick();

			} else {

			}


			mint_price = [];
			mint_min_time = [];
			mint_volume = [];
			mint_color = [];
			volume_color = [];
			volume_money = [];

			tArray = new Array();
			volume_amount = new Array();
			aArray = new Array();
			up_down_Array=new Array();
			amount = new Array();

			day_time = [];
			_open_price = [];
			_highest_price = [];
			_minimum_price = [];
			_today_collect = [];
			_yesterday_collect = [];
			_ups_down_price = [];
			_ups_down_picture = [];
			_volume_amount = [];
			k_data = [];

			_k_color = new Array();


			$('#sjs_right_buy,#sjs_right_sell,#buy_sell_time').empty();
			//
			// 卖盘
			for (var i = 5; i >= 1; i--) {
				var get_sell_disc = new buy_disc(obj.sellFilverList[i - 1], $('#sjs_right_sell'), i, close_Price, 0);

			}

			// 买盘
			for (var i = 0; i < 5; i++) {
				var get_buy_disc = new buy_disc(obj.buyFiverList[i], $('#sjs_right_buy'), i + 1, close_Price, 1);
			}

			//id="buy_sell_time"  class="table"
			// 买卖
			if (obj.buyAndSellerList.length >= 1) {
				//增加的代码，此处优化较多
				var buyer_sell_container_cache=document.createElement("tbody");
				for (var n = 0; n < obj.buyAndSellerList.length; n++) {
					var get_buy_sell = new buy_sell_disc(obj.buyAndSellerList[n],buyer_sell_container_cache, close_Price);
				}
				$("#buy_sell_time").append(buyer_sell_container_cache);
			} else {
				for (var i = 0; i < 5; i++) {
					var buy_sell_td1 = document.createElement('td');
					buy_sell_td1.innerHTML = '…';

					var buy_sell_td2 = document.createElement('td');
					buy_sell_td2.className = 'color_red';
					buy_sell_td2.innerHTML = '…';

					var buy_sell_td3 = document.createElement('td');
					buy_sell_td3.className = 'color_yellow';
					buy_sell_td3.innerHTML = '…';

					var buy_sell_tr = document.createElement('tr');
					buy_sell_tr.appendChild(buy_sell_td1);
					buy_sell_tr.appendChild(buy_sell_td2);
					buy_sell_tr.appendChild(buy_sell_td3);

					$('#buy_sell_time').append(buy_sell_tr);

				}
			}

			//分时
			if (obj.minitePriceList.length > 0) {
				for (var k = 0; k < obj.minitePriceList.length; k++) {
					mint_min_time.push(obj.minitePriceList[k].time)

					mint_color.push((obj.minitePriceList[k].buyAndSell * 10) % 10);

					mint_volume.push(parseInt(obj.minitePriceList[k].buyAndSell.split('.')[0]));
					mint_price.push(obj.minitePriceList[k].price);
				}

				//获取价格参数
				for (var a = 0; a < obj.minitePriceList.length; a++) {

					tArray[a] = [mint_min_time[a], mint_price[a]];

					amount[a] = [mint_volume[a], mint_color[a]];

				}

				//获取增幅参数
				for (var a = 0; a < obj.minitePriceList.length; a++) {
					var add = ((parseFloat(mint_price[a]) - parseFloat(close_Price)) / parseFloat(close_Price)) * 100;

					aArray[a] = [mint_volume[a], add.toFixed(2) + ""];
					//获取涨跌幅数组
					up_down_Array[a]=parseFloat(add.toFixed(2));
				}

				// 分时
				init_chart(close_Price, obj.baseInformation.uplowFlag, up_down_price);
			} else {
				for (var i = 0; i < mint_time.length; i++) {
					mint_min_time.push('0.00')

					mint_color.push((0 * 10) % 10);

					mint_volume.push('0.00');
					mint_price.push('0.00');
				}


				//获取价格参数
				for (var a = 0; a < mint_min_time.length; a++) {

					tArray[a] = [mint_min_time[a], mint_price[a]];

					amount[a] = [mint_volume[a], mint_color[a]];

				}


				//获取增幅参数
				for (var a = 0; a < mint_min_time.length; a++) {
					var add = ((parseFloat(mint_price[a]) - parseFloat(close_Price)) / parseFloat(close_Price)) * 100;

					aArray[a] = [mint_volume[a], add.toFixed(2) + ""];
					//获取涨跌幅数组
					up_down_Array[a]=parseFloat(add.toFixed(2));
				}

				// 分时
				init_chart(close_Price, obj.baseInformation.uplowFlag, up_down_price);

			}

			// 点击事件
			the_click();

			if (obj.investors != null) {


				if (obj.investors != '' && obj.investors != null) {
					// 个人信息
					var get_personal_content = new personal_content(obj.investors, $('.sjs_right_left_center'));
					// get_personal_content.getclick();
				}


			}

			$('#buy_sell_time_contaniner').scrollTop($('#buy_sell_time')[0].scrollHeight); //当页面加载时滚动条滚到最下面


			//k线
			if (obj.tInvestHisList.length > 0) {
				if (obj.tInvestHisList.length < 30) {
					for (var n = 0; n < 30; n++) {
						if (n < obj.tInvestHisList.length) {
							//时间
							day_time.push(obj.tInvestHisList[n].investorsDate);

							//成交额
							volume_money.push(obj.tInvestHisList[n].investorsAllMoney.substring(0, obj.tInvestHisList[n].investorsAllMoney.length - 2));

							volume_color.push(obj.tInvestHisList[n].investorsAllMoney.split('.')[2]);


							//日k
							_open_price.push(obj.tInvestHisList[n].investorsOpenPrice);

							_highest_price.push(obj.tInvestHisList[n].investorsHighestPrice);

							_minimum_price.push(obj.tInvestHisList[n].investorsLowestPrice);

							_today_collect.push(obj.tInvestHisList[n].investorsTodayClosePrice);

							_yesterday_collect.push(obj.tInvestHisList[n].investorsClosePrice);

							_ups_down_price.push(obj.tInvestHisList[n].uplow);

							_ups_down_picture.push(obj.tInvestHisList[n].uplowPrice);

							_volume_amount.push(obj.tInvestHisList[n].investorsAllNum.split('.')[0]);
						} else {
							//时间
							day_time.push(obj.tInvestHisList[obj.tInvestHisList.length - 1].investorsDate);

						}

					}

					for (var b = 0; b < obj.tInvestHisList.length; b++) {
						volume_amount[b] = [volume_money[b], volume_color[b]];

						k_data.push([_open_price[b], _today_collect[b], _minimum_price[b], _highest_price[b], _yesterday_collect[b], _ups_down_picture[b], _ups_down_price[b], _volume_amount[b]]);

						// k_data.push([_open_price[b], _today_collect[b], _minimum_price[b], _highest_price[b],_yesterday_collect[b]]);

					}
				} else {
					for (var n = 0; n < obj.tInvestHisList.length; n++) {
						//时间
						day_time.push(obj.tInvestHisList[n].investorsDate);

						//成交额
						volume_money.push(obj.tInvestHisList[n].investorsAllMoney.substring(0, obj.tInvestHisList[n].investorsAllMoney.length - 2));

						volume_color.push(obj.tInvestHisList[n].investorsAllMoney.split('.')[2]);

						//日k
						_open_price.push(obj.tInvestHisList[n].investorsOpenPrice);

						_highest_price.push(obj.tInvestHisList[n].investorsHighestPrice);

						_minimum_price.push(obj.tInvestHisList[n].investorsLowestPrice);

						_today_collect.push(obj.tInvestHisList[n].investorsTodayClosePrice);

						_yesterday_collect.push(obj.tInvestHisList[n].investorsClosePrice);

						_ups_down_price.push(obj.tInvestHisList[n].uplow);

						_ups_down_picture.push(obj.tInvestHisList[n].uplowPrice);

						_volume_amount.push(obj.tInvestHisList[n].investorsAllNum.split('.')[0]);

					}


					for (var b = 0; b < obj.tInvestHisList.length; b++) {
						volume_amount[b] = [volume_money[b], volume_color[b]];

						k_data.push([_open_price[b], _today_collect[b], _minimum_price[b], _highest_price[b], _yesterday_collect[b], _ups_down_picture[b], _ups_down_price[b], _volume_amount[b]]);

					}
				}
			}

			return obj.baseInformation.price;

		}

	})
}


// 获取中间头部 价格
function personal_information(map, parent, ele, data) {
	// 内容头部
	this.span = document.createElement('span');

	this.img = document.createElement('img');
	this.br = document.createElement('br');

	this.b1 = document.createElement('b');
	this.b2 = document.createElement('b');
	this.b1.innerHTML = map.addPrice;

	this.b2.style.paddingLeft = '10%';

	this.personal_top = document.createElement('div');
	this.personal_top.className = 'sjs_top_left';

	this.personal_top.appendChild(this.span);
	// this.personal_top.appendChild(this.img);
	this.personal_top.appendChild(this.br);
	this.personal_top.appendChild(this.b1);
	this.personal_top.appendChild(this.b2);

	this.li1 = document.createElement('li');
	this.li2 = document.createElement('li');
	this.li3 = document.createElement('li');
	this.li4 = document.createElement('li');
	this.li5 = document.createElement('li');
	this.li6 = document.createElement('li');
	this.li6_i1 = document.createElement('i');
	this.li7 = document.createElement('li');


	if (data.investorsStatus == 0) {
		this.span.innerHTML = '申购中';
		this.span.style.color = '#ccc';
		this.b1.style.color = '#ccc';

		if (data.investorsStatus > 0) {
			this.b2.innerHTML = ((Number(map.price) - Number(map.closePrice)) / map.closePrice * 100).toFixed(2) + '%';
		} else {
			this.b2.innerHTML = '0.00%';
			this.b2.style.color = '#ccc';
		}

		this.li1.innerHTML = '最高：<i style="color:#ccc">' + map.higestPrice + '</i>';
		this.li2.innerHTML = '今开：<i style="color:#ccc">' + map.openPrice + '</i>';
		this.li3.innerHTML = '最低：<i style="color:#ccc">' + map.lowestPrice + '</i>';

		this.li5.innerHTML = '均价：' + map.averagePrice + '元/秒';
		this.li5.style.color = '#ccc';

		this.li6_i1.innerHTML = (Number(map.price) * 3600).toFixed(2) + '元/小时';
		this.li6_i1.style.color = '#ccc';

		this.li4.innerHTML = '换手：<i style="color:#ccc">' + map.changPoint + '</i>';

		this.li6_i1.innerHTML = (Number(map.price) * 3600).toFixed(2) + '元/小时';

		this.li6.innerHTML = '最新：';
		this.li6.appendChild(this.li6_i1);


		this.li7.innerHTML = '额：<i style="color:#ccc">' + (map.changeMoney / 10000).toFixed(1) + '万元</i>';

/*		this.button0 = document.createElement('button');
		this.button0.setAttribute('type', 'button');
		this.button0.innerHTML = '+添加自选';*/


		this.button = document.createElement('button');
		this.button.setAttribute('type', 'button');
		this.button.innerHTML = '交易';

		this.button2 = document.createElement('button');
		this.button2.setAttribute('type', 'button');
		this.button2.innerHTML = '预约';

		this.li8 = document.createElement('li');
		this.li8.appendChild(this.button);

		this.ul = document.createElement('ul');
		this.ul.className = 'clear';
		this.ul.appendChild(this.li1);
		this.ul.appendChild(this.li3);
		this.ul.appendChild(this.li2);
		this.ul.appendChild(this.li4);
		this.ul.appendChild(this.li5);
		this.ul.appendChild(this.li6);
		this.ul.appendChild(this.li7);
		this.ul.appendChild(this.li8);

	} else {
		this.span.innerHTML = map.price;

		if (Number(map.price) > Number(ele)) {
			this.span.style.color = '#FF2D41';
			this.b1.style.color = '#FF2D41';
			this.li6_i1.style.color = '#FF2D41';
			// this.img.src = 'img/sjs_index/shang.png';
		} else if (Number(map.price) == Number(ele)) {
			this.span.style.color = '#ccc';
			this.b1.style.color = '#ccc';
			this.li6_i1.style.color = '#ccc';
		} else {
			this.span.style.color = '#04C192';
			this.b1.style.color = '#04c192';
			this.li6_i1.style.color = '#04c192';
			// this.img.src = 'img/sjs_index/xia.png';
		}

		if (data.investorsStatus > 0) {
			if (Number(map.price) > Number(ele)) {
				this.b2.innerHTML = '+' + ((Number(map.price) - Number(map.closePrice)) / map.closePrice * 100).toFixed(2) + '%';
			} else if (Number(map.price) == Number(ele)) {
				this.b2.style.color = '#ccc';
				this.b2.innerHTML = ((Number(map.price) - Number(map.closePrice)) / map.closePrice * 100).toFixed(2) + '%';
			} else {
				this.b2.style.color = '#04C192';
				this.b2.innerHTML = ((Number(map.price) - Number(map.closePrice)) / map.closePrice * 100).toFixed(2) + '%';
			}
		} else {
			this.b2.innerHTML = '0.00%';
		}

		if (Number(map.higestPrice) > Number(ele)) {
			this.li1.innerHTML = '最高：<i>' + map.higestPrice + '</i>';
		} else if (map.higestPrice == ele) {
			this.li1.innerHTML = '最高：<i style="color:#ccc">' + map.higestPrice + '</i>';
		} else {
			this.li1.innerHTML = '最高：<i style="color:#04C192">' + map.higestPrice + '</i>';
		}

		if (Number(map.openPrice) > Number(ele)) {
			this.li2.innerHTML = '今开：<i>' + map.openPrice + '</i>';
		} else if (map.openPrice == ele) {
			this.li2.innerHTML = '今开：<i style="color:#ccc">' + map.openPrice + '</i>';
		} else {
			this.li2.innerHTML = '今开：<i style="color:#04C192">' + map.openPrice + '</i>';
		}

		if (map.lowestPrice > ele) {
			this.li3.innerHTML = '最低：<i>' + map.lowestPrice + '</i>';
		} else if (map.lowestPrice == ele) {
			this.li3.innerHTML = '最低：<i style="color:#ccc">' + map.lowestPrice + '</i>';
		} else {
			this.li3.innerHTML = '最低：<i style="color:#04C192">' + map.lowestPrice + '</i>';
		}

		this.li5.innerHTML = '均价：' + map.averagePrice + '元/秒';
		this.li5.style.color = '#FF9500';

		this.li4.innerHTML = '换手：<i style="color:#ccc">' + map.changPoint + '</i>';

		this.li6_i1.innerHTML = (Number(map.price) * 3600).toFixed(2) + '元/小时';

		this.li6.innerHTML = '最新：';
		this.li6.appendChild(this.li6_i1);


		this.li7.innerHTML = '额：<i style="color:#ccc">' + (map.changeMoney / 10000).toFixed(1) + '万元</i>';

		this.button = document.createElement('button');
		this.button.setAttribute('type', 'button');
		this.button.className="trade";
		this.button.innerHTML = '交易';

		this.button2 = document.createElement('button');
		this.button2.setAttribute('type', 'button');
		this.button2.className="appointment";
		this.button2.innerHTML = '预约';


		//添加自选按钮
		this.button0 = document.createElement('button');
		this.button0.setAttribute('type', 'button');
		$(this.button0).addClass("addOptional");
		$(this.button0).attr("id","optional_btn");
		this.button0.innerHTML = '+添加自选';



		this.li8 = document.createElement('li');
		this.li8.appendChild(this.button0);
		this.li8.appendChild(this.button2);
		this.li8.appendChild(this.button);

		this.ul = document.createElement('ul');
		this.ul.className = 'clear';
		this.ul.appendChild(this.li1);
		this.ul.appendChild(this.li3);
		this.ul.appendChild(this.li2);
		this.ul.appendChild(this.li4);
		this.ul.appendChild(this.li5);
		this.ul.appendChild(this.li6);
		this.ul.appendChild(this.li7);
		this.ul.appendChild(this.li8);



		//添加自选的按钮操作
		check_optional(data.investorsCode,$(this.button0));
	}


	// 内容分时图
	this.canvas_l_img = document.createElement('img');
	this.canvas_l_img.className = 'pull-left';
	this.canvas_l_img.src = 'img/sjs_index/enlarge.png';

	this.canvas_span = document.createElement('span');
	this.canvas_span.className = 'pull-left active';
	this.canvas_span.innerHTML = '分时';

	this.canvas_span2 = document.createElement('span');
	this.canvas_span2.className = 'pull-left';
	this.canvas_span2.innerHTML = '日k';
	this.canvas_span2.style.marginLeft = '10px';

	this.canvas_r_img = document.createElement('img');
	this.canvas_r_img.className = 'pull-right';
	this.canvas_r_img.src = 'img/sjs_index/enlarge.png';

	this.canvas_div = document.createElement('div');

	this.canvas_num = document.createElement('div');
	this.canvas_num.className = 'right_price_num clear';
	this.canvas_num.appendChild(this.canvas_l_img);
	this.canvas_num.appendChild(this.canvas_span);
	this.canvas_num.appendChild(this.canvas_span2);
	this.canvas_num.appendChild(this.canvas_r_img);
	this.canvas_num.appendChild(this.canvas_div);

	this.canvas_data = document.createElement('div');
	this.canvas_data.className = 'top_data1_right';

	this.canvas_top = document.createElement('div');
	this.canvas_top.className = 'top_data1_left';
	this.canvas_top.appendChild(this.canvas_num);
	this.canvas_top.appendChild(this.canvas_data);

	this.canvas_data2 = document.createElement('div');
	this.canvas_data2.className = 'top_data2';

	this.canvas_top_data = document.createElement('div');
	this.canvas_top_data.className = 'top_data1 clear';
	this.canvas_top_data.appendChild(this.canvas_top);
	this.canvas_top_data.appendChild(this.canvas_data2);

	this.canvas_top_line = document.createElement('div');
	this.canvas_top_line.className = 'top_line';
	this.canvas_top_line.setAttribute('id', 'main_chart');

	this.canvas_top_line2 = document.createElement('div');
	this.canvas_top_line2.className = 'top_line';
	this.canvas_top_line2.setAttribute('id', 'main_chart2');

	this.Time1 = document.createElement('div');
	this.Time1.className = 'canvas_time';
	this.Time1.appendChild(this.canvas_top_line);
	this.Time1.appendChild(this.canvas_top_line2);

	this.Time2 = document.createElement('div');
	this.Time2.className = 'canvas_time2_k';

	this.canvas_top_price = document.createElement('div');
	this.canvas_top_price.className = 'top_price';
	this.canvas_top_price.appendChild(this.canvas_top_data);
	this.canvas_top_price.appendChild(this.Time1);
	this.canvas_top_price.appendChild(this.Time2);

	//
	this.canvas_center = document.createElement('div');
	this.canvas_center.className = 'sjs_right_left_center';
	this.canvas_center.appendChild(this.canvas_top_price);

	this.top_left = document.createElement('div');
	this.top_left.className = 'sjs_right_left_top clear';

	this.top_left.appendChild(this.personal_top);
	this.top_left.appendChild(this.ul);

	parent.append(this.top_left);
	parent.append(this.canvas_center);
	this.color = data.investorsStatus;
	this.data = data;
	this.map = map;
}
personal_information.prototype.getclick = function () {
	var _this = this;
	this.button.onclick = function () {
		window.location = 'html/sjs_transaction_buy.html?name=' + _investorsName + '&code=' + _investorscode + '&price=' + _price + '&num=' + _this.color;
	}
	this.button2.onclick = function () {
		window.location = 'html/sjs_booking_order.html?name=' + _investorsName + '&code=' + _investorscode + '&Avatar=' + _this.data.investorsAvatar + '&price=' + _this.map.price;
	}
	this.canvas_span.onclick = function () {
		_this.canvas_span.className = 'pull-left active';
		_this.canvas_span2.className = 'pull-left';

		_this.Time2.style.display = 'none';
		_this.Time1.style.display = 'block';

		init_chart(close_Price, uplowFlag, up_down_price);
	}
	this.canvas_span2.onclick = function () {
		$('.canvas_time2_k').empty();

		_this.canvas_span.className = 'pull-left';
		_this.canvas_span2.className = 'pull-left active';

		_this.Time1.style.display = 'none';
		_this.Time2.style.display = 'block';
		var canvas_k = new canvas_k_func(_this.Time2);

		init_k_func();


	}
}
//增加一个判断添加自选按钮的函数
function check_optional(code,obj){
	$.ajax({
		url: allurl1 + 'uusjs/queryIsOptional.do',
		type: 'POST',
		dataType: 'json',
		data: {
			investorsCode:code
		},
		success: function (data) {
			//console.log(data);
			if(data.STATUS=='3'){
				//用户未登录
				$(obj).html("+添加自选");
				$(obj).addClass("addOptional");
				$(obj).off("click")
				$(obj).on("click",function(){
					window.location.href="html/sjs_load.html?"+Math.random();
				})
			}else if(data.STATUS=='0'){
				var flag=data.OBJECT.result;
				if(flag=="0"){
					//已经是自选
					$(obj).html("－删除自选");
					$(obj).removeClass("addOptional");
					$(obj).addClass("deleteOptional");
					$(obj).off("click")
					$(obj).on("click",function(){
						add_delete_investor(code);
					})
				}else if(flag=="1"){
					//未添加自选
					$(obj).html("+添加自选");
					$(obj).removeClass("deleteOptional");
					$(obj).addClass("addOptional");
					$(obj).off("click")
					$(obj).on("click",function(){
						add_delete_investor(code);
					})
				}
			}
		},
		fail:function(data){
			layer.open({
				title: '网络出错了',
				content: '您的网络可能不是很好'
			});
		}
	})
}
//添加自选操作
function add_delete_investor(code){
	$.ajax({
		url: allurl1 + 'uusjs/addOptional.do',
		type: 'POST',
		dataType: 'json',
		data: {
			investorsCode:code
		},
		success: function (data) {
			console.log(data);
			if(data.STATUS=="0"){
				layer.msg(data.OBJECT.result,{time:1000});
				check_optional(code,$("#optional_btn"));
			}
		},
		fail:function(data){
			layer.open({
				title: '网络出错了',
				content: '您的网络可能不是很好'
			});
		}
	})
}
// k线图
function canvas_k_func(parent) {

	this.canvas_top_line = document.createElement('div');
	this.canvas_top_line.className = 'top_line';
	this.canvas_top_line.setAttribute('id', 'main_chart_k');

	this.canvas_top_line2 = document.createElement('div');
	this.canvas_top_line2.className = 'top_line';
	this.canvas_top_line2.setAttribute('id', 'main_chart2_k');

	parent.appendChild(this.canvas_top_line);
	parent.appendChild(this.canvas_top_line2);

}


// 个人资料 简介
var personal_flag = 0;
function personal_content(map, parent) {

	this.personal_tab_span1 = document.createElement('span');
	this.personal_tab_span1.className = 'active';
	this.personal_tab_span1.innerHTML = '简介';

	this.personal_tab_span2 = document.createElement('span');
	this.personal_tab_span2.innerHTML = '新闻';

	this.personal_tab_span3 = document.createElement('span');
	this.personal_tab_span3.innerHTML = '公告';

	this.personal_tab_span4 = document.createElement('span');
	this.personal_tab_span4.innerHTML = '评论';

	this.personal_tab = document.createElement('div');
	this.personal_tab.className = 'personal_tab';
	this.personal_tab.appendChild(this.personal_tab_span1);
	this.personal_tab.appendChild(this.personal_tab_span2);
	this.personal_tab.appendChild(this.personal_tab_span3);
	this.personal_tab.appendChild(this.personal_tab_span4);


	//tab切换
	//龙虎榜
	this.personal_div1_h1 = document.createElement('h1');
	this.personal_div1_h1.innerHTML = '龙虎榜';

	this.personal_div1_more = document.createElement('a');
	this.personal_div1_more.setAttribute('href', 'html/sjs_billboard_time.html?veryCode=' + map.investorsCode);
	this.personal_div1_more.innerHTML = '/更多';

	this.personal_div1_l = document.createElement('div');
	this.personal_div1_l.className = 'pull-left';
	this.personal_div1_l.appendChild(this.personal_div1_h1);
	this.personal_div1_l.appendChild(this.personal_div1_more);

	this.personal_div1_r = document.createElement('div');
	this.personal_div1_r.className = 'pull-right';

	for (var i = 0; i < map.investorsTop3.split(',').length; i++) {
		this.personal_div1_img = document.createElement('img');
		addAvatar(allurl2 + map.investorsTop3.split(',')[i], this.personal_div1_img);
		this.personal_div1_r.appendChild(this.personal_div1_img);
	}

	this.personal_div_time = document.createElement('div');
	this.personal_div_time.className = 'clear personal_div_time';
	this.personal_div_time.appendChild(this.personal_div1_l);
	this.personal_div_time.appendChild(this.personal_div1_r);

	//秒啊身价
	this.personal_Worth_h1 = document.createElement('h1');
	this.personal_Worth_h1.innerHTML = '秒啊身价';

	this.personal_Worth_span = document.createElement('span');
	this.personal_Worth_span.innerHTML = '身价';

	this.personal_Worth_b = document.createElement('b');
	this.personal_Worth_b.innerHTML = (map.investorsPrice / 10000).toFixed(2) + '万元';

	this.personal_Worth_p1 = document.createElement('p');
	this.personal_Worth_p1.appendChild(this.personal_Worth_span);
	this.personal_Worth_p1.appendChild(this.personal_Worth_b);

	this.personal_Worth = document.createElement('div');
	this.personal_Worth.className = 'personal_div_time';
	this.personal_Worth.appendChild(this.personal_Worth_h1);

	this.personal_Worth_p2 = document.createElement('p');
	this.personal_Worth_p2.innerHTML = '身价计算方式：<br>(男80 ,女85-现在的年龄)x365x24x3600x昨收+今年剩下的天数x24x3600x昨收';

	this.personal_Worth_p3 = document.createElement('p');
	this.personal_Worth_p3.innerHTML = '注明：<br> 以社会的平均寿命，参考发行人每一秒的价格及当前年龄计算得出，仅供参考';

	this.personal_Worth_box = document.createElement('div');
	this.personal_Worth_box.className = 'personal_Worth_box';
	this.personal_Worth_box.appendChild(this.personal_Worth);
	this.personal_Worth_box.appendChild(this.personal_Worth_p1);
	this.personal_Worth_box.appendChild(this.personal_Worth_p2);
	this.personal_Worth_box.appendChild(this.personal_Worth_p3);


	//个人简介
	this.personal_brief_h1 = document.createElement('h1');
	this.personal_brief_h1.innerHTML = '个人简介';

	this.personal_brief = document.createElement('div');
	this.personal_brief.className = 'personal_div_time';
	this.personal_brief.appendChild(this.personal_brief_h1);

	this.introduction_p1_span = document.createElement('span');
	this.introduction_p1_span.innerHTML = '中文名';

	this.introduction_p1_b = document.createElement('b');
	this.introduction_p1_b.innerHTML = map.investorsName;

	this.introduction_p1 = document.createElement('p');
	this.introduction_p1.appendChild(this.introduction_p1_span);
	this.introduction_p1.appendChild(this.introduction_p1_b);

	this.introduction_p2_span = document.createElement('span');
	this.introduction_p2_span.innerHTML = '国籍';

	this.introduction_p2_b = document.createElement('b');
	this.introduction_p2_b.innerHTML = map.investorsNationality;

	this.introduction_p2 = document.createElement('p');
	this.introduction_p2.appendChild(this.introduction_p2_span);
	this.introduction_p2.appendChild(this.introduction_p2_b);

	this.introduction_p3_span = document.createElement('span');
	this.introduction_p3_span.innerHTML = '民族';

	this.introduction_p3_b = document.createElement('b');
	this.introduction_p3_b.innerHTML = map.investorsEthnicity;

	this.introduction_p3 = document.createElement('p');
	this.introduction_p3.appendChild(this.introduction_p3_span);
	this.introduction_p3.appendChild(this.introduction_p3_b);

	this.introduction_p4_span = document.createElement('span');
	this.introduction_p4_span.innerHTML = '出生日期';

	this.introduction_p4_b = document.createElement('b');
	this.introduction_p4_b.innerHTML = map.investorsBirthday;

	this.introduction_p4 = document.createElement('p');
	this.introduction_p4.appendChild(this.introduction_p4_span);
	this.introduction_p4.appendChild(this.introduction_p4_b);

	this.introduction_p5_span = document.createElement('span');
	this.introduction_p5_span.innerHTML = '职业';

	this.introduction_p5_b = document.createElement('b');
	this.introduction_p5_b.innerHTML = map.investorsWork;

	this.introduction_p5 = document.createElement('p');
	this.introduction_p5.appendChild(this.introduction_p5_span);
	this.introduction_p5.appendChild(this.introduction_p5_b);

	this.introduction_p6_span = document.createElement('span');
	this.introduction_p6_span.innerHTML = '毕业院校';

	this.introduction_p6_b = document.createElement('b');
	this.introduction_p6_b.innerHTML = map.investorsSchool;

	this.introduction_p6 = document.createElement('p');
	this.introduction_p6.appendChild(this.introduction_p6_span);
	this.introduction_p6.appendChild(this.introduction_p6_b);

	this.personal_brief_box = document.createElement('div');
	this.personal_brief_box.className = 'personal_brief_box';
	this.personal_brief_box.appendChild(this.personal_brief);
	this.personal_brief_box.appendChild(this.introduction_p1);
	this.personal_brief_box.appendChild(this.introduction_p2);
	this.personal_brief_box.appendChild(this.introduction_p3);
	this.personal_brief_box.appendChild(this.introduction_p4);
	this.personal_brief_box.appendChild(this.introduction_p5);
	this.personal_brief_box.appendChild(this.introduction_p6);

	//主要经历
	this._the_about_h1 = document.createElement('h1');
	this._the_about_h1.innerHTML = '主要经历';

	this.personal_about = document.createElement('div');
	this.personal_about.className = 'personal_div_time';
	this.personal_about.appendChild(this._the_about_h1);

	this._about = document.createElement('div');
	this._about.className = 'about';
	this._about.appendChild(this.personal_about);

	for (var i = 0; i < map.investorsMainAchievements.split("\n").length; i++) {
		this._the_about_p1 = document.createElement('p');
		this._the_about_p1.innerHTML = map.investorsMainAchievements.split("\n")[i];
		this._about.appendChild(this._the_about_p1);
	}

	this.personal_about_box = document.createElement('div');
	this.personal_about_box.className = 'personal_about_box';
	this.personal_about_box.appendChild(this.personal_about);
	this.personal_about_box.appendChild(this._about);


	// 主要成就
	this.the_about_h1 = document.createElement('h1');
	this.the_about_h1.innerHTML = '主要成就';

	this.personal_about_achievement = document.createElement('div');
	this.personal_about_achievement.className = 'personal_div_time';
	this.personal_about_achievement.appendChild(this.the_about_h1);

	this.about = document.createElement('div');
	this.about.className = 'about';
	this.about.appendChild(this.personal_about_achievement);

	for (var i = 0; i < map.investorsDescription.split("\n").length; i++) {
		this.the_about_p1 = document.createElement('p');
		this.the_about_p1.innerHTML = map.investorsDescription.split("\n")[i];
		this.about.appendChild(this.the_about_p1);
	}

	this.personal_about_box2 = document.createElement('div');
	this.personal_about_box2.className = 'personal_about_box';
	this.personal_about_box2.appendChild(this.personal_about_achievement);
	this.personal_about_box2.appendChild(this.about);


	// 时间使用范围
	this.the_about_h2 = document.createElement('h1');
	this.the_about_h2.innerHTML = '时间使用范围';

	this.personal_about2 = document.createElement('div');
	this.personal_about2.className = 'personal_div_time';
	this.personal_about2.appendChild(this.the_about_h2);

	this.about2 = document.createElement('div');
	this.about2.className = 'about';


	for (var i = 0; i < map.investorsTimeScope.split("\n").length; i++) {
		this.the_about_p3 = document.createElement('p');
		this.the_about_p3.innerHTML = map.investorsTimeScope.split("\n")[i];
		this.about2.appendChild(this.the_about_p3);
	}

	this.personal_about_time = document.createElement('div');
	this.personal_about_time.className = 'personal_about_box';
	this.personal_about_time.appendChild(this.personal_about2);
	this.personal_about_time.appendChild(this.about2);


	this.personal_div1 = document.createElement('div');
	this.personal_div1.className = 'personal_div personal_div1';
	this.personal_div1.appendChild(this.personal_div_time);
	this.personal_div1.appendChild(this.personal_Worth_box);
	this.personal_div1.appendChild(this.personal_brief_box);
	this.personal_div1.appendChild(this.personal_about_box);
	this.personal_div1.appendChild(this.personal_about_box2);
	this.personal_div1.appendChild(this.personal_about_time);


	//图片
	if (map.investorsPcImg == '') {

	} else {
		this.seamless_inner = document.createElement('div');
		this.seamless_inner.className = 'seamless_inner';

		for (var k = 0; k < map.investorsPcImg.split(',').length; k++) {
			this.rolling_img = document.createElement('img');
			this.rolling_img.className = 'rolling_img' + (k + 1);

			this.rolling_img.src = allurl2 + map.investorsPcImg.split(',')[k];

			this.seamless_inner.appendChild(this.rolling_img);
		}

		this.seamless_rolling = document.createElement('div');
		this.seamless_rolling.className = 'seamless_rolling';
		this.seamless_rolling.appendChild(this.seamless_inner);

		this.personal_div1.appendChild(this.seamless_rolling);

	}

	//
	//


	this.personal_div2 = document.createElement('div');
	this.personal_div2.className = 'personal_div personal_div2';

	this.personal_div3 = document.createElement('div');
	this.personal_div3.className = 'personal_div personal_div3';

	this.personal_div4 = document.createElement('div');
	this.personal_div4.className = 'personal_div personal_div4';

	this.personal_foot = document.createElement('div');
	this.personal_foot.className = 'sjs_content_foot';
	// this.personal_foot.appendChild(this.personal_tab);
	this.personal_foot.appendChild(this.personal_div1);
	this.personal_foot.appendChild(this.personal_div2);
	this.personal_foot.appendChild(this.personal_div3);
	this.personal_foot.appendChild(this.personal_div4);


	parent.append(this.personal_foot);

	this.map = map;


}
personal_content.prototype.getclick = function () {
	var _this = this;
	this.personal_tab_span1.onclick = function () {
		$('.personal_div').hide().eq(0).show();
	}
	this.personal_tab_span2.onclick = function () {
		$('.personal_div').hide().eq(1).show();
		$('.personal_tab span').removeClass('active');
		_this.personal_tab_span2.className = 'active';

		journalismFunc('news', _this.map.investorsCode, '1', '500', _this.personal_div2);
	}
	this.personal_tab_span3.onclick = function () {
		console.log(333)
	}
	this.personal_tab_span4.onclick = function () {
		console.log(444)
	}
}

//新闻公告
function journalismFunc(type, investorsId, currentPage, pageSize, parent) {
	var tags_url = allurl1 + 'uusjs/queryInvestorsMsg.do';
	ajax(get_journalismFunc_url(tags_url, type, investorsId, currentPage, pageSize), function (data) {
		if (data.STATUS == '0') {
			if (data.LIST.length > 0) {
				for (var i = 0; i < data.LIST.length; i++) {
					var journalism = new journalism_func(data.LIST[i], parent);
					journalism.getclick();
				}
			} else {

			}
		} else if (data.STATUS == '3') {
			window.location = 'html/sjs_load.html';
		}
	});
}

//get url
function get_journalismFunc_url(originurl, n1, n2, n3, n4, n5, m1, m2, m3, m4, m5) {
	var index_string = getresult(originurl, 'queryInvestorsMsg', n1, n2, n3, n4, '', 'type', 'investorsId', 'currentPage', 'pageSize', '');
	return index_string;
}
//创建新闻/公告
function journalism_func(map, parent) {

	this.journalism_a = document.createElement('a');
	this.journalism_a.setAttribute('href', 'http://' + map.url);
	this.journalism_a.innerHTML = map.title;

	this.journalism_p = document.createElement('p');
	this.journalism_p.className = 'personal_div_time';
	this.journalism_p.appendChild(this.journalism_a);


	parent.appendChild(this.journalism_p);
}
journalism_func.prototype.getclick = function () {
	var _this = this;

}

// 买盘卖盘
function buy_disc(map, parent, page, ele, flag) {
	this.disc_b = document.createElement('b');
	this.disc_span = document.createElement('span');
	this.disc_i = document.createElement('i');
	this.disc_li = document.createElement('li');

	this.disc_b.innerHTML = page + '';
	this.disc_li.appendChild(this.disc_b);


	if (map != undefined) {
		if (flag == 0) {
			this.disc_i.style.color = '#04c192';
		} else if (flag == 1) {
			this.disc_i.style.color = '#FF2D41';
		}

		this.disc_span.innerHTML = map.price;
		this.disc_i.innerHTML = map.num;
		if (Number(map.price) > Number(ele)) {
			this.disc_span.style.color = '#FF2D41';
		} else if (Number(map.price) == Number(ele)) {
			this.disc_span.style.color = '#fff';
		} else {
			this.disc_span.style.color = '#04c192';
		}

		this.disc_li.appendChild(this.disc_span);
		this.disc_li.appendChild(this.disc_i);
	} else {
		this.disc_span.innerHTML = '…';

		this.disc_i.innerHTML = '…';

		this.disc_li.appendChild(this.disc_span);
		this.disc_li.appendChild(this.disc_i);
	}


	parent.append(this.disc_li);
}


// 时间
function buy_sell_disc(map, parent, close) {
	this.buy_sell_td1 = document.createElement('td');
	this.buy_sell_td1.innerText = map.time;

	this.buy_sell_td2 = document.createElement('td');
	this.buy_sell_td2.innerText = map.price;

	this.buy_sell_td3 = document.createElement('td');
	this.buy_sell_td3.innerText = map.num;

	if (Number(map.price) > Number(close)) {
		this.buy_sell_td2.className = 'color_red';
	} else if (Number(map.price) == Number(close)) {
		this.buy_sell_td2.style.color = '#fff';
	} else {
		this.buy_sell_td2.className = 'color_green';
	}

	if (map.type == 'S') {
		this.buy_sell_td3.className = 'color_green';
	} else if (map.type == 'B') {
		this.buy_sell_td3.className = 'color_red';
	} else {
		this.buy_sell_td3.style.color = '#fff';
	}

	this.buy_sell_tr = document.createElement('tr');
	this.buy_sell_tr.appendChild(this.buy_sell_td1);
	this.buy_sell_tr.appendChild(this.buy_sell_td2);
	this.buy_sell_tr.appendChild(this.buy_sell_td3);

	$('#buy_sell_time').scrollTop($('#buy_sell_time')[0].scrollHeight); //当页面加载时滚动条滚到最下面

	$(parent).append(this.buy_sell_tr);

}


// 买盘卖盘  默认
function buy_disc_default(parent, page) {
	this.disc_b = document.createElement('b');
	this.disc_b.innerHTML = page;

	this.disc_span = document.createElement('span');
	this.disc_span.innerHTML = '…';

	this.disc_i = document.createElement('i');
	this.disc_i.innerHTML = '…';

	this.disc_li = document.createElement('li');
	this.disc_li.appendChild(this.disc_b);
	this.disc_li.appendChild(this.disc_span);
	this.disc_li.appendChild(this.disc_i);


	parent.append(this.disc_li);
}


var mint_time = ['9:30', '9:31', '9:32', '9:33', '9:34', '9:35', '9:36', '9:37', '9:38', '9:39', '9:40', '9:41', '9:42', '9:43', '9:44', '9:45', '9:46', '9:47', '9:48', '9:49', '9:50', '9:51', '9:52', '9:53', '9:54', '9:55', '9:56', '9:57', '9:58', '9:59', '10:00', '10:01', '10:02', '10:03', '10:04', '10:05', '10:06', '10:07', '10:08', '10:09', '10:10', '10:11', '10:12', '10:13', '10:14', '10:15', '10:16', '10:17', '10:18', '10:19', '10:20', '10:21', '10:22', '10:23', '10:24', '10:25', '10:26', '10:27', '10:28', '10:29', '10:30', '10:31', '10:32', '10:33', '10:34', '10:35', '10:36', '10:37', '10:38', '10:39', '10:40', '10:41', '10:42', '10:43', '10:44', '10:45', '10:46', '10:47', '10:48', '10:49', '10:50', '10:51', "10:52", "10:53", "10:54", "10:55", "10:56", "10:57", "10:58", "10:59", '11:00', '11:01', '11:02', '11:03', '11:04', '11:05', '11:06', '11:07', '11:08', '11:09', '11:11', '11:11', '11:12', '11:13', '11:14', '11:15', '11:16', '11:17', '11:18', '11:19', '11:20', '11:21', '11:22', '11:23', '11:24', '11:25', '11:26', '11:27', '11:28', '11:29', '11:30/13:00', '13:01', '13:02', '13:03', '13:04', '13:05', '13:06', '13:07', '13:08', '13:09', '13:10', '13:11', '13:12', '13:13', '13:14', '13:15', '13:16', '13:17', '13:18', '13:19', '13:20', '13:21', '13:22', '13:23', '13:24', '13:25', '13:26', '13:27', '13:28', '13:29', '13:30', '13:31', '13:32', '13:33', '13:34', '13:35', '13:36', '13:37', '13:38', '13:39', '13:40', '13:41', '13:42', '13:43', '13:44', '13:45', '13:46', '13:47', '13:48', '13:49', '13:50', '13:51', "13:52", "13:53", "13:54", "13:55", "13:56", "13:57", "13:58", "13:59", '14:00', '14:01', '14:02', '14:03', '14:04', '14:05', '14:06', '14:07', '14:08', '14:09', '14:14', '14:11', '14:12', '14:14', '14:14', '14:15', '14:16', '14:17', '14:18', '14:19', '14:20', '14:21', '14:22', '14:23', '14:24', '14:25', '14:26', '14:27', '14:28', '14:29', '14:30', '14:31', '14:32', '14:33', '14:34', '14:35', '14:36', '14:37', '14:38', '14:39', '14:40', '14:41', '14:42', '14:43', '14:44', '14:45', '14:46', '14:47', '14:48', '14:49', '14:50', '14:51', "14:52", "14:53", "14:54", "14:55", "14:56", "14:57", "14:58", "14:59", '15:00/18:00', '18:01', '18:02', '18:03', '18:04', '18:05', '18:06', '18:07', '18:08', '18:09', '18:18', '18:11', '18:12', '18:18', '18:18', '18:15', '18:16', '18:17', '18:18', '18:19', '18:20', '18:21', '18:22', '18:23', '18:24', '18:25', '18:26', '18:27', '18:28', '18:29', '18:30', '18:31', '18:32', '18:33', '18:34', '18:35', '18:36', '18:37', '18:38', '18:39', '18:40', '18:41', '18:42', '18:43', '18:44', '18:45', '18:46', '18:47', '18:48', '18:49', '18:50', '18:51', "18:52", "18:53", "18:54", "18:55", "18:56", "18:57", "18:58", "18:59", '19:00', '19:01', '19:02', '19:03', '19:04', '19:05', '19:06', '19:07', '19:08', '19:09', '19:19', '19:11', '19:12', '19:19', '19:19', '19:15', '19:16', '19:17', '19:19', '19:19', '19:20', '19:21', '19:22', '19:23', '19:24', '19:25', '19:26', '19:27', '19:28', '19:29', '19:30', '19:31', '19:32', '19:33', '19:34', '19:35', '19:36', '19:37', '19:38', '19:39', '19:40', '19:41', '19:42', '19:43', '19:44', '19:45', '19:46', '19:47', '19:48', '19:49', '19:50', '19:51', "19:52", "19:53", "19:54", "19:55", "19:56", "19:57", "19:58", "19:59", '20:00', '20:01', '20:02', '20:03', '20:04', '20:05', '20:06', '20:07', '20:08', '20:09', '20:20', '20:11', '20:12', '20:20', '20:20', '20:15', '20:16', '20:17', '20:20', '20:20', '20:20', '20:21', '20:22', '20:23', '20:24', '20:25', '20:26', '20:27', '20:28', '20:29', '20:30', '20:31', '20:32', '20:33', '20:34', '20:35', '20:36', '20:37', '20:38', '20:39', '20:40', '20:41', '20:42', '20:43', '20:44', '20:45', '20:46', '20:47', '20:48', '20:49', '20:50', '20:51', "20:52", "20:53", "20:54", "20:55", "20:56", "20:57", "20:58", "20:59", '21:00'];

function init_chart(close_Price, uplowFlag, price) {
	var max_rise=Math.max.apply(null,up_down_Array);
	var max_fall=Math.min.apply(null,up_down_Array);
	var get_max_rise_fall=Math.max(Math.abs(max_rise),Math.abs(max_fall));
	
	var dates = tArray.map(function (item) {
		return item[0];
	});


	var data = tArray.map(function (item) {
		return item[1];
	});

	var adata = aArray.map(function (item) {
		return item[1];
	});

	var _amount = amount.map(function (item) {
		return item[0];
	});

	var _amount_color = amount.map(function (item) {
		return item[1];
	});

//计算幅度值
	var max_rise_use=get_max_rise_fall>=10?get_max_rise_fall:10;

	var a_max=uplowFlag;
	if(uplowFlag==10){
		a_max=uplowFlag;
		if(max_rise_use >= uplowFlag){
			a_max = max_rise_use;
		}
	}else if(uplowFlag==100){
		a_max=uplowFlag;
		if(max_rise_use >= uplowFlag){
			a_max = max_rise_use;
		}
	}else{
		if(max_rise_use > uplowFlag){
			a_max = max_rise_use;
		}else{
			a_max=uplowFlag;
		}	
	}

	console.log(a_max);

	var close_Price_value = parseFloat(close_Price);
	var _maxlength = (close_Price_value * (100+a_max)/100);
	var _minlength = (close_Price_value * (100-a_max)/100);




	console.log(_maxlength);
	console.log(a_max);

	option = {
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			x: 80,
			y: 10,
			x2: 80,
			y2: 5
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: mint_time,
			axisLabel: {
				show: true,
				interval: 59,
				textStyle: {
					color: '#090D16',
					baseline: 'middle'
				}
			},
			axisTick: {
				show: false,
				inside: true,
				alignWithLabel: true,
				lineStyle: {
					color: '#000'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					type: 'dashed',
					color: '#ff9500'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			}
		}],
		yAxis: [{
			type: 'value',
			splitNumber: 4,
			max: _maxlength,
			min: _minlength,
			axisLabel: {
				formatter: function (value, Template) {
					return value.toFixed(2);
				},
				textStyle: {
					color: function (value) {
						var color = "#fff";
						if (value.toFixed(2) > close_Price_value) {
							color = "#FF2D41";
						} else if (value.toFixed(2) == close_Price_value) {
							color = "#fff";
						} else {
							color = "#04C192";
						}
						return color;
					}

				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			}

		}, {
			type: 'value',
			splitNumber: 4,
			max: a_max,
			min: -(a_max),
			axisLabel: {
				formatter: function (value) {
					return value.toFixed(2) + '%';
				},
				textStyle: {
					color: function (value) {
						var color = "white";
						if (value.toFixed(2) > 0) {
							color = "#FF2D41";
						} else if (value == 0) {
							color = "white";
						} else {
							color = "#04C192";
						}
						return color;
					}
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			}
		}],
		series: [{
			name: '价格',
			type: 'line',
			smooth: true,
			data: data,
			lineStyle: {
				normal: {
					color: '#04C192'
				},
			},
			itemStyle: {
				normal: {
					color: '#fff'
				}
			},
			symbol: 'none'
		}, {
			name: '涨跌幅',
			type: 'scatter',
			data: adata,
			yAxisIndex: 1,
			lineStyle: {
				normal: {
					color: '#04C192'
				}
			},
			itemStyle: {
				normal: {
					color: '#04C192'
				}
			},
			symbol: 'none'
		}]
	};

	// 为echarts对象加载数据
	var myChart = echarts.init(document.getElementById('main_chart'));
	myChart.setOption(option);


	option2 = {
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			x: 80,
			y: 10,
			x2: 80,
			y2: 30
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: mint_time,
			axisLabel: {
				show: true,
				interval: 59,
				margin: 15,
				textStyle: {
					color: '#fff',
					baseline: 'middle'
				}
			},
			axisTick: {
				show: true,
				inside: false,
				alignWithLabel: true,
				lineStyle: {
					color: '#000'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			}
		}],
		yAxis: [{
			type: 'value',
			splitNumber: 2,
			axisLabel: {
				formatter: function (value) {
					return parseInt(value);
				},
				textStyle: {
					color: '#CCCCCC'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},

		}, {
			type: 'value',
			splitNumber: 2,
			axisLabel: {
				formatter: function (value) {
					return parseInt(value);
				},
				textStyle: {
					color: '#CCCCCC'
				}
			},
			axisTick: {
				show: true,
				inside: false,
				alignWithLabel: true,
				lineStyle: {
					color: '#000'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},
		}],
		series: [{
			name: '成交量',
			type: 'bar',
			data: _amount,
			lineStyle: {
				normal: {
					color: '#04C192'
				},
			},
			itemStyle: {
				normal: {
					color: function (params) {
						var colorList = [
							'#fff', '#FF2D41', '#04C192',
						];
						if (_amount_color[params.dataIndex] == 1) {
							return colorList[0]
						} else if (_amount_color[params.dataIndex] == 2) {
							return colorList[1]
						} else {
							return colorList[2]
						}

					},
				}
			},
		}]
	};

	// 为echarts对象加载数据
	var myChart2 = echarts.init(document.getElementById('main_chart2'));
	myChart2.setOption(option2);

	myChart.connect([myChart2]);
	myChart2.connect([myChart]);

	// 异步加载数据
	// load_data(myChart, data);


}


// k线图

//开盘  最高  最低  昨收  涨跌额  涨跌幅  成交量  成交额
// [_open_price[b], _today_collect[b], _minimum_price[b], _highest_price[b], _yesterday_collect[b], _ups_down_picture[b], _ups_down_price[b] , _volume_amount[b]
var get_time = [];

function init_k_func() {

	//成交额
	var amount_money = volume_amount.map(function (item) {
		return item[0];
	});
	// 成交额颜色
	var amount_color = volume_amount.map(function (item) {
		return item[1];
	});

	option = {
		tooltip: {
			trigger: 'axis',
			formatter: function (params) {
				var res = params[0].name;

				if (params[0].value[0]) {
					res += '<br/>  开盘 : ' + params[0].value[0];
				} else {
					res += '<br/>  开盘 : -';
				}

				if (params[0].value[3]) {
					res += '<br/>  最高 : ' + params[0].value[3];
				} else {
					res += '<br/>  最高 : -';
				}

				if (params[0].value[2]) {
					res += '<br/>  最低 : ' + params[0].value[2];
				} else {
					res += '<br/>  最低 : -';
				}

				if (params[0].value[1]) {
					res += '<br/>  今收 : ' + params[0].value[1];
				} else {
					res += '<br/>  今收 : -';
				}
				if (params[0].value[6]) {
					res += '<br/>  涨跌额 : ' + params[0].value[6];
				} else {
					res += '<br/>  涨跌额 : -';
				}

				if (params[0].value[5]) {
					res += '<br/>  涨跌幅 : ' + params[0].value[5];
				} else {
					res += '<br/>  涨跌幅 : -';
				}

				if (params[0].value[7]) {
					res += '<br/>  成交量 : ' + params[0].value[7] + '秒';
				} else {
					res += '<br/>  成交量 : -';
				}

				return res;
			},
			backgroundColor: '#262834',
			textStyle: {
				align: 'left',
				fontSize: 12,
			}

		},
		grid: {
			x: 80,
			y: 10,
			x2: 40,
			y2: 5,
			borderColor: '#22262e',
		},
		xAxis: [{
			type: 'category',
			boundaryGap: true,
			data: day_time,
			axisLabel: {
				show: true,
				interval: 29,
				margin: 15,
				textStyle: {
					color: '#fff',
					baseline: 'middle'
				}
			},
			axisTick: {
				show: true,
				inside: false,
				alignWithLabel: true,
				lineStyle: {
					color: '#000'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},
			splitLine: {
				show: false,
				lineStyle: {
					color: '#22262e'
				}
			}
		}],
		yAxis: [{
			type: 'value',
			scale: true,
			boundaryGap: [0.01, 0.01],
			splitNumber: 4,
			axisLabel: {
				show: true,
				margin: 15,
				textStyle: {
					color: '#fff',
					baseline: 'middle'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},
		}],
		series: [{
			type: 'k',
			data: k_data,
			itemStyle: {
				normal: {
					color: '#FF2D41',
					color0: '#04C192',
					lineStyle: {
						width: 2,
						color: '#FF2D41',
						color0: '#04C192',
					}
				}
			}
		}]
	};


	var myChart = echarts.init(document.getElementById('main_chart_k'));
	myChart.setOption(option);


	option2 = {
		tooltip: {
			trigger: 'axis',
			backgroundColor: '#262834',
			textStyle: {
				align: 'left',
				fontSize: 12,
			}
		},
		grid: {
			x: 80,
			y: 10,
			x2: 40,
			y2: 30,
			borderColor: '#22262e',
		},
		xAxis: [{
			type: 'category',
			boundaryGap: true,
			data: day_time,
			axisLabel: {
				show: true,
				interval: function (index, data) {
					if (index >= 1) {
						var time = day_time[index - 1].substring(0, day_time[index - 1].length - 3);
						if (time != data.substring(0, data.length - 3) == true) {
							return data.substring(0, data.length - 3);
						} else {

						}
					} else {
						return data.substring(0, data.length - 3);
					}

				},
				margin: 15,
				formatter: function (value) {
					return value.substring(0, value.length - 3);
				},
				textStyle: {
					color: '#fff',
					baseline: 'middle'
				}
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},
			splitLine: {
				show: false,
				lineStyle: {
					color: '#22262e'
				}
			}
		}],
		yAxis: [{
			type: 'value',
			splitNumber: 1,
			axisLabel: {
				formatter: function (value) {
					return parseInt(value);
				},
				textStyle: {
					color: '#CCCCCC'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},

		}, {
			type: 'value',
			splitNumber: 2,
			axisLabel: {
				formatter: function (value) {
					return parseInt(value);
				},
				textStyle: {
					color: '#CCCCCC'
				}
			},
			axisTick: {
				show: true,
				inside: false,
				alignWithLabel: true,
				lineStyle: {
					color: '#000'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#22262e'
				}
			},
		}],
		series: [{
			name: '成交额',
			type: 'bar',
			data: amount_money,
			lineStyle: {
				normal: {
					color: '#04C192'
				},
			},
			itemStyle: {
				normal: {
					color: function (params) {
						var colorList = [
							'#fff', '#FF2D41', '#04C192',
						];
						if (amount_color[params.dataIndex] == 1) {
							return colorList[0]
						} else if (amount_color[params.dataIndex] == 2) {
							return colorList[1]
						} else {
							return colorList[2]
						}

					},
				}
			},
		}]
	};

	var myChart2 = echarts.init(document.getElementById('main_chart2_k'));
	myChart2.setOption(option2);

	myChart.connect([myChart2]);
	myChart2.connect([myChart]);
}


function getresult(url, api, f1, f2, f3, f4, f5, v1, v2, v3, v4, v5) {
	var last = 'uuk';
	f1 = '' + f1;
	f2 = '' + f2;
	f3 = '' + f3;
	f4 = '' + f4;
	f5 = '' + f5;
	var url_api = api.substring(api.length - 3);
	if (f1.length > 3) {
		f11 = f1.substring(f1.length - 3);
	} else {
		f11 = f1;
	}
	if (f2.length > 3) {
		f12 = f2.substring(f2.length - 3);
	} else {
		f12 = f2;
	}
	if (f3.length > 3) {
		f13 = f3.substring(f3.length - 3);
	} else {
		f13 = f3;
	}
	if (f4.length > 3) {
		f14 = f4.substring(f4.length - 3);
	} else {
		f14 = f4;
	}
	if (f5.length > 3) {
		f15 = f5.substring(f5.length - 3);
	} else {
		f15 = f5;
	}
	var md5_string = url_api + f11 + f12 + f13 + f14 + f15 + last;
	var lasturl = url + '?' + v1 + '=' + f1 + '&' + v2 + '=' + f2 + '&' + v3 + '=' + f3 + '&' + v4 + '=' + f4 + '&' + v5 + '=' + f5 + '&';
	lasturl = encodeURI(lasturl);
	return lasturl;
}





function index_first_query(currentPage,pageSize,timeType,sort,type){
	//timetype 是小时还是秒 0元/小时  1元/秒
	//sort 0默认(按涨跌幅倒序)，1按最新价倒序 ，2 按最新价升序 3 按涨跌幅倒序  4按涨跌幅升序
	//type 0自选  8:企业家   7:创业者     5:艺人   2:牛人

	$.ajax({
		url: allurl1 + 'uusjs/queryStockMarket.do',
		type: 'POST',
		dataType: 'json',
		data: {
			currentPage: currentPage,
			pageSize: pageSize,
			sort: sort,
			timeType:timeType,
			type:type,
		},
		success: function (data) {
			if(data.STATUS=="0"&&data.LIST.length==0){
				//默认进入的是0自选，表明是自选为空
				index_first_query('1','15','0','0','8');
			}else if(data.STATUS=="0"&&data.LIST.length>0){
				//判断是否足数，能否有滚动事件
				whichTab_activeTab(type);
				//并没有处理数据
			}else{
				layer.open({
					title:"sjs",
					content:data.MSG
				})
			}
		},
		fail:function(data){
			layer.open({
				title: '网络出错了',
				content: '您的网络可能不是很好'
			});
		}
	})
}
//判断是否足数，能否有滚动事件
var if_scroll_flag=0;
function if_scroll(length,type){
	var container=whichTab(type);
	if(length==pageSize){
		//足数，可以有滚动事件
		var page=Number($(container).attr("data-page"));
		page+=1;
		$(container).attr("data-page",page+"");
		$(container).attr("data-scrollFlag","1");
		//添加滚动事件
		$(container).off("scroll");
		$(container).on("scroll",function(){
			if(if_scroll_flag==0){
				var $this = $(this),
					viewH = $(this).height(), //可见高度
					contentH = $(this).get(0).scrollHeight, //内容高度
					scrollTop = $(this).scrollTop(); //滚动高度
				//if(contentH - viewH - scrollTop <= 100) { //到达底部100px时,加载新内容
				if (scrollTop / (contentH - viewH) >= 0.98) { //到达底部100px时,加载新内容
					//
					if_scroll_flag=1;
					var page=$(container).attr("data-page");
					var timeType=$("#time_type").attr("data-click");
					var sort=$("#filter_data").attr("data-sort");
					Product_flag=1;
					if_scroll_flag=0;
					get_new_query_product(page,pageSize,timeType,sort,type);
				}
			}else{
				console.log("阻止了访问接口")
			}
		})
	}else{
		//不足数，无需滚动事件
		$(container).attr("data-scrollFlag","0");
		$(container).off("scroll");
	}
}
//确定那个tab板块是激活的,返回激活的对象tab
function whichTab_activeTab(type){
	var obj=null;
	//type 0自选  8:企业家   7:创业者     5:艺人   2:牛人
	switch(type){
		case "0":
			$("#index_tab a:first").tab("show");
			obj=$("#optional");
			break;
		case "8":
			$("#index_tab li:eq(1) a").tab("show");
			obj=$("#investor");
			break;
		case "7":
			$("#index_tab li:eq(2) a").tab("show");
			obj=$("#entrepreneur");
			break;
		case "5":
			$("#index_tab li:eq(3) a").tab("show");
			obj=$("#onlineStar");
			break;
		case "2":
			$("#index_tab li:eq(4) a").tab("show");
			obj=$("#star");
			break;
		default:
			$("#index_tab a:first").tab("show");
			obj=$("#optional");		
	}
	return obj;
}
//确定那个tab板块是激活的,不激活对象tab
function whichTab(type){
	var obj=null;
	//type 0自选  8:企业家   7:创业者     5:艺人   2:牛人
	switch(type){
		case "0":
			obj=$("#optional");
			break;
		case "8":
			obj=$("#investor");
			break;
		case "7":
			obj=$("#entrepreneur");
			break;
		case "5":
			obj=$("#onlineStar");
			break;
		case "2":
			obj=$("#star");
			break;
		default:
			obj=$("#optional");		
	}
	return obj;
}
//数据处理函数
function data_handle(data,type){
	//判断是哪个板块
	var container=whichTab(type);
	var container_cache=document.createElement("div");
	//处理数据
	var map = data.LIST;
	if (map.length > 0) {
		//组装对象，放入容器
		for(var i=0;i<map.length;i++) {
			var create_one_route = new query_product(map[i], container_cache);
			create_one_route.getclick();
		}
		container.append(container_cache);
		//
		if (Product_flag == 0) {
			Product_flag=1;
			// 买盘卖盘 个人信息 价格
			get_buy_disc_sell(map[0].investorsCode);

			_investorsName = map[0].investorsName;
			_investorscode = map[0].investorsCode;
			_price = map[0].newOrderPrice;

			Product_flag = 0;
		}
		//第一个被选中
		$(container).find('.main_data').first().addClass('active').siblings().removeClass('active');
		//显示中间或者右边数据


	}else{
		if(type=="0"){
			//是自选，添加默认的div
			$(container).html('<div class="optional_default"><div class="no_optional_container"><img src="img/default/no_optional.png" alt=""></div><div class="text_center">尚未添加发行人</div></div>');
		}
	}

}
//新分版块后查询函数,此处不是第一次访问函数，防止出现错乱
function get_new_query_product(currentPage,pageSize,timeType,sort,type){
	//timetype 是小时还是秒 0元/小时  1元/秒
	//sort 0默认(按涨跌幅倒序)，1按最新价倒序 ，2 按最新价升序 3 按涨跌幅倒序  4按涨跌幅升序
	//type 0自选  8:企业家   7:创业者     5:艺人   2:牛人
	if_scroll_flag=1;
	$.ajax({
		url: allurl1 + 'uusjs/queryStockMarket.do',
		type: 'POST',
		dataType: 'json',
		data: {
			currentPage: currentPage,
			pageSize: pageSize,
			sort: sort,
			timeType:timeType,
			type:type,
		},
		success: function (data) {
			console.log(data);
			if(data.STATUS=="0"&&data.LIST.length>=0){
				//处理数据
				data_handle(data,type);
				//回位
				if_scroll_flag=0;
				//判断是否足数，能否有滚动事件
				if_scroll(data.LIST.length,type);
			}else{
				layer.open({
					title:"sjs",
					content:data.MSG
				})
			}
		},
		fail:function(data){
			layer.open({
				title: '网络出错了',
				content: '您的网络可能不是很好'
			});
		}
	})

}