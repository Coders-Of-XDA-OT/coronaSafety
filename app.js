const data = "https://api.rootnet.in/covid19-in/stats/latest";
const lastUpdated = document.querySelector(".last__updated");

fetch(data)
  .then((response) => response.json())
  .then((data) => {
    const myData = Object.values(data.data.summary);
    const refreshed = data.lastOriginUpdate;
    const refreshedDate = new Date(refreshed);
    lastUpdated.textContent = refreshedDate;
    console.log(myData); // For Debugging
    document.querySelector(".stat__item.confirmed .number").textContent =
      myData[0];
    document.querySelector(".stat__item.active .number").textContent = `${
      myData[0] - myData[3]
    }`;
    document.querySelector(".stat__item.recovered .number").textContent =
      myData[3];
    document.querySelector(".stat__item.deceased .number").textContent =
      myData[4];
  });

// For Menu

window.selectnav = (function () {
  "use strict";
  var e = function (e, t) {
    function c(e) {
      var t;
      if (!e) e = window.event;
      if (e.target) t = e.target;
      else if (e.srcElement) t = e.srcElement;
      if (t.nodeType === 3) t = t.parentNode;
      if (t.value) window.location.href = t.value;
    }
    function h(e) {
      var t = e.nodeName.toLowerCase();
      return t === "ul" || t === "ol";
    }
    function p(e) {
      for (var t = 1; document.getElementById("selectnav" + t); t++);
      return e ? "selectnav" + t : "selectnav" + (t - 1);
    }
    function d(e) {
      a++;
      var t = e.children.length,
        n = "",
        l = "",
        c = a - 1;
      if (!t) {
        return;
      }
      if (c) {
        while (c--) {
          l += o;
        }
        l += " ";
      }
      for (var v = 0; v < t; v++) {
        var m = e.children[v].children[0];
        if (typeof m !== "undefined") {
          var g = m.innerText || m.textContent;
          var y = "";
          if (r) {
            y =
              m.className.search(r) !== -1 ||
              m.parentNode.className.search(r) !== -1
                ? f
                : "";
          }
          if (i && !y) {
            y = m.href === document.URL ? f : "";
          }
          n +=
            '<option value="' + m.href + '" ' + y + ">" + l + g + "</option>";
          if (s) {
            var b = e.children[v].children[1];
            if (b && h(b)) {
              n += d(b);
            }
          }
        }
      }
      if (a === 1 && u) {
        n = '<option value="">' + u + "</option>" + n;
      }
      if (a === 1) {
        n = '<select class="selectnav" id="' + p(true) + '">' + n + "</select>";
      }
      a--;
      return n;
    }
    e = document.getElementById(e);
    if (!e) {
      return;
    }
    if (!h(e)) {
      return;
    }
    if (!("insertAdjacentHTML" in window.document.documentElement)) {
      return;
    }
    document.documentElement.className += " js";
    var n = t || {},
      r = n.activeclass || "active",
      i = typeof n.autoselect === "boolean" ? n.autoselect : true,
      s = typeof n.nested === "boolean" ? n.nested : true,
      o = n.indent || "→",
      u = n.label || "Menu",
      a = 0,
      f = " selected ";
    e.insertAdjacentHTML("afterend", d(e));
    var l = document.getElementById(p());
    if (l.addEventListener) {
      l.addEventListener("change", c);
    }
    if (l.attachEvent) {
      l.attachEvent("onchange", c);
    }
    return l;
  };
  return function (t, n) {
    e(t, n);
  };
})();

// Nav Init
selectnav("nav");
