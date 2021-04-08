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

		function onlyUnique(value, index, self) {
			return self.indexOf(value) === index;
		}

		function set_table_filters(table_class) {
			if ($(table_class).length) {
				$(table_class).each(function(table_index, table_el) {
			  	$(table_el).data('zen-index', table_index);

					$(table_el).find('thead th').each(function(th_index, th_el) {
						$(th_el).html('<span>'+$(th_el).text()+'</span>');
						//$(th_el).append('<input type="text" class="zen-filter zen-filter-'+th_index+'" placeholder="'+$(th_el).text()+'" />');

						let col_values = [];
						$(table_el).find('tbody tr').each(function(tr_index, tr_el) {
							col_values.push($(tr_el).find('td').eq(th_index).text());
						});

						let unique = col_values.filter(onlyUnique);
						let options = unique.sort();

						let str = '';

						options.forEach(function(item, i, arr) {
							str += '<option>'+item+'</option>';
						});

						$(th_el).append('<select class="zen-select zen-select-'+th_index+'" data-index="'+
							th_index+'">'+str+'</select>');
					});
				});

				$(document).on('change', '.zen-select', function() {
					let matched_rows = [];
					let index = $(this).data('index');
					let selected = $(this).val();
					let escaped = selected.replace(/[^\w\s]/g, "\\$&");
					let matched = new RegExp(escaped,"gi");

					$(this).closest('table').find('tbody tr').each(function(tr_index, tr_el) {
						if ($(tr_el).find('td').eq(index).text().match(matched)) {
							matched_rows.push(tr_index);
						}
					});

					$(this).closest('table').find('tbody tr').each(function(index, el) {
			      if (matched_rows.indexOf(index) != -1){
			        $(el).show();
			      } else {
			        $(el).hide();
			      }
			    });
				});
			}
		}

		this.each(function() {
		  main($(this));
		});
		return this;
	};
})(jQuery);
