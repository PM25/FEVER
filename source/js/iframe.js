const invokeWordCloudLite = function(evt, title = "WordCloudLite", wordCloudString) {        // 2019-09-14: WordCloud Lite
   var url = "https://docusky.org.tw/DocuSky/docuTools/WordCloudLite/WordCloudLite.html?data=" + wordCloudString;
      var iframeWidth = 640;
      var iframeHeight = 320;
      var backgroundColor = '#FFFFFF';
      var iframeId = showUrlIframe(evt, url, title, iframeWidth, iframeHeight, backgroundColor);
      console.log(iframeId);
   }

var showUrlIframe = function(evt, url, title, width, height, backgroundColor = '#EFEFEF') {
      //alert(url);
      var timestamp = (new Date()).getTime();
      var divId = "div_" + timestamp;
      var closeContainerButId = "span_" + timestamp;
      var iframeId = "iframe_" + timestamp;
      // fa-window-close, fa-times, fa-times-circle
      // style='text-align:center; padding:2px 4px; background-color:#BFBFBF; color:black; cursor:pointer;
      var s = "<div id='" + divId + "' class='sub-window-iframe' style='display:none;width:"+width+"px;height:"+height+"px'>"
            + "<table width='100%' cellpadding='0' cellspacing='0'>"
            + "<tr class='sub-window-title-bar-blue' style='width:" + width + "px; padding-right:5px;'>"
            + "<td align='left' style='color:white; padding-left:8px'>" + title + "</td>"
            + "<td align='right' valign='top' width='30'>"
            + "<span id='" + closeContainerButId + "' class='closeIframeContainer' style='padding-right:6px; cursor:pointer;' x-containerId='" + divId + "'><i class='fa fa-window-close'></i></span>"
            + "</td>"
            + "</tr></table>"
            + "<iframe id='" + iframeId + "' src='javascript:void(0)' style='width:" + width + "px; height:" + height + "px;'>"
            + "</iframe>"
            + "</div>";
      $("#iframeArea").append(s);

      let curZindex = $("#" + divId).css("z-index");                 // a string (can be 'auto')
      $("#" + divId).css("z-index", 9);

      $("#" + divId).bind("click", function(evt) {                           // 2020-12-26
         let curZindex = $(this).css("z-index");                     // a string (can be 'auto')
         $(this).css("z-index", 9);
      });

      $("#" + closeContainerButId).click(() => $("#" + divId).remove());     // 2019-06-11
      var resizeOption = { alsoResize: "#" + iframeId,               // 2018-10-28
                           minWidth: 200,
                           minHeight: 100 };

      $("#" + divId).show()            //.fadeIn(800)
                    .position({my:"center", at: "center", of: "#input-txt", collision: "fit"})
                    .draggable()
                    .resizable(resizeOption);

      window.setTimeout(() => $("#" + iframeId).attr('src', url), 20);     // 2019-11-21: 等 250ms 再設定 src
      return iframeId;
   }
