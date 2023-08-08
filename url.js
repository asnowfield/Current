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
      var urlWithPort = protocol +"://"+ subdomain +"."+ domain + ":" + port;
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

var protocol = document.getElementById("protocol");
var subdomain = document.getElementById("subdomain");
var domain = document.getElementById("domain");
var port = document.getElementById("port");

var protocolRegex = /^(ftp|http|https)$/;
var subdomainRegex = /^[a-zA-Z0-9\-]+$/;
var domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
var portRegex = /^\d+$/;

protocol.addEventListener("blur", function () {
  var protocolValue = protocol.value;
  if (protocolRegex.test(protocolValue)) {
    protocol.classList.remove('invalid');
  } else {
    protocol.classList.add('invalid');

  }
});

subdomain.addEventListener("blur", function () {
  var subdomainValue = subdomain.value;
  if (subdomainRegex.test(subdomainValue)) {
    subdomain.classList.remove('invalid');
  } else {
    subdomain.classList.add('invalid');

  }
});

domain.addEventListener("blur", function () {
  var domainValue = domain.value;
  if (domainRegex.test(domainValue)) {
    domain.classList.remove('invalid');
  } else {
    domain.classList.add('invalid');
  }
});

port.addEventListener("blur", function () {
  var portValue = port.value;
  if (portRegex.test(portValue)) {
    port.classList.remove('invalid');
  } else {
    port.classList.add('invalid');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("analysis").addEventListener("click", function () {
    var protocolValue = protocol.value;
    var subdomainValue = subdomain.value;
    var domainValue = domain.value;
    var portValue = port.value;
    MyXMLHttpRequest.startRequest(
      protocolValue,
      subdomainValue,
      domainValue,
      portValue
    );
  });
});
//MyXMLHttpRequest.startRequest();
