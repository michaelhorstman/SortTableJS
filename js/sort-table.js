var compare = {									// Declare Compare Object
	name: function(a, b) {						// Add a method called name
		a = a.replace(/^the /i, '');			// Remove 'the' from start of parameter
		b = b.replace(/^the /i, '');

		if (a < b) {
			return -1;
		} else {
			return a > b ? 1 : 0;	    // If a is greater than b return 1 OR if they are the same return 0
		}
	},
	duration: function(a, b) {
		a = a.split(':');						// Split the time at the colon
		b = b.split(':');

		a = Number(a[0]) * 60 + Number(a[1]);  // Convert the time to seconds
		b = Number(b[0]) * 60 + Number(b[1]); // Convert the time to seconds

		return a - b;
	},
	date: function(a, b) {
		a = new Date(a);
		b = new Date(b);

		return a - b;
	}
	

};

$('.sortable').each(function() {
	var $table = $(this);						// This sortable table
	var $tbody = $table.find('tbody');			// Store table body
	var $controls = $table.find('th');			// Store table header
	var rows = $tbody.find('tr').toArray();		// Store array containing rows

	$controls.on('click', function() {
		var $header = $(this);
		var order = $header.data('sort');
		var column;

		// If selected item has ascending or descending class, reverse contents
		if ($header.is('.ascending') || $header.is('.descending')) {
			$header.toggleClass('ascending descending');		// Toggle to other class
			$tbody.append(rows.reverse());		// Reverse the array
		} else {								// Otherwise perform a sort
			$header.addClass('ascending');		// Add class to header
			// Remove asc or desc from all other headers
			$header.siblings().removeClass('ascending descending');
			if (compare.hasOwnProperty(order)) {
				column = $controls.index(this);

				rows.sort(function(a, b) {
					a = $(a).find('td').eq(column).text();
					b = $(b).find('td').eq(column).text();
					return compare[order] (a, b);
				});
			}
		}
	});





});

















