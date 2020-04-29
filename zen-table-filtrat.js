/**
 * Author: Anton Bannikov, April 2020
 * Version: 1.0
 * License: GPL 3.0
 */
jQuery(function($) {
  $("form").keydown(function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

  /**
   * Set your params for tables and their classes below!
   */
  // Examples of setting filters for <table> html tag with several rows of some <thead> -> <th> and <tbody> -> <td> columns
  // Setting an input filter to every column of table. There are several tables with different classes
  set_table_filter(".table-all-projects");
  set_table_filter(".table-complekts");
  set_table_filter(".table-tasks");
  // Setting a single filter input to filter data across all columns of a table having a class
  set_single_table_filter(".error-table");

  /**
   * Warning! Don't touch below!
   */
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

  function set_single_table_filter(table_class, filter_input_class){
    var filter_input_name = 'zen-table-filtrat-single-filter';
    var filter_input_class = '.'+filter_input_name;
    var n = $(filter_input_class).length;
    n += 1;

    if ($(table_class).length) {
      $(table_class).find('tbody tr').each(function(indx, elem){
        $(elem).find('td').eq(1).html('<a href="/project-detail/'+$(elem).find('td').eq(0).text()+'" target="_blank">'+$(elem).find('td').eq(1).text()+'</a>');
      });

      $(table_class).before( '<div style="float: right;">'+
      '<input type="text" placeholder="Searching filter..." class="'+filter_input_name+' zen-filter-'+n+'" /></div>' );

      $(document).on('keyup change', '.zen-filter-'+n, function() {
        var arrs = [];
        var filter_count = 0;

        $(table_class).find('thead tr th').each(function(index0, el0) {
          if ($(filter_input_class).val().length) {
            var replace = $(filter_input_class).val();
            var replace2 = replace.replace(/[[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            var re = new RegExp(replace2,"gi");

            arrs.push(is_filter_return_all_rows(index0, re, table_class));
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

  function is_filter_return_rows(index, regexp, table_class) {
    var arr = [];
    $(table_class).find('tbody tr').each(function(index2, el) {
      if ($(el).find('td').eq(index).text().match(regexp)) {
        arr.push(index2);
      }
    });
    return arr;
  }

  function is_filter_return_all_rows(index, regexp, table_class) {
    var arr = [];
    $("#block-aproject-content .table tbody tr").each(function(index2, el) {
      $(el).find('td').each(function(index3, el3){
        if ($(el).find('td').eq(index3).text().match(regexp)) {
          arr.push(index2);
        }
      });
    });
    return arr;
  }
});
