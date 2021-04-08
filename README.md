# zen-table
jQuery plug-in for adding Select filter widget to your caption of html table.

It's simple and easy to use.

<h2>How to use?</h2>

If you have html table with class ".example", formatted as like as test.html file:

&lt;script src="https://code.jquery.com/jquery-3.6.0.slim.min.js"&gt; &lt;/script&gt;

&lt;script src="./zen-table.js"&gt; &lt;/script&gt;

&lt;script&gt;
	$(".example").zenTable();
&lt;/script&gt;

Table must contain thead and tbody sections (tags) and tags &lt;th&gt; must exist in thead and tags &lt;td&gt; must exist in tbody.