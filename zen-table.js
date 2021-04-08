(function($) {
	$.fn.zenTable = function(options) {
		let config = $.extend({}, {
			// single || everywere
			filter_type: 'single',
		}, options);

		function main(e) {
			let filter_type = e.data('filter_type');

			if (!filter_type) {
				filter_type = config.filter_type
			}

			set_table_filters('.' + e.prop('className'));
		}

		function set_table_filters(table_class) {
			var n = $(table_class).length;

			if (n) {
				$(table_class).each(function(table_index, table_el) {
			  	$(table_el).data('zen-index', table_index);
			  });

			  $(table_class).find('thead th').each(function(row_index, row_el) {
			  	$(row_el).html('<span>'+$(row_el).text()+'</span>');
					$(row_el).append('<input type="text" class="zen-filter zen-filter-'+row_index+'" placeholder="'+$(row_el).text()+'" />');
			  });

			  $(document).on('keyup change', table_class+' thead th', function() {
			    var row_indexes = [];
			    var filter_count = 0;

			    $(this).each(function(index0, el0) {
			      if ($(el0).find('input').val().length) {
			        var replace = $(el0).find('input').val();
			        var replace2 = replace.replace(/[[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			        var re = new RegExp(replace2,"gi");

			        row_indexes.push(matched_row_indexes(index0, re, table_class));
			        filter_count++;
			      }
			    });

			    /*var prev_arr = [];
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
			    });*/

			    $(table_class).find('tbody tr').each(function(index2, el) {
			      /*if (prev_arr.indexOf(index2) != -1){
			        $(el).show();
			      } else {
			        $(el).hide();
			      }*/
			    });

			    if (!filter_count){
			      $(table_class).find('tbody tr').show();
			    }
			  });
			}
		}

	  function matched_row_indexes(index, regexp, table_class) {
	    var arr = [];
	    $(table_class).find('tbody tr').each(function(index2, el) {
	      if ($(el).find('td').eq(index).text().match(regexp)) {
	        arr.push(index2);
	      }
	    });
	    return arr;
	  }

		this.each(function() {
		  main($(this));
		});
		return this;
	};
})(jQuery);
