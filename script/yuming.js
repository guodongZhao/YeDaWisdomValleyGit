yuming='http://223.78.120.33:8805'
yuming2='http://zhg.tianzhuowangluo.com'
liaotianid=''
liaotiannickname=''
liaotianhead_pic=''
function dgs(){
  api.openWin({
      name: 'gongsi',
      url: './gongsi.html',
      pageParam: {
          name: 'test'
      }
  });

}
setTimeout(function(){

  api.ajax({
    url: yuming+'/learun/adms/newoa/getoalist',
        method: 'get',
        data:{values: {


 "loginMark": api.deviceId,
 "token": $api.getStorage('token'),
 pageno:1,
 pagesize:10,
 //F_CategoryId:type,
 F_TypeId:1
              }}
       }, function(ret) {

        if(ret){
        if(ret.code==200){


        }else {
          api.toast({
          msg: ret.info,
          duration: 2000,
          location: 'middle'
         });
      toast.hide()
      $api.clearStorage();
      api.closeToWin({
          name: 'root'
      });
        }


      }else {

       /* api.toast({
        msg: '网络错误',
        duration: 2000,
        location: 'middle'
    });*/
      }

       })
},2000)
function isnul(data){
  if(data){
    return data
  }else {
    return ''
  }
}
function article(str){

var nstr= str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'")

return nstr

}
function hasPermission(one_per){
  var perms = new Array();
  if(one_per){
    perms.push(one_per);
  }else{
    var prs = document.getElementsByName("p_list");
        for(var i = 0; i < prs.length; i++){
          if(prs[i].checked){
            perms.push(prs[i].value);
          }
      }
  }
    var rets = api.hasPermission({
      list:perms
    });
    if(!one_per){
      api.alert('判断结果：' + JSON.stringify(rets));
      return;
    }
    return rets;
}

function reqPermission(one_per, callback){
  var perms = new Array();
  if(one_per){
    perms.push(one_per);
  }else{
 /* var prs = document.getElementsByName("p_list_r");
        for(var i = 0; i < prs.length; i++){
          if(prs[i].checked){
            perms.push(prs[i].value);
          }
      }*/
    }
    api.requestPermission({
      list: perms,
      code: 100001
    }, function(ret, err){
      if(callback){
        callback(ret);
        return;
      }
      var str = '请求结果：\n';
      str += '请求码: ' + ret.code + '\n';
      str += "是否勾选\"不再询问\"按钮: " + (ret.never ? '是' : '否') + '\n';
      str += '请求结果: \n';
      var list = ret.list;
      for(var i in list){
        str += list[i].name + '=' + list[i].granted + '\n';
      }
      //api.alert(str);
      console.log(JSON.stringify(ret));
    });
}

function opWithPermission(perm){
  if(!confirmPer(perm)){
    return;
  }
  if('calendar' == perm){
    //操作日历
  }else if('camera' == perm){
    api.getPicture({
      sourceType: 'camera',
      mediaValue: 'pic',
      destinationType: 'url',
  }, function(ret, err) {
      if (ret) {
          api.alert(JSON.stringify(ret));
      } else {
          api.alert(JSON.stringify(err));
      }
  });
  }else if('contacts' == perm){
    api.openContacts({
      test: true
    }, function(ret, err) {
      if (ret && ret.status) {
          api.alert(JSON.stringify(ret));
      } else {
          api.alert(JSON.stringify(err));
      }
  });
  }else if('location' == perm){
    api.getLocation(function(ret, err) {
      if (ret && ret.status) {
          api.alert(JSON.stringify(ret));
      } else {
          api.alert(JSON.stringify(err));
      }
  });
  }else if('microphone' == perm){
    api.startRecord({
      path: 'fs://perm-test.amr'
  });
  }else if('phone' == perm){
    api.call({
      type: 'tel',
      number: '10086'
  });
  }else if('sensor' == perm){
    //操作身体传感器
  }else if('sms' == perm){
    api.sms({
      numbers: ['10086'],
      text: '余额',
      silent: true
  });
  }else if('storage' == perm){
    api.readFile({
      path:'fs://test.txt'
    }, function(ret, err) {
      //alert(JSON.stringify(ret))
      if (ret.status) {

          console.log('readFile: ' + ret.data);
      } else {
          api.alert(err.msg + ": \n" + api.fsDir);
      }
  });
  }
}

function confirmPer(perm){
  var has = hasPermission(perm);
//alert(JSON.stringify(has))
  if(!has || !has[0] || !has[0].granted){
  if(perm=='notification'){  api.confirm({
      title: '提醒',
      msg: '没有获得 ' + '推送' + " 权限\n是否前往设置？",
      buttons: ['去设置', '取消']
  }, function(ret, err) {
      if(1 == ret.buttonIndex){
        reqPermission(perm);
      }
  });}else {
    api.confirm({
       title: '提醒',
       msg: '没有获得 ' + perm + " 权限\n是否前往设置？",
       buttons: ['去设置', '取消']
   }, function(ret, err) {
       if(1 == ret.buttonIndex){
         reqPermission(perm);
       }
   });
  }
  //alert(1)
    return false;
  }
  return true;
}

function zhanshigeren(data){
if($api.getStorage('id')){  api.openWin({
     name: 'zhanshigeren',
     url: './zhanshigeren.html',
     pageParam: {
         id: data
     }
 });
}else {
 api.openWin({
     name: 'denglu',
     url: './denglu.html',
     pageParam: {
         name: 'test'
     }
 });
}
}
function article(str){

var nstr= str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'")

return nstr

}
nian='';
yue='';
ri='';
shi='';
fen='';
miao='';
Date.prototype.toLocaleString = function() {
if(this.getFullYear()>9){
nian=this.getFullYear()
}else {
nian='0'+this.getFullYear()
}

if(parseInt(this.getMonth())+1>9){
yue=parseInt(this.getMonth())+parseInt(1)
}else {
yue='0'+(parseInt(this.getMonth())+parseInt(1))
}


if(this.getDate()>9){
ri=this.getDate()
}else {
ri='0'+this.getDate()
}
return nian+'.'+yue+'.'+ri
}
Date.prototype.toLocaleString1 = function() {
if(this.getHours()>9){
shi=this.getHours()
}else {
shi='0'+this.getHours()
}
if(this.getMinutes()>9){
fen=this.getMinutes()
}else {
fen='0'+this.getMinutes()
}
if(this.getSeconds()>9){
miao=this.getSeconds()
}else {
miao='0'+this.getSeconds()
}
return shi+':'+fen
}
function opw(data,a){
  if(a){
    api.openWin({
        name: data,
        url: './'+data+'.html',
        pageParam: {
            name: 'test'
        }

    });
  }else {
    api.openWin({
        name: data,
        url: './'+data+'.html',
        pageParam: {
            name: 'test'
        },
        animation:{
          type:"none",                //动画类型（详见动画类型常量）
   subType:"from_right",       //动画子类型（详见动画子类型常量）
   duration:300                //动画过渡时间，默认300毫秒
        }

    });
  }


}
function opw2(data){
  api.openWin({
      name: data,
      url: './'+data,
      pageParam: {
          name: 'test'
      }

  });
}
