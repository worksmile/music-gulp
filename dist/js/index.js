var $ = window.Zepto; 
var root = window.player;
$scope = $(document.body);
// console.log(window);
//绑定上一首下一首
var index = 0;
var songList ;


function getDate(url){
    $.ajax({
        type:'GET',
        url:url,
        success:function(data){
            //console.log(data)
            songList = data;
            root.render(songList[index]);
            bindEvent();
        },
        error:function(){
            console.log("error");
        }
    })
}

getDate('../mock/data.json');

function bindEvent(){
    //上一首
    $scope.on('click','.prev-btn',function(){
        if(index==0){
            index = songList.length-1
        }else{
            index -- ;
        }
        root.render(songList[index]);
        
    })

    //下一首
    $scope.on('click','.next-btn',function(){
        if(index == songList.length-1){
            index = 0;
        }else{
            index ++;
        }
        root.render(songList[index]);
        
    })

    //播放
    $scope.on('click','.play-btn',function(){
        
        
        
    })

    //暂停
    //$scope.on('click','.')

    //播放列表
    $scope.on('click','.list-btn',function(){
        
    })
}