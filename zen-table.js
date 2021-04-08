(function($) {	
	$.fn.myClick = function(options) {
		let config = $.extend({}, {
			// single || everywere
			filter_type: 'single',			
		}, options);
		
		function main(e) {
			let filter_type = e.data('filter_type');
			
			if (!filter_type) { 
				filter_type = config.filter_type 
			}
		}

		function set_table_filter(table_class) {
			if ($(table_class).length) {
			  var s = '';
			  $(table_class).find('thead th').each(function(row_index, row_el) {
			    s += '<th>'+$(row_el).text()+'</th>';
			  });

			  var n =$(".table-filters").length;
			  n += 1;

			  $(table_class).before('<table class="table-filters table-filter-'+n+'"><thead>'+s+'</thead></table>');

			  $(table_class).parent().find('.table-filter-'+n+' thead th').each(function() {
			    var title = $(this).text();
			    $(this).html( '<input type="text" placeholder="'+title+'" />' );
			  });

			  $(document).on('keyup change', '.table-filter-'+n+' thead th input', function() {
			    var arrs = [];
			    var filter_count = 0;

			    $('.table-filter-'+n+' thead tr th').each(function(index0, el0) {
			      if ($(el0).find('input').val().length) {
			        var replace = $(el0).find('input').val();
			        var replace2 = replace.replace(/[[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			        var re = new RegExp(replace2,"gi");

			        arrs.push(is_filter_return_rows(index0, re, table_class));
			        filter_count++;
			      }
			    });

			    var prev_arr = [];
			    arrs.forEach(function(item, i, arr) {
					if (i == 0){	
			        prev_arr = item;	
			      }
			      if (i > 0) {
			        var common = $.grep(prev_arr, function(element) {
			          return $.inArray(element, item) !== -1;
			        });
			        prev_arr = common;
			      }
			    });

			    $(table_class).find('tbody tr').each(function(index2, el) {
			      if (prev_arr.indexOf(index2) != -1){
			        $(el).show();
			      } else {
			        $(el).hide();
			      }
			    });

			    if (!filter_count){
			      $(table_class).find('tbody tr').show();
			    }
			  });
			}
		}	

		this.each(function() { main($(this)); });
		return this;
	};
})(jQuery);
