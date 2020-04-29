# zen-table-filtrat
Simple filters for Html tables with JS

Hi! I'm glad to introduce you my new library (or JS code if you wish to say) for JS/jQuery.

It's simple and easy to use.

<h2>How to use?</h2>

Add jQuery library to your html page, for example:

&lt;script src="https://code.jquery.com/jquery-1.12.4.min.js"&gt; &lt;/script&gt;

Now clone this project or download zip-archive and extract to folder with your html page code.
Add zen-table-filtrat.js to your html page, for example:

&lt;script src="./zen-table-filtrat.js"&gt; &lt;/script&gt;

Modify javascript code of zen-table-filtrat.js such way:

<pre>set_table_filter(".table-all-projects");</pre>
<pre>set_table_filter(".table-complekts");</pre>
<pre>set_table_filter(".table-tasks");</pre>
<pre>set_single_table_filter(".error-table");</pre>

.table-all-projects, .table-complekts, .table-tasks are css classes for 3 different html table tag. You will get a input filter to every th tag of yout table.

Table must contain thead and tbody sections (tags) and tags &lt;th&gt; must exist in thead and tags &lt;td&rt; must exist in tbody. 

.error-table is a css class for html table tag. You will get a input filter to filter across all th tags of yout table.

---
Best regards,<br>
Anton Bannikov,<br>
Russia, Ekaterinburg
