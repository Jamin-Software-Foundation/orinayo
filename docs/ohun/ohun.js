window.addEventListener("error", (function() {
  var e = document.getElementById("nuxt-loading");
  e && (e.className += " error")
}))
		
window.__NUXT__ = {
	config: {
	  _app: {
		basePath: "/orinayo/ohun/",
		assetsPath: "/orinayo/ohun/_nuxt/",
		cdnURL: null
	  }
	}
}