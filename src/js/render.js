//实现页面渲染
//为防止全局污染
(function($,root){
    var $scope = $(document.body)
    function renderInfo(info){
        //console.log(info);
        var html = `<div class="song-name">${info.song}</div>
        <div class="singer-name">${info.singer}</div>
        <div class="album-name">${info.album}</div>`;
        //$(".song-info").append(html);
        $scope.find('.song-info').html(html);
    }

    function renderImage(src){
        //console.log(src)
        var img = new Image();
        img.src = src;
        img.onload = function(){
            root.blurImg(img,$scope);
            $scope.find('.song-img img').attr("src",src);
            
        }
        
    }

    function renderIsLike(isLike){
        if(isLike){
            $scope.find(".like-btn").addClass("liking");
        }else{
            $scope.find(".like-btn").removeClass("liking");
        }
    }

    root.render = function render(info){
        renderInfo(info);
        renderImage(info.image);
        renderIsLike(info.isLike);
    }

}(window.Zepto,window.player||(window.player = {})))//通过window.player暴露函数