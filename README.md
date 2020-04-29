# zen-table-filtrat
Simple filters for Html tables with JS

Hi! I'm glad to introduce you my new library (or JS code if you wish to say) for JS/jQuery.

It's simple and easy to use.

<h2>Where's the love?</h2>

This code may add you an input filter to your html pages before table tag. And different tables may have separeted working filters for every table.
You may create filters to all table columns to filter through all the rows. Or you may create a single input filter to filter rows accross all the table by all the columns.
 
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

.table-all-projects, .table-complekts, .table-tasks are css classes for 3 different html table tag. You will get an input filter to every td tag of your table by th tags columns.

Table must contain thead and tbody sections (tags) and tags &lt;th&gt; must exist in thead and tags &lt;td&gt; must exist in tbody. 

.error-table is a css class for html table tag. You will get an input filter to filter across all td tags of yout table.

---
Best regards,<br>
Anton Bannikov,<br>
Russia, Ekaterinburg
