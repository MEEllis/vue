$(function() {
//	$(window).on({
//		scroll: function() {
//			var a = $(document).scrollTop();
//			TransparencyChange(a)
//		},
//		mousemove: function(a) {
//			var b = a.pageY - $(document).scrollTop();
//			$(document).scrollTop() > len && (TransparencyChange(b), a.stopPropagation(), a.preventDefault())
//		}
//	})
});
var minHeight = 50,
	len = 100;

function TransparencyChange(a) {
	var b = $(".navbar-fixed-top");
	a <= minHeight ? b.css("opacity", 1) : a <= len + minHeight && a > minHeight ? (a = 1 - (a - minHeight) / len, b.css("opacity", a)) : b.css("opacity", 0)
};

