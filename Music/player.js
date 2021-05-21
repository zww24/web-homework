var app=new Vue({
  el:"#player",
  data:{
      query:"",          //搜索框内容
      musicList:[],      //歌曲列表
      musicUrl:"",       //播放的音频网络地址
      musicCover:"",     //播放的音频封面
      hotComments:[],    //播放的音频热评
      isPlaying:false,   //歌曲播放状态
      isShow:false,      //MV播放状态
      mvUrl:""           //播放的MV
  },

  methods:{
      //歌曲搜索
      searchMusic:function(){
          var that =this;
          axios.get("https://autumnfish.cn/search?keywords="+this.query) //向接口请求歌曲信息为搜索框内容的数据
          .then(function(response){
              that.musicList=response.data.result.songs;  // 获取对应的歌曲信息
          },function(err){
           console.log(err);
          });
      },
      //歌曲播放
     playMusic:function(musicId){
         var that =this;
         //console.log(musicId);
         axios.get("https://autumnfish.cn/song/url?id="+musicId)  //向接口请求选择播放的音频网络地址
         .then(function(response){
             //console.log(response);  
            that.musicUrl=response.data.data[0].url;  // 获取对应的音频网络地址
         },function(err){
             console.log(err);
         });
         axios.get("https://autumnfish.cn/song/detail?ids="+musicId)  //向接口请求选择播放的音频封面
        .then(function(response){
          //console.log(response.data.songs[0].al.picUrl);
          that.musicCover=response.data.songs[0].al.picUrl;  // 获取对应的音频封面
        },function(err){
            console.log(err);
        }) ;
        axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)  //向接口请求选择播放的热评
        .then(function(response){
            
            that.hotComments=response.data.hotComments;  // 获取对应的音频热评
        },function(err){
            console.log(err);
            })
     } ,
     play:function(){
         //console.log("play");
         this.isPlaying=true;
     },
     pause:function(){
        
         this.isPlaying=false;
     },
     playMv:function(mvid){
         var that=this;
       axios.get("https://autumnfish.cn/mv/url?id="+mvid) //向接口请求播放的MV
       .then(function(response){
          // console.log(response.data.data.url);
          that.isShow=true;
          that.mvUrl=response.data.data.url; // 获取对应的音频MV
       },function(err){
           console.log(err);
       })
     },
     hide:function(){
         this.isShow=false;
         this.mvUrl=""
     }
  }
})