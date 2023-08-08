var MyXMLHttpRequest = {
  xmlHttp: null,
  is_xhr: true,

  createXMLHttpRequest: function () {
    if (window.ActiveXObject)
      this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    else if (window.XMLHttpRequest) this.xmlHttp = new XMLHttpRequest();
    else {
      alert(
        "XMLHttpRequest 객체를 생성하지 못했습니다!\n사이트의 기능을 사용 못할 수 있습니다."
      );
      this.is_xhr = false;
    }
  },

  startRequest: function (protocol, subdomain, domain, port) {
    this.createXMLHttpRequest();
    if (this.is_xhr) {
      this.xmlHttp.onreadystatechange = this.handleStateChange;
      var urlWithPort = protocol + subdomain + domain + ":" + port;
      this.xmlHttp.open("GET", urlWithPort, true);
      this.xmlHttp.send(null);
    } else {
      alert("XMLHttpRequest 객체를 사용할 수 없습니다!");
    }
  },

  handleStateChange: function () {
    if (MyXMLHttpRequest.xmlHttp.readyState == 4) {
      var resTextBody = document.getElementById("resText");

      var responseHeaders = MyXMLHttpRequest.xmlHttp.getAllResponseHeaders();
      var headersSection = document.getElementById("resHeaders");
      var statusSection = document.getElementById("resStatus");

      var errorSection = document.getElementById("resError");
      if (MyXMLHttpRequest.xmlHttp.status == 200) {
        resTextBody.textContent = MyXMLHttpRequest.xmlHttp.responseText;
        //console.log('서버 파일 텍스트: ' +'\n'+ MyXMLHttpRequest.xmlHttp.responseText);

        headersSection.textContent = responseHeaders;
        //console.log(responseHeaders);

        statusSection.textContent = MyXMLHttpRequest.xmlHttp.status;
        //console.log(MyXMLHttpRequest.xmlHttp.status);

        errorSection.textContent = "";
      } else {
        resTextBody.textContent = "";
        headersSection.textContent = "";
        statusSection.textContent = "";
        errorSection.textContent =
          MyXMLHttpRequest.xmlHttp.status + "연결에 실패 하였습니다.";
        //console.log(MyXMLHttpRequest.xmlHttp.status + '서버 연결에 실패하였습니다!');
      }
    }
  },
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("analysis").addEventListener("click", function () {
    var protocol = document.getElementById("protocol").value;
    var subdomain = document.getElementById("subdomain").value;
    var domain = document.getElementById("domain").value;
    var port = document.getElementById("port").value;
    MyXMLHttpRequest.startRequest(protocol, subdomain, domain, port);
  });
});
//MyXMLHttpRequest.startRequest();
